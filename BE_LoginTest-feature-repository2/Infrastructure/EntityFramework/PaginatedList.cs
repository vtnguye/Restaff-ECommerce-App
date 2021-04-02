using System;
using System.Collections.Generic;
using System.Linq;

namespace Infrastructure.EntityFramework
{
    public class PaginatedList<T>
    {
        public int PageIndex { get; private set; }
        public int TotalItem { get; private set; }
        public int TotalPage { get; private set; }
        public int PageSize { get; private set; }
        public List<T> Results { get; set; }

        public bool HasPreviousPage => PageIndex > 1;
        public bool HasNextPage => PageIndex < TotalPage;
        public PaginatedList(List<T> items, int count, int? pageIndex = 1, int? pageSize = 50)
        {
            PageIndex = pageIndex.Value;
            TotalItem = count;
            TotalPage = (int)Math.Ceiling(count / (double)pageSize.Value);
            Results = items;
            PageSize = pageSize.GetValueOrDefault();
        }
        public void GetPageData()
        {
            Results = Results?.Skip(PageSize * (PageIndex - 1)).Take(PageSize).ToList() ?? new List<T>();
        }
    }
}
