using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class EvidenceItemDTO
    {
        public long Id { get; set; }
        public EvidenceType EvidenceType { get; set; }

        public DateTime CreationDateTime { get; set; }

        public long CreatedByUserId { get; set; }

        public long RubricRowId { get; set; }

        public long EvaluationId { get; set; }

        public long EvidenceCollectionObjectId { get; set; }

        public EvidenceCollectionType EvidenceCollectionType { get; set; }
    }
}
