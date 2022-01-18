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
    public class SelfAssessmentConfig : BaseEntityConfig<SelfAssessment>
    {
        public SelfAssessmentConfig() : base("SelfAssessment")
        {
        }

        public override void Configure(EntityTypeBuilder<SelfAssessment> builder)
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
