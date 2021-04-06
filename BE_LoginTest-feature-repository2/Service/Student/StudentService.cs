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
        private IRepository<Domain.Entities.Student> _studentRepo;
        private IRepository<Domain.Entities.Class> _classRepo;
        private IMapper _mapper;
        private IUnitOfWork _unit;

        public StudentService(SchoolDbContext db, IRepository<Domain.Entities.Student> studentRepo, IMapper mapper, IUnitOfWork unit, IRepository<Domain.Entities.Class> classRepo)
        {
            _db = db;
            _mapper = mapper;
            _studentRepo = studentRepo;
            _unit = unit;
            _classRepo = classRepo;
        }

        public bool Delete(Guid Id)
        {
            _studentRepo.Delete(Id);
            _unit.SaveChanges();
            return true;
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

        public bool Insert(StudentDTO body)
        {
            if (body.Name == null || body.ClassId == null)
            {
                throw new ArgumentNullException("Name or Department Id cannot be null");
            }

            var result = _classRepo.Queryable().Where(t => t.Id == body.ClassId).FirstOrDefault();

            if (result == null)
            {
                return false;
            }


            body.Id = Guid.NewGuid();
            var students = _mapper.Map<Domain.Entities.Student>(body);
            _studentRepo.Insert(students);
            _unit.SaveChanges();


            return true;
        }

        public StudentDTO SearchById(Guid Id)
        {
            var student = _studentRepo.Find(Id);
            if(student == null)
            {
                return new StudentDTO();
            }
            var res = _mapper.Map<StudentDTO>(student);
            return res;
        }

        public List<StudentDTO> SearchByName(string name)
        {
            var student = _db.Student.Where(t=> t.Name == name).ToList();

            var res = _mapper.Map<List<StudentDTO>>(student);
            return res;
        }

        public void Update(StudentDTO body)
        {
            var students = _mapper.Map<Domain.Entities.Student>(body);
            _studentRepo.Update(students);
            _unit.SaveChanges();
        }
    }
}
