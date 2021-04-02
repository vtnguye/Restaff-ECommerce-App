using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.DTO
{
    public class StudentDTO
    {
        public string Name { get; set; }
        public Guid Id { get; set; }
        public Guid ClassId { get; set; }

    }

}

