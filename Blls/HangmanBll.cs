using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using hangman.Data;
using hangman.Data.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

// this is where all the actual logic for the hangman game should go that requires the backend's help
// typical examples would be any validation functions, or logic that you wouldn't want on the front end

namespace hangman.Blls
{
	public class HangmanBll
	{
        // private/static variables
        private readonly HangmanContext _ctx;
        private readonly HttpContext _http;
        private static Random random;


        // Bll Constructor
		public HangmanBll(HangmanContext ctx, IHttpContextAccessor http)
        //public HangmanBll(HangmanContext ctx)
        {
            _ctx = ctx;
            _http = http.HttpContext;
            random = new Random();
        }


        // GetHighScores returns list of all high scores, ordered by score
        public IEnumerable<HighScore> GetHighScores()
        {
            return _ctx.HighScores
				.Select(h => h)
				.Include(h => h.User)
                .OrderBy(score => score.Score)
                .ToList();
        }


        // Add a score to the database
        public void AddHighScore(int user_id, int score)
        {
            // get user from id
            var user = _ctx.Users
                .Where(user => user.Id == user_id)
                .ToList();

            // add highscore with user and score
            var high_score = new HighScore { User = user[0], Score = score };
            _ctx.HighScores.Add(high_score);
            _ctx.SaveChanges();
        }


        // Add new user to database
        public bool AddUser(Login login)
        {
            // salt and hash password, add to database
            try
            {
				if (_ctx.Users.Select(u => u.Username).Contains(login.Username))
				{
					// username already exists!
					return false;
				}

                var salt = GenerateSalt();
                var password = GenerateHash(login.Password + salt);
                var user = new User { Username = login.Username, Password = password, Salt = salt };
                _ctx.Users.Add(user);
                return _ctx.SaveChanges() > 0;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error Adding user: {ex}");
                return false;
            }

        }


        // verify given username and password with database
        public bool VerifyUser(Login login)
        {
            try
            {
                var user = _ctx.Users
                    .Where(user => user.Username == login.Username)
                    .FirstOrDefault();
                var password = GenerateHash(login.Password + user.Salt);

                if (password == user.Password)
                {
                    SetToken(login.Username);
                    SetExpiration(DateTime.Today.AddDays(7).ToString());
                    return true;
                }

                return false;
            }
            catch
            {
                return false;
            }
        }


        // Generate random salt
        public string GenerateSalt()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, 5)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        // Generate sha256 hash for given string
        public string GenerateHash(string str)
        {
            var sb = new StringBuilder();

            using (SHA256 hash = SHA256Managed.Create())
            {
                Encoding enc = Encoding.UTF8;
                Byte[] result = hash.ComputeHash(enc.GetBytes(str));

                foreach (Byte b in result)
                    sb.Append(b.ToString("x2"));
            }

            return sb.ToString();
        }


        public SessionData GetSessionData()
        {
            var token = GetToken();
            var expiration = GetExpiration();

            if (token == null)
            {
                token = "";
                expiration = new DateTime().ToString();
            }
            var sessionData = new SessionData(token, expiration);

            return sessionData;
        }


        //get token
        public string GetToken()
        {
            return _http.Session.GetString("Token");
        }

        //set token
        public void SetToken(string username)
        {
            _http.Session.SetString("Token", username);
        }

        //get expiration
        public string GetExpiration()
        {
            return _http.Session.GetString("Expiration");
        }

        //set expiration
        public void SetExpiration(string expiration)
        {
            _http.Session.SetString("Expiration", expiration);
        }

        //get word
        public string GetWord()
        {
            return _http.Session.GetString("Word");
        }

        //set word
        public void SetWord(string word)
        {
            _http.Session.SetString("Word", word);

        }

    }
}
