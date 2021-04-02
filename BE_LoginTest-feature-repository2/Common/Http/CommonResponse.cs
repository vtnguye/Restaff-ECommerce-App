using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Http
{
    public class CommonResponse<T> where T : class
    {
        public int Status { get; set; }
        public T Data { get; set; }

        public CommonResponse(int status)
        {
            Status = status;
        }
        public CommonResponse(int status, T data)
        : this(status)
        {
            Data = data;
        }
    }
}
