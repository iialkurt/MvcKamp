using DataAccesLayer.Concrete.Repositories;
using EntityLayer.Congrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class CategoryManager
    {
        GenericReposirtory<Category> repo = new GenericReposirtory<Category>();

        public List<Category> GetAllBL()
        {
            return repo.List();

        }

        public void CatecoryAddBL(Category p)
        {
            if (p.CategoryName=="" || p.CategoryName.Length<=4 || p.CategoryDescription=="" | p.CategoryName.Length>=51)
            {
               //hata mesajı
            }
            else
            {
                repo.insert(p);
            }
        }
    }
}
