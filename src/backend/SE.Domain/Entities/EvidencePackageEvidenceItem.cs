using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    [Table("EvidencePackageEvidenceItem")]
    public class EvidencePackageEvidenceItem
    {
        [ForeignKey("EvidencePackage")]
        public long EvidencePackageId { get; }
        public virtual EvidencePackage EvidencePackage { get; }

        [ForeignKey("EvidenceItem")]
        public long EvidenceItemId { get; }
        public virtual EvidenceItem EvidenceItem { get; }

        public int Sequence { get; }

    }
}
