using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    public class FrameworkNodeDTO
    {
        public long Id { get; set; }

        public long FrameworkId { get; set; }
        public string ShortName { get; set; } = "";
        public string Title { get; set; } = "";
        public bool IsStudentGrowthAligned { get; set; }
        public int Sequence { get; set; }
        public List<RubricRowDTO> RubricRows { get; set; } = new List<RubricRowDTO>();
    }
}
