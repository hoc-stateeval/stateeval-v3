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
    public class UserPromptGroupConfig : BaseEntityConfig<UserPromptGroup>
    {
        public UserPromptGroupConfig() : base("UserPromptGroup")
        {
        }

        public override void Configure(EntityTypeBuilder<UserPromptGroup> builder)
        {
            base.Configure(builder);

            builder
                .HasMany<UserPromptGroupUserPrompt>(s => s.UserPromptGroupUserPrompts)
                .WithOne(x=>x.UserPromptGroup)
                .IsRequired()
                .OnDelete(DeleteBehavior.NoAction);
        }
    }
}
