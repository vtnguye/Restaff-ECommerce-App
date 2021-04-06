using Common.Pagination;
using Domain.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Class;
using Service.Department;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassController : ControllerBase
    {
        private IClassService _classService;
        public ClassController(IClassService service)
        {
            _classService = service;

        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult Insert([FromBody] ClassDTO body)
        {
            var res = _classService.Insert(body);
            return Ok(res);
        }

        [HttpGet]
        public IActionResult Get([FromQuery] SearchPaginationDTO<ClassDTO> body)
        {
            var res = _classService.Get(body);
            return Ok(res);
        }

        [HttpGet]
        [Route("[action]")]
        public IActionResult GetAll()
        {
            var res = _classService.GetAll();
            return Ok(res);
        }

        [HttpDelete]
        public IActionResult Delete([FromQuery] Guid Id)
        {
            var res = _classService.Delete(Id);
            return Ok(res);
        }

        [HttpPut]
        public IActionResult Update([FromBody] ClassDTO body)
        {
            _classService.Update(body);
            return Ok();
        }



    }
}