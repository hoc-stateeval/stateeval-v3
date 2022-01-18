using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace SE.Domain.Entities
{
    public class UserPromptGroupUserPrompt 
    {
        public long UserPromptGroupId { get; }
        public long UserPromptId { get; }

        public virtual UserPromptGroup UserPromptGroup { get; }
        public virtual UserPrompt UserPrompt { get; }
    }
}
