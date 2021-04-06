using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Department:BaseEntity
    {
        [Required]
        public string Name { get; set; }
        public ICollection<Class> Classes { get; set; }
    }
}
