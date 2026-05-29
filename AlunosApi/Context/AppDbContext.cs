using AlunosApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AlunosApi.Context
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base( options)
        {
            
        }
            public DbSet<Aluno> Alunos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = 1,
                    Nome = "João Silva",
                    Idade = 20,
                    Email = "joao.silva@example.com"
                },
                new Aluno
                {
                    Id = 2,
                    Nome = "Maria Oliveira",
                    Idade = 22,
                    Email = "maria.oliveira@example.com"
                }
            );
        }
    }
}
