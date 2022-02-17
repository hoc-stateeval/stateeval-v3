using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class YearToDateEvidenceCollectionDTO
    {
        public List<EvidenceItemDTO> EvidenceItems { get; set; } = new List<EvidenceItemDTO>();
        public List<EvidencePackageDTO> EvidencePackages { get; set; } = new List<EvidencePackageDTO>();
    }
}
