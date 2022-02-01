using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class EvidencePackageDTO
    {
        public long Id { get; set; }

        public DateTime CreationDateTime { get; set; }
        public string CreationDateDisplayString { get; set; }

        public long CreatedByUserId { get; set; }
        public string CreatedByDisplayName { get; set; }

        public long RubricRowId { get; set; }

        public long EvaluationId { get; set; }

        public long EvidenceCollectionObjectId { get; set; }

        public string RubricStatement { get; set; }
        public RubricPerformanceLevel PerformanceLevel { get; set; }

        public EvidenceCollectionType EvidenceCollectionType { get; set; }

        public string EvidenceCollectionDisplayName { get; set; }
    }
}
