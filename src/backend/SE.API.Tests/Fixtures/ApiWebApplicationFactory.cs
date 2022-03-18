using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebMotions.Fake.Authentication.JwtBearer;

namespace SE.API.Tests.Fixtures
{
    public class ApiWebApplicationFactory : WebApplicationFactory<Program>
    {
        public IConfiguration Configuration { get; private set; }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration(config =>
            {
                Configuration = new ConfigurationBuilder()
                  .AddJsonFile("integrationsettings.json")
                  .Build();

                config.AddConfiguration(Configuration);
                //config.SetBasePath = new Uri("http://localhost/api/products/");
            });

            // https://gist.github.com/Elfocrash/101ffc29947832545cdaebcb259c2f44

            // https://github.com/webmotions/fake-authentication-jwtbearer/blob/master/samples/Sample.WebApplication.Tests/WeatherForecastControllerTests.cs
            // builder
            //    .UseTestServer()
            //    .ConfigureTestServices(collection =>
            //    {
            //        collection.AddAuthentication(FakeJwtBearerDefaults.AuthenticationScheme).AddFakeJwtBearer();
            //    });
        }
    }
}
