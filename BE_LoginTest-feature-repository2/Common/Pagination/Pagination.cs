using System;
using System.Collections.Generic;
using System.Text;

namespace Common.Pagination
{
    public class Pagination<T>
    {
        public int TotalPage
        {
            get
            {
                if (PageSize <= 0)
                    PageSize = 1;
                return (int)Math.Round((decimal)TotalItems / (decimal)PageSize, MidpointRounding.ToPositiveInfinity);
            }
        }
        public int PageNumber
        {
            get; set;
        }
        public int PageSize { get; set; }
        public int TotalItems { get; set; }
        public List<T> Data { get; set; }

        public void InputData(int totalItems, List<T> data)
        {
            TotalItems = totalItems;
            Data = data;
        }
    }
}
