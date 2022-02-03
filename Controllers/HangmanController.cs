using hangman.Blls;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace hangman.Controllers
{
	public class HangmanController : Controller
	{
		HangmanBll hangmanBll = new HangmanBll();

		public IActionResult Index()
		{
			return View();
		}

		// This is where we will create functions to grab data (typically from the DB)
		// can also have functions to post data to the DB here

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

	}
}
