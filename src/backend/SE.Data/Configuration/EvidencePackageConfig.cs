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
    public class EvidencePackageConfig : BaseEntityConfig<EvidencePackage>
    {
        public EvidencePackageConfig() : base("EvidencePackage")
        {
        }

        public override void Configure(EntityTypeBuilder<EvidencePackage> builder)
        {
            base.Configure(builder);

            builder
                .HasMany<EvidencePackageEvidenceItem>(x => x.EvidencePackageEvidenceItems)
                .WithOne(x=>x.EvidencePackage)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
