using hangman.Blls;
using hangman.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace hangman.Controllers
{
	public class HangmanController : Controller
	{
		private readonly HangmanBll _bll;

		public HangmanController(HangmanBll bll)
        {
			_bll = bll;
        }

		public IActionResult Index()
		{
			return View();
		}

		// with a post request we're just going to send a generic result back to the front end, basically just says
		// that the post request was successful
		[HttpPost]
		public JsonResult PostDataToDBExample()
		{
			var result = new GenericResult();

			// call method here to post data, for example maybe call the BLL function to create an account

			return new JsonResult(result);
		}

		[HttpGet]
		public JsonResult GetDataFromDBExample(string username, string password)
		{
			// here's an example of user validation. REMEMBER: the controller is not used for logic, it's like a bridge
			//    between your View and your Model: VIEW -> CONTROLLER -> MODEL
			// this is why we call the bll, and then the function from the bll and pass in any necessary params
			var result = "call your function from the HangmanBllHere, for example:" + 
						 "HangmanBll.ValidateUserLogin(username, password)";

			return new JsonResult(result);
		}

		[HttpPost]
		public JsonResult SignUpForAccount([FromBody] Login login)
		{
			bool userAdded = _bll.AddUser(login);

			return new JsonResult(userAdded);
		} 

		[HttpPost]
		public JsonResult LoginUser([FromBody] Login login)
        {
			bool userValid = _bll.VerifyUser(login);

			return new JsonResult(userValid);
        }


		[HttpGet]
		public JsonResult GetHighScores()
        {
			var thing = _bll.GetHighScores();

			return new JsonResult(thing);
        }


		//[HttpGet]
		//public JsonResult GetToken()
  //      {
		//	var token = _bll.GetToken();

		//	return new JsonResult(token);
  //      }

  //      //post token
  //      [HttpPost]
  //      public JsonResult SetToken([FromBody] string username)
  //      {

  //          _bll.SetToken(username);

  //          return new JsonResult(true);
  //      }

		////get word
		//[HttpGet]
		//public JsonResult GetWord()
  //      {
		//	var word = _bll.GetWord();

		//	return new JsonResult(word);
  //      }

		////post word
		//[HttpPost]
		//public JsonResult SetWord([FromBody] string word)
		//{

		//	_bll.SetWord(word);

		//	return new JsonResult(true);
		//}


	}
}
