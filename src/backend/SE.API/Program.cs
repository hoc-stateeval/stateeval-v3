

using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using Microsoft.OpenApi.Models;
using SE.API.Controllers.Authentication;
using SE.Core.Queries;
using SE.Core.Services;
using SE.Core.Utils;
using SE.Data;
using System.Diagnostics;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

// https://docs.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-6.0
// https://www.rahulpnath.com/blog/asp_net_core_cors_demystified/
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
                             .AllowAnyHeader()
                             .AllowAnyMethod();
    });
});

// Add services to the container.

builder.Services.AddControllers()
    .AddFluentValidation(s =>
    {
        s.RegisterValidatorsFromAssemblyContaining<GetFrameworkByIdQueryValidator>();
        s.DisableDataAnnotationsValidation = true;
    })
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Include;
    });

builder.Services.AddMediatR(typeof(BaseService).GetTypeInfo().Assembly);

var connectionString = builder.Configuration.GetConnectionString("localDb");
builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(connectionString));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.RegisterServiceLayerDi();

AuthConfig.Configure(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors();
app.UseAuthorization();

app.MapControllers();

app.Run();


#pragma warning disable CA1050 // Declare types in namespaces
public partial class Program
{
}
#pragma warning restore CA1050 // Declare types in namespaces
