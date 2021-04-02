using AutoMapper;
using Common.Pagination;
using Domain.DTO;
using System.Collections.Generic;

namespace Domain
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<DepartmentDTO, Entities.Department>().ReverseMap();
            CreateMap<SearchPaginationDTO<ClassDTO>, Pagination<ClassDTO>>().ReverseMap();
            CreateMap<Pagination<DepartmentDTO>, SearchPaginationDTO<DepartmentDTO>>().ReverseMap();
            CreateMap<ClassDTO, Entities.Class>().ReverseMap();
            CreateMap<StudentDTO, Entities.Student>().ReverseMap();
            CreateMap<Pagination<StudentDTO>, SearchPaginationDTO<StudentDTO>>().ReverseMap();


        }
    }
}
