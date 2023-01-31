﻿using System;
using System.Collections.Generic;
using System.Text;
using static Common.Constants.DataType;

namespace Common.Pagination
{
    public class SearchPaginationUserFEDTO<T> : SearchPaginationDTO<T>
    {
        public decimal MinPrice { get; set; } = 0;
        public decimal MaxPrice { get; set; } = 9999999;
        public int TypeSort { get; set; } = (int)ETypeSort.NULL;
    }
}
