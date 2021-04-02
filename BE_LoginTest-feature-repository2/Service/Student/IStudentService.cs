using Common.Pagination;
using Domain.DTO;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Student
{
    public interface IStudentService
    {
        public Pagination<StudentDTO> Get(SearchPaginationDTO<StudentDTO> paging);
        public void Delete(Guid Id);
        public void Update(StudentDTO body);
        public void Insert(StudentDTO body);
        public StudentDTO SearchByName(string name);
        public StudentDTO SearchById(Guid Id);
    }
}
