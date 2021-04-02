using AutoMapper;
using Common.Pagination;
using Data;
using Domain.DTO;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Department
{
    public class DepartmentService : IDepartmentService
    {
        private SchoolDbContext _db;
        private IRepository<Domain.Entities.Department> _repo;
        private IMapper _mapper;
        private IUnitOfWork _unit;
        public DepartmentService(SchoolDbContext db, IRepository<Domain.Entities.Department> repo, IMapper mapper, IUnitOfWork unit)
        {
            _db = db;
            _mapper = mapper;
            _repo = repo;
            _unit = unit;
        }

        public Pagination<DepartmentDTO> Get(SearchPaginationDTO<DepartmentDTO> paging)
        {
            if (paging == null)
            {
                return new Pagination<DepartmentDTO>();
            }

            var data = _db.Department.Where((System.Linq.Expressions.Expression<Func<Domain.Entities.Department, bool>>)(t =>

                (bool)(paging.Search == null ||
                (t.Id.Equals(paging.Search.Id) &&
                t.Name.Contains(paging.Search.Name))))
                );

            var result = _mapper.Map<SearchPaginationDTO<DepartmentDTO>, Pagination<DepartmentDTO>>(paging);
            var departments = data.Take(paging.Take).Skip(paging.Skip).ToList();
            var departmentDTOs = _mapper.Map<List<Domain.Entities.Department>,List<DepartmentDTO>>(departments);

            result.InputData(totalItems: data.Count(), data: departmentDTOs);
            return result;
        }

        public void Delete(Guid Id)
        {
            _repo.Delete(Id);
            _unit.SaveChanges();

        }

        public void Update(DepartmentDTO body)
        {
            var department = _mapper.Map<Domain.Entities.Department>(body);
            _repo.Update(department);
            _unit.SaveChanges();

        }

        public void Insert(DepartmentDTO body)
        {
            body.Id = Guid.NewGuid();
            var department = _mapper.Map<Domain.Entities.Department>(body);
            _repo.Insert(department);
            _unit.SaveChanges();

        }

    }

}
