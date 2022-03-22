using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Models
{
    /// <summary>
    /// A response to a survey statement
    /// </summary>
    public class PerceptionSurveySubmissionDTO
    {
        /// <summary>
        /// The survey id
        /// </summary>
        public long SurveyId { get; set; }  

        /// <summary>
        /// The demographic data for the  ethnicities associated with the respondent
        /// </summary>
        public string Ethnitcities { get; set; } = string.Empty;

        /// <summary>
        /// The demographic data for the gender associated with the respondent
        /// </summary>
        public string Gender { get; set; } = string.Empty;

        /// <summary>
        /// The collection of responses submitted by the respondent
        /// </summary>
        public List<PerceptionSurveyResponse> Responses { get; set; } = new List<PerceptionSurveyResponse>();

    }
}
