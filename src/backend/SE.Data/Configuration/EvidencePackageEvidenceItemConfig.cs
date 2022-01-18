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
    public class EvidencePackageEvidenceItemConfig : IEntityTypeConfiguration<EvidencePackageEvidenceItem>
    {
        public EvidencePackageEvidenceItemConfig()
        {
        }

        public void Configure(EntityTypeBuilder<EvidencePackageEvidenceItem> builder)
        {

            builder.ToTable("EvidencePackageEvidenceItem");
            builder.HasKey(x => new { x.EvidencePackageId, x.EvidenceItemId });
        }
    }
}
