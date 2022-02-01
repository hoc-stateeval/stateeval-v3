using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class EvidencePackage : BaseEntity
    {
        public bool Public { get; set; }
        public EvidenceType EvidenceType { get; set; }

        public DateTime CreationDateTime { get; set; }

        public long CreatedByUserId { get; set; }
        public virtual User CreatedByUser { get; set; }

        public long RubricRowId { get; set; }
        public virtual RubricRow RubricRow { get; set; }

        public long EvaluationId { get; set; }
        public long EvidenceCollectionObjectId { get; set; }
        public EvidenceCollectionType EvidenceCollectionType { get; set; }

        public RubricPerformanceLevel PerformanceLevel { get; set; }
        public string RubricStatement { get; set; }
        public string AdditionalInput { get; set; }
        public virtual List<EvidencePackageEvidenceItem> EvidencePackageEvidenceItems { get; }

        // owner collection
        [ForeignKey("Observation")]
        public long? ObservationId { get; set; }
        public virtual Observation Observation { get; set; }
    }
}
