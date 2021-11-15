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
    public class ObservationConfig : BaseEntityConfig<Observation>
    {
        public ObservationConfig() : base("Observation")
        {
        }

        public override void Configure(EntityTypeBuilder<Observation> builder)
        {
            base.Configure(builder);

           builder.HasOne(x => x.Evaluator)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
