using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class FrameworkNodeRubricRow
    {
        public long FrameworkNodeId { get; }
        public long RubricRowId { get; }

        public int Sequence { get; }

        public virtual FrameworkNode FrameworkNode { get; }
        public virtual RubricRow RubricRow { get; }
    }
}
