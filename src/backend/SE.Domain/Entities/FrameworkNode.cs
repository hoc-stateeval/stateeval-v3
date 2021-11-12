using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class FrameworkNode : BaseEntity
    {
        public string ShortName { get; }
        public string Title { get; }
        public string FrameworkTagName { get; }
        public bool IsStudentGrowthAligned { get; }

        public SchoolYear SchoolYear { get; }
        public int Sequence { get; }
        public virtual Framework Framework { get; }
        public virtual ICollection<FrameworkNodeRubricRow> FrameworkNodeRubricRows { get; }
    }
}
