using AutoMapper;
using Common.Pagination;
using Data;
using Domain.DTO;
using Infrastructure.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Service.Student
{
    public class StudentService : IStudentService

    {
        private SchoolDbContext _db;
        private IRepository<Domain.Entities.Student> _repo;
        private IMapper _mapper;
        private IUnitOfWork _unit;

        public StudentService(SchoolDbContext db, IRepository<Domain.Entities.Student> repo, IMapper mapper, IUnitOfWork unit)
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

        public Pagination<StudentDTO> Get(SearchPaginationDTO<StudentDTO> paging)
        {
            if (paging == null)
            {
                return new Pagination<StudentDTO>();
            }

            var data = _db.Student.Where((System.Linq.Expressions.Expression<Func<Domain.Entities.Student, bool>>)(t =>

                (bool)(paging.Search == null ||
                (t.Id.Equals(paging.Search.Id) &&
                t.Name.Contains(paging.Search.Name))))
                );

            var result = _mapper.Map<SearchPaginationDTO<StudentDTO>, Pagination<StudentDTO>>(paging);
            var students = data.Take(paging.Take).Skip(paging.Skip).ToList();
            var studentsDTO = _mapper.Map<List<Domain.Entities.Student>, List<StudentDTO>>(students);

            result.InputData(totalItems: data.Count(), data: studentsDTO);
            return result;
        }

        public void Insert(StudentDTO body)
        {
            body.Id = Guid.NewGuid();
            body.ClassId = Guid.NewGuid();
            var students = _mapper.Map<Domain.Entities.Student>(body);
            _repo.Insert(students);
            _unit.SaveChanges();
        }

        public StudentDTO SearchById(Guid Id)
        {
            var student = _repo.Find(Id);
            var res = _mapper.Map<StudentDTO>(student);
            return res;
        }

        public StudentDTO SearchByName(string name)
        {
            var student = _repo.Find(name);
            var res = _mapper.Map<StudentDTO>(student);
            return res;
        }

        public void Update(StudentDTO body)
        {
            var students = _mapper.Map<Domain.Entities.Student>(body);
            _repo.Update(students);
            _unit.SaveChanges();
        }
    }
}
