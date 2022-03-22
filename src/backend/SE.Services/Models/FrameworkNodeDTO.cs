using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    ///  A framework node represents a criterion in a framework, such as D1, D2, D3, D4 in the Danielson Framework
    /// </summary>
    public class FrameworkNodeDTO
    {
        /// <summary>
        /// The framework node id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The framework id the framework node is associated with
        /// </summary>
        public long FrameworkId { get; set; }

        /// <summary>
        /// The short name for the framework node, such as D1, D2, D3, D4 for the Danielson Framework
        /// </summary>
        public string ShortName { get; set; } = "";

        /// <summary>
        /// The full title for the framework node, such as "Planning and Preparation" for D1 in Danielson Framework
        /// </summary>
        public string Title { get; set; } = "";
        /// <summary>
        /// Is true when the framework no contains student growth rubric components
        /// </summary>
        public bool IsStudentGrowthAligned { get; set; }

        /// <summary>
        /// The sequence of the framework node within the framework. For example D1, D2, D3, D4 for Danielson Framework.
        /// </summary>
        public int Sequence { get; set; }
        /// <summary>
        /// The collection of rubric components associated with the framework node.
        /// </summary>
        public List<RubricRowDTO> RubricRows { get; set; } = new List<RubricRowDTO>();
    }
}
