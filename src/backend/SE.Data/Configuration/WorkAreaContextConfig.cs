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
    public class WorkAreaContextConfig : BaseEntityConfig<WorkAreaContext>
    {
        public WorkAreaContextConfig() : base("WorkAreaContext")
        {
        }

        public override void Configure(EntityTypeBuilder<WorkAreaContext> builder)
        {
            builder
                .HasOne(x => x.Building)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.WorkArea)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.User)
                .WithMany(x => x.WorkAreaContexts)
                .IsRequired()
                .HasConstraintName("FK_WorkAreaContext_User_UserId")
                .OnDelete(DeleteBehavior.NoAction);

            builder
                .HasOne(x => x.FrameworkContext)
                .WithMany()
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
