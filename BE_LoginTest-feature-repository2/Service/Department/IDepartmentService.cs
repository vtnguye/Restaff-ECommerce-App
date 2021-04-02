using Common.Pagination;
using Domain.DTO;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Department
{
    public interface IDepartmentService
    {
        public Pagination<DepartmentDTO> Get(SearchPaginationDTO<DepartmentDTO> paging);
        public void Delete(Guid Id);
        public void Update(DepartmentDTO body);
        public void Insert(DepartmentDTO body);

    }
}
