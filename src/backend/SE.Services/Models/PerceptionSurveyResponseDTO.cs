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
    public class PerceptionSurveyResponseDTO
    {
        /// <summary>
        /// The survey response id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// The survey id
        /// </summary>
        public long SurveyId { get; set; }  

        /// <summary>
        /// The respondent id, a GUID
        /// </summary>
        public Guid RespondentId { get; set; }
        /// <summary>
        /// The survey statement id
        /// </summary>
        public long StatementId { get; set; }
        /// <summary>
        /// The response value, represented by a level of agreement value
        /// </summary>
        public PerceptionSurveyLevelOfAgreement LevelOfAgreement { get; set; }
    }
}
