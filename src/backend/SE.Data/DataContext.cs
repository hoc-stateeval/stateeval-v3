
using Microsoft.EntityFrameworkCore;
using SE.Domain.Entities;
using SE.Data.Configuration;

namespace SE.Data
{
    public class DataContext : DbContext
    {
        public DataContext() { }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<WorkAreaContext> WorkAreaContexts { get; set; }
        public DbSet<Framework> Frameworks { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }

        public DbSet<Observation> Observations { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(EvaluationConfig).Assembly);
            modelBuilder.HasDefaultSchema("dbo");
        }
    }
}
