using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class UserPromptTierConfigDTO
    {
        public long Id { get; set; }
        public long UserPromptId { get; set; }
        public string SchoolCode {  get; set; } = string.Empty;
        public UserPromptTier ConfigurationTier { get; set; }
        public long? EvaluatorId { get; set } = null;
        public bool Required { get; set; }


    }
}
