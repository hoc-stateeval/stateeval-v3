using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SE.Domain.Entities
{
    public class UserPromptGroup : BaseEntity
    {
        [ForeignKey("FrameworkContext")]
        public long FrameworkContextId { get; set; }

        public virtual FrameworkContext FrameworkContext { get; }

        [ForeignKey("CreateByUser")]
        public long CreatedByUserId { get; set; }
        public virtual User CreatedByUser { get; }

        public string Name { get; set; }
        public UserPromptType PromptType { get; set; }
        public string SchoolCode { get; set; }
        public bool CreatedAsAdmin { get; set; }

        [ForeignKey("SGFrameworkNode")]
        public long? SGFrameworkNodeId { get; set; }
        public virtual FrameworkNode SGFrameworkNode { get;  }
        public virtual List<UserPromptGroupUserPrompt> UserPromptGroupUserPrompts { get; }
    }
}
