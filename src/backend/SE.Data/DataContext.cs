
using Microsoft.EntityFrameworkCore;
using SE.Domain.Entities;
using SE.Data.Configuration;

namespace SE.Data
{
    public class DataContext : DbContext
    {
        public DataContext() { }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Building> Buildings { get; set; }
        public DbSet<DistrictConfiguration> DistrictConfigurations { get; set; }
        public DbSet<Evaluation> Evaluations { get; set; }
        public DbSet<EvidenceItem> EvidenceItems { get; set; }
        public DbSet<EvidencePackage> EvidencePackages { get; set; }
        public DbSet<EvidencePackageEvidenceItem> EvidencePackageEvidenceItems { get; set; }
        public DbSet<Framework> Frameworks { get; set; }
        public DbSet<FrameworkContext> FrameworkContexts { get; set; }
        public DbSet<Observation> Observations { get; set; }

        public DbSet<PerceptionSurvey> PerceptionSurveys { get; set; }

        public DbSet<PerceptionSurveyStatement> PerceptionSurveyStatements { get; set; }
        public DbSet<PerceptionSurveyResponse> PerceptionSurveyResponses { get; set; }
        public DbSet<PerceptionSurveyPerceptionSurveyStatement> PerceptionSurveyPerceptionSurveyStatements { get; set;}

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<SchoolConfiguration> SchoolConfigurations { get; set;}
        public DbSet<User> Users { get; set; }
        public DbSet<UserBuildingRole> UserBuildingRoles { get; set; }  
        public DbSet<UserPromptGroup> UserPromptGroups { get; set; }
        public DbSet<UserPrompt> UserPrompts { get; set; }
        public DbSet<UserPromptResponse> UserPromptResponses { get; set; }
        public DbSet<WorkAreaContext> WorkAreaContexts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(EvaluationConfig).Assembly);
            modelBuilder.HasDefaultSchema("dbo");
        }
    }
}
