using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MVC_DonationWebsite.Models;

namespace MVC_DonationWebsite.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        //[Authorize]
        public ActionResult Index()
        {

            DonationWeb databaseContext = new DonationWeb();
            IEnumerable<tb_setting> settingData = databaseContext.tb_setting.Select(t => t);
            IEnumerable<tb_picture> pictures = databaseContext.tb_picture.Select(t => t);
            viewModelDonationWeb _tmpViewModel = new viewModelDonationWeb(null, null, settingData, pictures);
            return View(_tmpViewModel);
        }

        public JsonResult sumDonation()
        {

            DonationWeb databaseContext = new DonationWeb();
            try
            {
                float sumData = (float)databaseContext.tb_donationRecord.Sum(t => t.amount);
                return Json(sumData, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(0, JsonRequestBehavior.AllowGet);
            }
            
        }

        [HttpPost]
        public ActionResult makeDonation(tb_donationRecord donationF)
        {

            using (var context = new DonationWeb())
            {
                using (DbContextTransaction dbTran = context.Database.BeginTransaction())
                {
                    try
                    {
                        donationF.date = DateTime.Now.Date;
                        donationF.time= DateTime.Now.ToString("h:mm:ss tt");
                        context.tb_donationRecord.Add(donationF);
                        context.SaveChanges();
                        dbTran.Commit();
                        return Json(new { Message = "Success", JsonRequestBehavior.AllowGet });
                    }
                    catch (System.Data.Entity.Validation.DbEntityValidationException ex)
                    {
                        dbTran.Rollback();
                        return Json(new { Message = "Error: "+ex, JsonRequestBehavior.AllowGet });
                        throw;
                    }
                }
            }


        }
        

        public JsonResult loadComments(int senddingData)
        {

            DonationWeb databaseContext = new DonationWeb();
            try
            {

                IEnumerable<tb_Comment> newCommnet = databaseContext.tb_Comment.ToList().Skip(senddingData).Take(5);
               

                return Json(newCommnet, JsonRequestBehavior.AllowGet);
            }
            catch (Exception)
            {

                return Json(null, JsonRequestBehavior.AllowGet);
            }

        }
    }
}