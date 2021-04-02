using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Common.Http
{
    public class BaseController : ControllerBase
    {
        public IActionResult CommonResponse<T>(int code, T data) where T : class
        {
            return new JsonResult(new CommonResponse<T>(code, data));
        }
    }
}
