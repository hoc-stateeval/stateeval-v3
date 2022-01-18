using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SE.Domain.Entities;

namespace SE.Data.Configuration
{
    public class StudentGrowthGoalBundleConfig : BaseEntityConfig<StudentGrowthGoalBundle>
    {
        public StudentGrowthGoalBundleConfig() : base("StudentGrowthGoalBundle")
        {
        }

        public override void Configure(EntityTypeBuilder<StudentGrowthGoalBundle> builder)
        {
            base.Configure(builder);

            builder
            .HasOne(x => x.Evaluation)
            .WithOne()
            .IsRequired()
            .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
