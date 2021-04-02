using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class BaseEntity : IObjectState
    {
        [Key, Required]
        public Guid Id { get; set; }
        [NotMapped]
        public ObjectState ObjectState { get; set; }
    }
}
