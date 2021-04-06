using Common.Pagination;
using Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Student;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private IStudentService _studentService;
        public StudentController(IStudentService service)
        {
            _studentService = service;

        }


        [HttpPost]
        [Route("[action]")]
        public IActionResult Insert([FromBody] StudentDTO body)
        {
            var res = _studentService.Insert(body);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SearchPaginationDTO<StudentDTO> body)
        {
            var res = _studentService.Get(body);
            return Ok(res);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] Guid Id)
        {
            var res =_studentService.Delete(Id);
            return Ok(res);
        }

        [HttpPut]
        public IActionResult Update([FromBody] StudentDTO body)
        {
            _studentService.Update(body);
            return Ok();
        }

        [HttpGet("{Id}")]
        [Route("id")]

        public IActionResult GetById([FromQuery] Guid Id)
        {
            var res = _studentService.SearchById(Id);
            return Ok(res);
        }

        [HttpGet("{name}")]
        [Route("name")]

        public IActionResult GetByName([FromQuery] string name)
        {
            var res =_studentService.SearchByName(name);
            return Ok(res);
        }
    }
}
