using Infrastructure.EntityFramework.Factories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace Infrastructure.EntityFramework
{
    public interface IRepository<TEntity> where TEntity : class, IObjectState
    {
        TEntity Find(params object[] keyValues);
        IQueryable<TEntity> ExcuteQuery(string query, params object[] parameters);
        void Insert(TEntity entity);
        void InsertRange(IEnumerable<TEntity> entities);
        void Update(TEntity entity, List<Expression<Func<TEntity, object>>> updateProperties = null,
            List<Expression<Func<TEntity, object>>> excludeProperties = null);
        void UpdateRange(IEnumerable<TEntity> entities);
        void DeleteRange(IEnumerable<TEntity> entities);
        void Delete(object id);
        void Delete(TEntity entity);
        int ExecSQLCommand(string sqlCommand, params object[] paramertes);
        IRepository<T> GetRepository<T>() where T : class, IObjectState;
        IQueryable<TEntity> Queryable();
        DbSet<TEntity> DbSet { get; }
        DbContext DbContext { get; }
        IQueryFluent<TEntity> Query(IQueryObject<TEntity> queryObject);
        IQueryFluent<TEntity> Query(Expression<Func<TEntity, bool>> query);
        IQueryFluent<TEntity> Query();

    }
}
