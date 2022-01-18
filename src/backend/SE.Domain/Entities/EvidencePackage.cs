using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class EvidencePackage : BaseEntity
    {
        public DateTime CreationDateTime { get; set; }

        public long CreatedByUserId { get; set; }
        public virtual User CreatedByUser { get; set; }

        public RubricPerformanceLevel PerformanceLevel { get; set; }
        public string RubricStatement { get; set; }
        public string AdditionalInput { get; set; }

        public long RubricRowId { get; set; }
        public virtual RubricRow RubricRow { get; }
        public virtual List<EvidencePackageEvidenceItem> EvidencePackageEvidenceItems { get; }


        public long EvaluationId { get; }
        public long EvidenceCollectionId { get; }
        public EvidenceCollectionType EvidenceCollectionType { get; }
    }
}
