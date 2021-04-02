using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Domain.Entities
{
    public class Student : BaseEntity
    {
        [Required]
        public string Name { get; set; }
        
        [Required]
        public Guid ClassId { get; set; }
    }
}
