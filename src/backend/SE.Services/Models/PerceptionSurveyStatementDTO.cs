using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class PerceptionSurveyResponseDTO
    {
        public long Id { get; set; }
        public long StatementId { get; set; }
        public PerceptionSurveyLevelOfAgreement LevelOfAgreement { get; set; }
    }
}
