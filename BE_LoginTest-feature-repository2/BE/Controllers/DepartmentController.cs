using Common.Pagination;
using Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Department;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private IDepartmentService _departmentService;
        public DepartmentController(IDepartmentService service)
        {
            _departmentService = service;

        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult Insert([FromBody] DepartmentDTO body)
        {
            _departmentService.Insert(body);
            return Ok();
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SearchPaginationDTO<DepartmentDTO> body)
        {
            var res = _departmentService.Get(body);
            return Ok(res);
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAll()
        {
            var res = _departmentService.GetAll();
            return Ok(res);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] Guid Id)
        {
            var res = _departmentService.Delete(Id);
            return Ok(res);
        }

        [HttpPut]
        public IActionResult Update([FromBody] DepartmentDTO body)
        {
            _departmentService.Update(body);
            return Ok();
        }

    }
}
