using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class FrameworkContextPrototype : BaseEntity
    {
        public string Name { get; }
        public SchoolYear SchoolYear { get; }
        public EvaluationType EvaluationType { get; }
        public virtual Framework StateFramework { get; }
        public virtual Framework? InstructionalFramework { get; }
        public string FrameworkTagName { get; }
    }
}
