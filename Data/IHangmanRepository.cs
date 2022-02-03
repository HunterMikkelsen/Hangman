using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using hangman.Data.Entities;

namespace hangman.Data
{
    public interface IHangmanRepository
    {
        IEnumerable<HighScore> GetHighScores();
        void AddHighScore(int user_id, int score);
        bool AddUser(Login login);
        bool VerifyUser(Login login);
    }
}
