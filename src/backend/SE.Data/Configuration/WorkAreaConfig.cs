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
    public class WorkAreaConfig : BaseEntityConfig<WorkArea>
    {
        public WorkAreaConfig() : base("WorkArea")
        {
        }

        public override void Configure(EntityTypeBuilder<WorkArea> builder)
        {
            base.Configure(builder);

            builder
                .HasOne(r => r.Role)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(r => r.EvaluateeRole)
                .WithMany()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
