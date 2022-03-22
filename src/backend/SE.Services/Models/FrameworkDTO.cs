using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// A framework (instructional or state)
    /// </summary>
    public class FrameworkDTO
    {
        /// <summary>
        /// The framework id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The name of the framework, such as 'Danielson'
        /// </summary>
        public string Name { get; set; } = "";
        /// <summary>
        /// The tag name of the framework, such as DAN, CEL, MAR-TR, MAR-PR, LEADERSHIP
        /// </summary>
        public string FrameworkTagName { get; set; } = "";

        /// <summary>
        /// A collection of framework nodes for the framework
        /// </summary>
        public List<FrameworkNodeDTO> FrameworkNodes { get; set; } = new List<FrameworkNodeDTO>();
    }
}
