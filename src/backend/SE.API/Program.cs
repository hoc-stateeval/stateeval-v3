

using FluentValidation.AspNetCore;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using SE.API.Controllers.Authentication;
using SE.Core.Services;
using SE.Data;
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddControllers()
    .AddFluentValidation(s =>
    {
        s.RegisterValidatorsFromAssemblyContaining<BaseService>();
        s.DisableDataAnnotationsValidation = true;
    });

builder.Services.AddMediatR(typeof(BaseService).GetTypeInfo().Assembly);

var connectionString = builder.Configuration.GetConnectionString("localDb");
builder.Services.AddDbContext<DataContext>(options => 
    options.UseSqlServer(connectionString));


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

app.UseAuthorization();

app.MapControllers();

app.Run();
