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
            _studentService.Insert(body);
            return Ok();
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
            _studentService.Delete(Id);
            return Ok();
        }

        [HttpPut]
        public IActionResult Update([FromBody] StudentDTO body)
        {
            _studentService.Update(body);
            return Ok();
        }

        [HttpGet("{Id}")]
        public IActionResult GetById([FromQuery] Guid Id)
        {
            _studentService.SearchById(Id);
            return Ok();
        }

        [HttpGet("{name}")]
        public IActionResult GetByName([FromQuery] string name)
        {
            _studentService.SearchByName(name);
            return Ok();
        }
    }
}
