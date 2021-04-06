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
        private IRepository<Domain.Entities.Class> _classRepo;
        private IRepository<Domain.Entities.Department> _departmentRepo;
        private IRepository<Domain.Entities.Student> _studentRepo;

        private IMapper _mapper;
        private IUnitOfWork _unit;

        public ClassService(SchoolDbContext db, IRepository<Domain.Entities.Class> classRepo,
            IMapper mapper,
            IUnitOfWork unit,
            IRepository<Domain.Entities.Department> departmentRepo,
            IRepository<Domain.Entities.Student> studentRepo
            )
        {
            _departmentRepo = departmentRepo;
            _db = db;
            _mapper = mapper;
            _classRepo = classRepo;
            _unit = unit;
            _studentRepo = studentRepo;
        }

        public List<ClassDTO> GetAll()
        {
            var res = _mapper.Map<List<Domain.Entities.Class>,List<ClassDTO>>(_classRepo.Queryable().ToList());
            return res;
        }
        public bool Delete(Guid Id)
        {
            var res = _studentRepo.Queryable().Where(t => t.ClassId == Id).FirstOrDefault();
            if (res == null)
            {
                _classRepo.Delete(Id);
                _unit.SaveChanges();


                return true;
            }
            return false;
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

        public bool Insert(ClassDTO body)
        {

            if (body.Name == null || body.DepartmentId == null)
            {
                throw new ArgumentNullException("Name or Department Id cannot be null");
            }

            var result = _departmentRepo.Queryable().Where(t => t.Id == body.DepartmentId).FirstOrDefault();

            if (result == null)
            {
                return false;
            }

            for (int i = 0; i < 50; i++)
            {
                body.Id = Guid.NewGuid();
                var classes = _mapper.Map<Domain.Entities.Class>(body);
                _classRepo.Insert(classes);
                _unit.SaveChanges();
            }
            return true;
        }

        public void Update(ClassDTO body)
        {
            var classes = _mapper.Map<Domain.Entities.Class>(body);
            _classRepo.Update(classes);
            _unit.SaveChanges();

        }
    }
}
