using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class EvidenceItem : BaseEntity
    {
        public EvidenceItem() { }
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

        // RR_ANNOTATION_OBSERVATION_NOTES: coded text within the observation notes WYSIWYG editor
        // is wrapped with an element with a clientid attribute on it.
        public Guid? ObservationNoteClientId { get; set; }

        // RR_ANNOTATION_*: all those the text that has been coded as evidence
        public string EvidenceText { get; set; }

        // links to objects where evidence text is coded

        [ForeignKey("UserPromptResponse")]
        public long UserPromptResponseId { get; set; }
        public virtual UserPromptResponse UserPromptResponse { get; set; }

        // Artifact
        // StudentGrowthGoal
        // EvidencSegment

    }
}
