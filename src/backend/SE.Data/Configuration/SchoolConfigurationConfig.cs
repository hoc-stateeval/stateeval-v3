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
    public class SchoolConfigurationConfig : BaseEntityConfig<SchoolConfiguration>
    {
        public SchoolConfigurationConfig() : base("SchoolConfiguration")
        {
        }

        public override void Configure(EntityTypeBuilder<SchoolConfiguration> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.IsPrincipalAssignmentDelegated).IsRequired(false).HasDefaultValue(false);
        }
    }
}
