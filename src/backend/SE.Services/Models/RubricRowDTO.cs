using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class RubricRowDTO
    {
        public long Id { get; set; }
        public string ShortName { get; set; } = "";
        public string Title { get; set; } = "";
        public string FrameworkNodeShortName { get; set; } = "";
        public bool IsStudentGrowthAligned { get; set; }
        public int Sequence { get; set; }

        public string PL1Descriptor { get; set; } = "";
        public string PL2Descriptor { get; set; } = "";
        public string PL3Descriptor { get; set; } = "";
        public string PL4Descriptor { get; set; } = "";

        public string LookFor1 { get; set; } = "";
        public string LookFor2 { get; set; } = "";
        public string LookFor3 { get; set; } = "";
        public string LookFor4 { get; set; } = "";
    }
}
