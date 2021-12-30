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
    public class StudentGrowthGoalConfig : BaseEntityConfig<StudentGrowthGoal>
    {
        public StudentGrowthGoalConfig() : base("StudentGrowthGoal")
        {
        }

        public override void Configure(EntityTypeBuilder<StudentGrowthGoal> builder)
        {
            base.Configure(builder);


            builder
                .HasOne(x => x.GoalBundle)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.Evaluation)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
