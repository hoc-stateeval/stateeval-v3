using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Data.Configuration
{
    public class PerceptionSurveyPerceptionSurveyStatementConfig : IEntityTypeConfiguration<PerceptionSurveyPerceptionSurveyStatement>
    {
        public PerceptionSurveyPerceptionSurveyStatementConfig()
        {
        }

        public void Configure(EntityTypeBuilder<PerceptionSurveyPerceptionSurveyStatement> builder)
        {

            builder.ToTable("PerceptionSurveyPerceptionSurveyStatement");
            builder.HasKey(x => new { x.PerceptionSurveyId, x.PerceptionSurveyStatementId });
        }
    }
}
