// Program.cs

// ... (seus outros usings)
// using Database; // Se o seu GestaoDbContext estiver em um namespace "Database"
using Database;
using Microsoft.AspNetCore.Builder; // Certifique-se de ter este using
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection; // Certifique-se de ter este using
using Microsoft.Extensions.Hosting; // Certifique-se de ter este using

var builder = WebApplication.CreateBuilder(args);

// Adiciona servi�os ao cont�iner.
builder.Services.AddDbContext<GestaoDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddControllers();

builder.Services.AddScoped<IReceitaService, ReceitaService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// --- IN�CIO DA CONFIGURA��O DO CORS ---
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; // Nome da sua pol�tica CORS

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          // Permite qualquer m�todo (GET, POST, PUT, DELETE, etc.)
                          policy.AllowAnyMethod()
                                // Permite qualquer cabe�alho na requisi��o
                                .AllowAnyHeader()
                                // Permite credenciais (cookies, autentica��o HTTP) 
                                .AllowCredentials()
                                // Define as origens permitidas
                                .WithOrigins("http://localhost:5173"); 
                      });
});
// --- FIM DA CONFIGURA��O DO CORS ---

var app = builder.Build();

// Configura o pipeline de requisi��o HTTP.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();