using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// Represents a rubric component within a framework
    /// </summary>
    public class RubricRowDTO
    {
        /// <summary>
        /// The id of the rubric row
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// The short name for the rubric component, such as 1a, 1b, 1c within the D1 framework node
        /// </summary>
        public string ShortName { get; set; } = "";
        /// <summary>
        /// The full title for the rubric component, such as "Demonstrating Knowledge of Content and Pedagogy" for 1a.
        /// </summary>
        public string Title { get; set; } = "";
        /// <summary>
        /// The frameworknode shortname associated with this rubric component
        /// </summary>
        public string FrameworkNodeShortName { get; set; } = "";
        /// <summary>
        /// The frameworknode id associated with this rubric component
        /// </summary>
        public long FrameworkNodeId { get; set; }
        /// <summary>
        /// True if the rubric component is measuring student growth 
        /// </summary>
        public bool IsStudentGrowthAligned { get; set; }
        /// <summary>
        /// The sequence of the rubric component within the framework node
        /// </summary>
        public int Sequence { get; set; }

        /// <summary>
        /// The performance level descriptor for level 1
        /// </summary>
        public string PL1Descriptor { get; set; } = "";
        /// <summary>
        /// The performance level descriptor for level 2
        /// </summary>
        public string PL2Descriptor { get; set; } = "";
        /// <summary>
        /// The performance level descriptor for level 3
        /// </summary>
        public string PL3Descriptor { get; set; } = "";
        /// <summary>
        /// The performance level descriptor for level 4
        /// </summary>
        public string PL4Descriptor { get; set; } = "";

        /// <summary>
        /// Danielson framework only: extended descriptor for level 1
        /// </summary>
        public string LookFor1 { get; set; } = "";

        /// <summary>
        /// Danielson framework only: extended descriptor for level 2
        /// </summary>
        public string LookFor2 { get; set; } = "";
        /// <summary>
        /// Danielson framework only: extended descriptor for level 3
        /// </summary>
        public string LookFor3 { get; set; } = "";
        /// <summary>
        /// Danielson framework only: extended descriptor for level 4
        /// </summary>
        public string LookFor4 { get; set; } = "";
    }
}
