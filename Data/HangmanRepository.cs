using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Linq;
using hangman.Data.Entities;
using System.Text;

namespace hangman.Data
{
    // Repository for database queries
    public class HangmanRepository : IHangmanRepository
    {
        // Database context
        private readonly HangmanContext _ctx;

        public HangmanRepository(HangmanContext ctx)
        {
            _ctx = ctx;
        }

        // GetHighScores returns all high scores, ordered by score
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
                var salt = LoginUtil.GenerateSalt();
                var password = LoginUtil.GenerateHash(login.password + salt);
                var user = new User { Username = login.username, Password = password, Salt = salt };
                _ctx.Users.Add(user);
                return _ctx.SaveChanges() > 0;
            }
            catch
            {
                return false;
            }
            
        }

        // verify given username and password with database
        public bool VerifyUser(Login login)
        {
            try
            {
                var user = _ctx.Users
                    .Where(user => user.Username == login.username)
                    .ToList();
                var password = LoginUtil.GenerateHash(login.password + user[0].Salt);
                return (password == user[0].Password);
            } 
            catch
            {
                return false;
            }
        }
    }


    // Helper methods
    public static class LoginUtil
    {
        private static Random random = new Random();

        public static string GenerateSalt()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, 5)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string GenerateHash(string str)
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
