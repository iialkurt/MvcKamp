using EntityLayer.Congrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.ValidationRules
{
   public class CategoryValidator:AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(x => x.CategoryName).NotEmpty().WithMessage("Kategori Alanı Boş Geçilemez");
            RuleFor(x => x.CategoryName).MinimumLength(3).WithMessage("En az 3 Karakter Olması Gerekir");
            RuleFor(x => x.CategoryName).MaximumLength(20).WithMessage("Lütfen 20 Karakterden Fazla Giriş Yapmayın");

            RuleFor(x => x.CategoryDescription).NotEmpty().WithMessage("Açıklama Boş Geçilemez");
            RuleFor(x => x.CategoryDescription).MinimumLength(3).WithMessage("En Az 3 Karakter Olması Gerekir.");
            
;
        }
    }
}
