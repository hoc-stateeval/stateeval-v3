

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
using System.Text.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers()
    .AddFluentValidation(s =>
    {
        s.RegisterValidatorsFromAssemblyContaining<GetFrameworkByIdQueryValidator>();
        s.DisableDataAnnotationsValidation = true;
    });

builder.Services.AddMediatR(typeof(BaseService).GetTypeInfo().Assembly);

var connectionString = builder.Configuration.GetConnectionString("localDb");
builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(connectionString));

builder.Services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

AuthConfig.Configure(builder);

var app = builder.Build();
//app.UseExceptionHandler(errorApp =>
//{
//    errorApp.Run(async context =>
//    {
//        var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
//        var exception = errorFeature.Error;

//        // https://tools.ietf.org/html/rfc7807#section-3.1
//        var problemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails
//        {
//            Type = $"https://example.com/problem-types/{exception.GetType().Name}",
//            Title = "An unexpected error occurred!",
//            Detail = "Something went wrong",
//            Instance = errorFeature switch
//            {
//                ExceptionHandlerFeature e => e.Path,
//                _ => "unknown"
//            },
//            Status = StatusCodes.Status400BadRequest,
//            Extensions =
//                    {
//                        ["trace"] = Activity.Current?.Id ?? context?.TraceIdentifier
//                    }
//        };

//        switch (exception)
//        {
//            case ValidationException validationException:
//                problemDetails.Status = StatusCodes.Status403Forbidden;
//                problemDetails.Title = "One or more validation errors occurred";
//                problemDetails.Detail = "The request contains invalid parameters. More information can be found in the errors.";
//                problemDetails.Extensions["errors"] = validationException.Message;
//                break;
//        }

//        context.Response.ContentType = "application/problem+json";
//        context.Response.StatusCode = problemDetails.Status.Value;
//        context.Response.GetTypedHeaders().CacheControl = new CacheControlHeaderValue()
//        {
//            NoCache = true,
//        };
//        await JsonSerializer.SerializeAsync(context.Response.Body, problemDetails);
//    });
//});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

