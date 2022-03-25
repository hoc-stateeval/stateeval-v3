using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class UserPromptDTO
    {
        public long Id { get; set; }
        public string SchoolCode {  get; set; } = string.Empty;
        public UserPromptTier OwnerTier { get; set; }

        public UserPromptType PromptType { get; set; }
        public string Prompt { get; set; } = string.Empty;
        public bool RequiredOverride { get; set; }

        public long? EvaluatorId { get; set } = null;
        public long? ObservationId { get; set; } = null;
        public long? EvaluationId { get; set; } = null;

        public List<UserPromptTierConfigDTO> TierConfigs { get; set; } 


    }
}
