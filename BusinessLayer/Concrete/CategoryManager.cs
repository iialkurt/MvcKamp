using BusinessLayer.Abstract;
using DataAccessLayer.Abstract;
using DataAccessLayer.Concrete.Repositories;
using EntityLayer.Congrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class CategoryManager : ICategoryService
    {
        ICategoryDal _categorydal;

        public CategoryManager(ICategoryDal categorydal)
        {
            _categorydal = categorydal;
        }

        public List<Category> GetList()
        {
            return _categorydal.List();

        }

        public void CategoryAddBL(Category p)
        {

            _categorydal.Insert(p);
            

        }

        public void CategoryAdd(Category category)
        {
            _categorydal.Insert(category);
        }

        public Category GetByID(int id)
        {
            return _categorydal.Get(x => x.CategoryId == id);
        }

        public void CategoryDelete(Category category)
        {
          _categorydal.Delete(category);
        }

        public void CategoryUpdate(Category category)
        {
            _categorydal.Update(category);
        }

       


        //39. Dersteyim

        //GenericRepository<Category> repo = new GenericRepository<Category>();

        //public List<Category> GetAllBL()
        //{
        //    return repo.List();
        //}

        //public void CategoryAddBL(Category p)
        //{
        //    if (p.CategoryName==null || p.CategoryName == "" || p.CategoryName.Length <=3 || p.CategoryName.Length >= 51 || p.CategoryDescription == "")
        //    {
        //        //Hata MEsajı
        //    }
        //    else
        //    {
        //        repo.Insert(p);
        //    }

        //}

    }
}
