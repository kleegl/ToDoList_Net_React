using Microsoft.EntityFrameworkCore;
using ReactASPNetCRUD.Database;
using ReactASPNetCRUD.Repositories.Interfaces;
using ReactASPNetCRUD.Repositories;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORSPolicy",
        builder =>
        {
            builder
            .WithOrigins("*")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(swaggerGenOptions =>
{
    swaggerGenOptions.SwaggerDoc("v1", new OpenApiInfo { Title = "ASP.NET React", Version = "v1" });
});


builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddTransient<IPostRepository, PostRepository>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(swaggerUIOptions =>
    {
        swaggerUIOptions.DocumentTitle = "ASP.NET React";
        swaggerUIOptions.SwaggerEndpoint("/swagger/v1/swagger.json", "Listing v1");
        swaggerUIOptions.RoutePrefix = String.Empty;
    });
}

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("CORSPolicy");

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

//app.MapControllers();

app.Run();
