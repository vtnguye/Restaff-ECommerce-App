using AutoMapper;
using Common.Pagination;
using Data;
using Domain.DTO;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Class
{
    public class ClassService : IClassService
    {
        private SchoolDbContext _db;
        private IRepository<Domain.Entities.Class> _repo;
        private IMapper _mapper;
        private IUnitOfWork _unit;

        public ClassService(SchoolDbContext db, IRepository<Domain.Entities.Class> repo, IMapper mapper, IUnitOfWork unit)
        {
            _db = db;
            _mapper = mapper;
            _repo = repo;
            _unit = unit;
        }
        public void Delete(Guid Id)
        {
            _repo.Delete(Id);
            _unit.SaveChanges();
        }

        public Pagination<ClassDTO> Get(SearchPaginationDTO<ClassDTO> paging)
        {
            if (paging == null)
            {
                return new Pagination<ClassDTO>();
            }

            var data = _db.Class.Where((System.Linq.Expressions.Expression<Func<Domain.Entities.Class, bool>>)(t =>

                (bool)(paging.Search == null ||
                (t.Id.Equals(paging.Search.Id) &&
                t.Name.Contains(paging.Search.Name))))
                );

            var result = _mapper.Map<SearchPaginationDTO<ClassDTO>, Pagination<ClassDTO>>(paging);
            var departments = data.Take(paging.Take).Skip(paging.Skip).ToList();
            var departmentDTOs = _mapper.Map<List<Domain.Entities.Class>, List<ClassDTO>>(departments);

            result.InputData(totalItems: data.Count(), data: departmentDTOs);
            return result;
        }

        public void Insert(ClassDTO body)
        {
            body.Id = Guid.NewGuid();
            body.DepartmentId = Guid.NewGuid();
            var classes = _mapper.Map<Domain.Entities.Class>(body);
            _repo.Insert(classes);
            _unit.SaveChanges();

        }

        public void Update(ClassDTO body)
        {
            var classes = _mapper.Map<Domain.Entities.Class>(body);
            _repo.Update(classes);
            _unit.SaveChanges();

        }
    }
}
