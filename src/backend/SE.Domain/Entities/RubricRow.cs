using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class RubricRow : BaseEntity
    {
        public string ShortName { get; }
        public string Title { get; }
        public string Description { get; }
        public SchoolYear SchoolYear { get; }
        public string FrameworkTagName { get; }
        public bool IsStudentGrowthAligned { get; }

        public string PL1Descriptor { get; }
        public string PL2Descriptor { get; }
        public string PL3Descriptor { get; }
        public string PL4Descriptor { get; }

        public string LookFor1 { get; }
        public string LookFor2 { get; }
        public string LookFor3 { get; }
        public string LookFor4 { get; }

        public virtual ICollection<FrameworkNodeRubricRow> FrameworkNodeRubricRows { get; }
    }
}
