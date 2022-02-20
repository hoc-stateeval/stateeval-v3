
using FluentValidation;
using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Net.Http.Headers;
using SE.Core.Queries;
using SE.Core.Services;
using SE.Data;
using System.Diagnostics;
using System.Reflection;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Newtonsoft.Json.Serialization;
using SE.Core.Common.Jwt;
using SE.API.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Serilog;
using System.Text;
using System.Text.Json;
using System.Net;
using SE.Core.Common.Exceptions;
using Serilog.Sinks.MSSqlServer;
using SE.Core.Queries.Frameworks;

const string ApiCorsPolicy = "APICorsPolicy";

var builder = WebApplication.CreateBuilder(args);

var config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
            .Build();


var connectionString = builder.Configuration.GetConnectionString("localDb");
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(connectionString));

builder.Host.UseSerilog(); //.ConfigureWebHostDefaults(builder => builder.UseStartup<Program>());

// Serilog Configuration
//Log.Logger = new LoggerConfiguration()
//    .ReadFrom.Configuration(config)
//     .WriteTo.MSSqlServer(
//        connectionString: connectionString)
//    .CreateLogger();

// CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000")
                             .AllowAnyHeader()
                             .AllowAnyMethod();
    });
});
//builder.Services.AddCors(options => options.AddPolicy(ApiCorsPolicy, policy =>
//    policy.AllowAnyMethod()
//        .AllowAnyHeader()
//        .AllowCredentials()
//));

// JWT Authentication
var jwtSettings = new JwtSettings();
builder.Configuration.Bind(nameof(JwtSettings), jwtSettings);
builder.Services.AddSingleton(jwtSettings);

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));
builder.Services.AddScoped<IJwtUtils, JwtUtils>();

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
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    });

builder.Services.AddMediatR(typeof(BaseService).GetTypeInfo().Assembly);

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.RegisterServiceLayerDi();

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

// global error handler
app.UseMiddleware<ErrorHandlerMiddleware>();

// custom jwt auth middleware
 app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();

#pragma warning disable CA1050 // Declare types in namespaces
public partial class Program
{
}
#pragma warning restore CA1050 // Declare types in namespaces
