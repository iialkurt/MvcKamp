//using DataAccessLayer.Abstract;
//using EntityLayer.Congrete;
//using System;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;
//using System.Linq.Expressions;
//using System.Text;
//using System.Threading.Tasks;

//namespace DataAccessLayer.Concrete.Repositories
//{
//    public class IWriterRepository : IWriterDal
//    {

//        Context c = new Context();
//        DbSet<Writer> _object;
//        public void Delete(Writer p)
//        {
//            _object.Remove(p);
//            c.SaveChanges();
//        }

//        public Writer Get(Expression<Func<Writer, bool>> filter)
//        {
//            throw new NotImplementedException();
//        }

//        public void Insert(Writer p)
//        {
//            _object.Add(p);
//            c.SaveChanges();
//        }

//        public List<Writer> List()
//        {
//            return _object.ToList();
//        }

//        public void Update(Writer p)
//        {
//            c.SaveChanges();
//        }
//    }
//}
