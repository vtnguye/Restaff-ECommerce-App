using AutoMapper;
using Data;
using Domain;
using Infrastructure.Auth;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BE.AppConfig
{
    public static class Configdependecyinjection
    {
        public static void Setup(IServiceCollection services, IConfiguration configuration)
        {
            //singleton
            ////Mapper

            ////Find all auto mapper profile
            //services.AddAutoMapper(typeof(Startup));
            //services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            ////Find and start only
            var mapperConfig = new AutoMapper.MapperConfiguration(t =>
            {
                t.AddProfile(new AutoMapperProfile());
                // t.AddProfile(new AutoMapperServiceProfile());
            });
            IMapper mapper = mapperConfig.CreateMapper();
            services.AddSingleton(mapper);

        }
    }
}
