using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Domain.Entities
{
    public class FrameworkContext : BaseEntity
    {
        public string Name { get; }
        public SchoolYear SchoolYear { get; }
        public string DistrictCode { get; }
        public EvaluationType EvaluationType { get; }

        public long StateFrameworkId { get; }
        public virtual Framework StateFramework { get; }
        public long? InstructionalFrameworkId { get; }
        public virtual Framework InstructionalFramework { get; }
        public long DefaultFrameworkId { get; }
        public virtual Framework DefaultFramework { get; }
        public string FrameworkTagName { get; }
        public FrameworkViewType FrameworkViewType { get; }
        public DateTime LoadDateTime { get; }

        public virtual FrameworkContextPrototype PrototypeFrameworkContext { get; }
        public virtual DistrictConfiguration DistrictConfiguration { get; }
        public virtual ICollection<SchoolConfiguration> SchoolConfigurations { get; }
    }
}
