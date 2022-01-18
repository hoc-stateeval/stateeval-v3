using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class RubricRowAnnotation : BaseEntity
    {
        public RubricRowAnnotation() { }

        public RubricRowAnnotation(long createdByUserId, long evaluationId, long evidenceCollectionId, EvidenceCollectionType evidenceCollectionType, long rubricRowId, EvidenceType evidenceType, string annotation, string clientId = "")
        {
            Annotation = annotation;
            ClientId = clientId;
            CreationDateTime = DateTime.Now;
            RubricRowId = rubricRowId;
            EvidenceType = evidenceType;
            CreatedByUserId = createdByUserId;
            EvidenceCollectionType = evidenceCollectionType;
            EvidenceCollectionId = evidenceCollectionId;
            EvaluationId = evaluationId;
        }

        public string Annotation { get; }
        public string ClientId { get; }

        public EvidenceType EvidenceType { get; }
        public DateTime CreationDateTime { get; }
        public long CreatedByUserId { get; }
        public virtual User CreatedByUser { get; }
        public long RubricRowId { get; }
        public virtual RubricRow RubricRow { get; }

        public long EvaluationId { get; }
        public long EvidenceCollectionId { get; }
        public EvidenceCollectionType EvidenceCollectionType { get; }
    }
}
