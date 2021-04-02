using Common.Pagination;
using Domain.DTO;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Text;

namespace Service.Class
{
    public interface IClassService
    {
        public Pagination<ClassDTO> Get(SearchPaginationDTO<ClassDTO> paging);
        public void Delete(Guid Id);
        public void Update(ClassDTO body);
        public void Insert(ClassDTO body);

    }
}
