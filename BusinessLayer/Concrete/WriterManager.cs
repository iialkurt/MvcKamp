using BusinessLayer.Abstract;
using DataAccessLayer.Abstract;
using EntityLayer.Congrete;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Concrete
{
    public class WriterManager : IWriterService
    {

        IWriterDal  _WriterDal;
       

        public WriterManager(IWriterDal writerdal)
        {
            _WriterDal = writerdal;
        }


        public List<Writer> GetList()
        {
            return _WriterDal.List();
        }

        public void WriterAdd(Writer writer)
        {
            _WriterDal.Insert(writer);
        }
    }
}
