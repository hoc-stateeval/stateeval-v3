using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("EvidenceCollection")]
    public class EvidenceCollection : BaseEntity
    {
        public EvidenceCollection() {}

        public EvidenceCollection(Observation observation)
        {
            EvidenceCollectionType = EvidenceCollectionType.OBSERVATION;
            EvaluationId = observation.EvaluationId;
            EvidenceCollectionObjectId = observation.Id;
        }

        public EvidenceCollection(SelfAssessment selfAssessment)
        {
            EvidenceCollectionType = EvidenceCollectionType.SELF_ASSESSMENT;
            EvaluationId = selfAssessment.EvaluationId;
            EvidenceCollectionObjectId = selfAssessment.Id;
        }

        public EvidenceCollectionType EvidenceCollectionType { get; }
        public long EvidenceCollectionObjectId { get; }

        [ForeignKey("EvidenceCollection")]
        public long EvidenceCollectionId { get; }

        [ForeignKey("Evaluation")]
        public long EvaluationId { get; }

        [Required]
        public virtual Evaluation Evaluation { get; set; }
    }
}
