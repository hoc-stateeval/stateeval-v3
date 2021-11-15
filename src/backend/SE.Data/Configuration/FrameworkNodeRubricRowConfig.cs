using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SE.Data.Configuration
{
    public class FrameworkNodeRubricRowConfig : IEntityTypeConfiguration<FrameworkNodeRubricRow>
    {
        public FrameworkNodeRubricRowConfig()
        {
        }

        public void Configure(EntityTypeBuilder<FrameworkNodeRubricRow> builder)
        {

            builder.ToTable("FrameworkNodeRubricRow");
            builder.HasKey(x => new { x.FrameworkNodeId, x.RubricRowId });
        }
    }
}
