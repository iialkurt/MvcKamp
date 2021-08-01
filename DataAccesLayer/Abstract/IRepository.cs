using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DataAccesLayer.Abstract
{
   public interface IRepository<T>
    {
        //Listeleme
        List<T> List();

        //Kayıt Ekleme
        void Insert(T p);

        //Kayıt Güncelleme
        void Update(T p);

        //Kayıt Silme
        void Delete(T p);

        //Filtreleme
        List<T> List(Expression<Func<T, bool>> filter);

    }
}
