using System.Web.Mvc;

namespace AspNetWebApiAngularJsAuthenticationToken.Controllers
{
    //[AccessControlAllowOrigin]
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}