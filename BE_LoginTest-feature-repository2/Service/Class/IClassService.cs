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
        public List<ClassDTO> GetAll();
        public Pagination<ClassDTO> Get(SearchPaginationDTO<ClassDTO> paging);
        public bool Delete(Guid Id);
        public void Update(ClassDTO body);
        public bool Insert(ClassDTO body);

    }
}
