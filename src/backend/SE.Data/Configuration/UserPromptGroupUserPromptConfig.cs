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
    public class UserPromptGroupUserPromptConfig : IEntityTypeConfiguration<UserPromptGroupUserPrompt>
    {
        public UserPromptGroupUserPromptConfig()
        {
        }

        public void Configure(EntityTypeBuilder<UserPromptGroupUserPrompt> builder)
        {

            builder.ToTable("UserPromptGroupUserPrompt");
            builder.HasKey(x => new { x.UserPromptGroupId, x.UserPromptId });
        }
    }
}
