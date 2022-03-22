using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// A perception survey teachers can optionally create for their evaluation
    /// </summary>
    public class PerceptionSurveyDTO
    {
        /// <summary>
        /// The survey id
        /// </summary>
        public long Id { get; set; }
        /// <summary>
        /// The survey guid
        /// </summary>
        public string Guid { get; set; }
        /// <summary>
        /// The survey evaluation id
        /// </summary>
        public long EvaluationId { get; set; }

        /// <summary>
        /// The schoolcode associated with the survey
        /// </summary>
        public string SchoolCode { get; set; } = "";
        /// <summary>
        /// The title of the survey
        /// </summary>
        public string Title { get; set; } = "";
        /// <summary>
        /// The tinyURL used by students to access the survey
        /// </summary>
        public string TinyURL { get; set; } = "";

        /// <summary>
        /// The work state of the survey
        /// </summary>
        public WfState WfState { get; set; }

        /// <summary>
        /// The string representation of the state of the survey
        /// </summary>
        public string WfStateDisplayName { get; set; } = "";
    }
}
