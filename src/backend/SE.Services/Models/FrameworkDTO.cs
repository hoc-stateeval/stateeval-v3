using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class FrameworkDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }

        public List<FrameworkNodeDTO> FrameworkNodes { get; set; }
    }
}
