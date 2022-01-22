using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("EvidenceItem")]
    public class EvidenceItem : BaseEntity
    {
        public EvidenceItem() { }

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

        public virtual List<EvidencePackageEvidenceItem> EvidencePackageEvidenceItems { get; set; }

        // specific evidence fields

        // coded text with in the WYSIWYG editor is an html element wrapping the text 
        // with an attribute on the element clientid="" to identify it.
        public Guid? CodedEvidenceClientId { get; set; }

        // RR_ANNOTATION_*: all those the text that has been coded as evidence
        public string EvidenceText { get; set; }

        // links to objects where evidence text is coded

        [ForeignKey("Observation")]
        public long? ObservationId { get; set; }
        public virtual Observation Observation { get; set; }

        [ForeignKey("UserPromptResponse")]
        public long? UserPromptResponseId { get; set; }
        public virtual UserPromptResponse UserPromptResponse { get; set; }

        // Artifact
        // StudentGrowthGoal
        // EvidencSegment

    }
}
