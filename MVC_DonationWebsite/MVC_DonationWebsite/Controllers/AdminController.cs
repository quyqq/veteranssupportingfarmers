using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_DonationWebsite.Controllers
{
    public class AdminController : Controller
    {
        // GET: AdminDonation
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}