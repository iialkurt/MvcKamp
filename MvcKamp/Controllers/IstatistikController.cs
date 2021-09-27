using BusinessLayer.Concrete;
using DataAccessLayer.Concrete;
using DataAccessLayer.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcKamp.Controllers
{
    public class IstatistikController : Controller
    {
        CategoryManager cm = new CategoryManager(new EFCategoryDal());
        Context c = new Context();
        public ActionResult Index()
        {
            var kategorisayisi = c.Categories.Count().ToString();
            ViewBag.d1 = kategorisayisi;
          

            var basliklar = c.Headings.Count(x => x.CategoryId == 20).ToString();
            ViewBag.d2 = basliklar;

            var yazarsorgula = c.Writers.Count(x=>x.WriterName.Contains("a"));
            ViewBag.d3 = yazarsorgula;

            var enfazlabaslik = c.Headings.GroupBy(x => x.CategoryId).OrderByDescending(z => z.Count()).
                Select(y => y.Key).FirstOrDefault();
            var a = c.Categories.Where(x => x.CategoryId == enfazlabaslik).Select(y => y.CategoryName).FirstOrDefault();
            ViewBag.d4 = a;

            var kategoritrue = c.Categories.Count(x => x.CategoryStatus == true);
           
            ViewBag.d5 = kategoritrue;

            var kategorifalse = c.Categories.Count(x => x.CategoryStatus == false);
            ViewBag.d6 = kategorifalse;

            var kategorifarki = kategoritrue - kategorifalse;
            ViewBag.d7 = kategorifarki;

            return View();
        }
      
    }
}