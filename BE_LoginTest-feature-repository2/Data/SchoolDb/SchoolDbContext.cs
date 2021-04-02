using Domain.Entities;
using Infrastructure.EntityFramework;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data
{
    public class SchoolDbContext : DataContext
    {
        public SchoolDbContext(DbContextOptions<SchoolDbContext> options) : base(options)
        { }
        public DbSet<Student> Student { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Class> Class { get; set; }

    }
}





