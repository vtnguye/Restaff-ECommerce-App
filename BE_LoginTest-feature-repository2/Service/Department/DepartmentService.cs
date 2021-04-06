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
        private IRepository<Domain.Entities.Department> _departmentRepo;
        private IRepository<Domain.Entities.Class> _classRepo;
        private IMapper _mapper;
        private IUnitOfWork _unit;
        public DepartmentService(SchoolDbContext db, IRepository<Domain.Entities.Department> repo, IMapper mapper, IUnitOfWork unit, IRepository<Domain.Entities.Class> classRepo)
        {
            _db = db;
            _mapper = mapper;
            _departmentRepo = repo;
            _unit = unit;
            _classRepo = classRepo;
        }

        public List<DepartmentDTO> GetAll()
        {
            var res = _mapper.Map<List<Domain.Entities.Department>, List<DepartmentDTO>>(_departmentRepo.Queryable().ToList());
            return res;
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
            var departmentDTOs = _mapper.Map<List<Domain.Entities.Department>, List<DepartmentDTO>>(departments);

            result.InputData(totalItems: data.Count(), data: departmentDTOs);
            return result;
        }

        public bool Delete(Guid Id)
        {
            var res = _classRepo.Queryable().Where(t => t.DepartmentId == Id).FirstOrDefault();

            if (res == null)
            {
                _departmentRepo.Delete(Id);
                _unit.SaveChanges();
                return true;
            }

            return false;
        }

        public void Update(DepartmentDTO body)
        {
            var department = _mapper.Map<Domain.Entities.Department>(body);
            _departmentRepo.Update(department);
            _unit.SaveChanges();

        }

        public void Insert(DepartmentDTO body)
        {

            body.Id = Guid.NewGuid();
            var department = _mapper.Map<Domain.Entities.Department>(body);
            _departmentRepo.Insert(department);
            _unit.SaveChanges();


        }

    }

}
