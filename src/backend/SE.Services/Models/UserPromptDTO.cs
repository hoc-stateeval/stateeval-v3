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
        public UserPromptOwnerTier OwnerTier { get; set; }

        public UserPromptType PromptType { get; set; }

        public bool Retired { get; set; }   
        public bool DistrictRequired { get; set; }
        public bool SchoolRequired { get; set; }
        public bool EvaluatorRequired { get; set; }

        public long? ObservationId { get; set; } = null;
        public long? EvaluationId { get; set; } = null;


    }
}
