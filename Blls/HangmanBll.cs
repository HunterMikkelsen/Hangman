using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using hangman.Data;
using hangman.Data.Entities;

// this is where all the actual logic for the hangman game should go that requires the backend's help
// typical examples would be any validation functions, or logic that you wouldn't want on the front end

namespace hangman.Blls
{
	public class HangmanBll
	{
        // private/static variables
        private readonly HangmanContext _ctx;
        private static Random random;


        // Bll Constructor
        public HangmanBll(HangmanContext ctx)
        {
            _ctx = ctx;
            random = new Random();
        }


        // GetHighScores returns list of all high scores, ordered by score
        public IEnumerable<HighScore> GetHighScores()
        {
            return _ctx.HighScores
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
				if(_ctx.Users.Select(u => u.Username).Contains(login.Username))
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
                    .ToList();
                var password = GenerateHash(login.Password + user[0].Salt);
                return (password == user[0].Password);
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


    }
}
