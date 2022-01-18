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
    public class EvaluationConfig : BaseEntityConfig<Evaluation>
    {
        public EvaluationConfig() : base("Evaluation")
        {
        }

        public override void Configure(EntityTypeBuilder<Evaluation> builder)
        {
            base.Configure(builder);
        }
    }
}
