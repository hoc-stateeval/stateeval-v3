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
    public class FrameworkContextConfig : BaseEntityConfig<FrameworkContext>
    {
        public FrameworkContextConfig() : base("FrameworkContext")
        {
        }

        public override void Configure(EntityTypeBuilder<FrameworkContext> builder)
        {
            base.Configure(builder);

            builder
                .HasOne(x => x.StateFramework)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);


            builder
                .HasOne(x => x.DefaultFramework)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

        }
    }
}
