using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Core.Common;
using SE.Core.Common.Exceptions;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Commands.PerceptionSurveys
{
    public class SubmitSurveyResponsesCommandValidator
    : AbstractValidator<SubmitSurveyResponsesCommand>
    {
        public SubmitSurveyResponsesCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class SubmitSurveyResponsesCommand : IRequest<Unit>
    {
        /// <summary>
        /// The command containing the data for the survey submission
        /// </summary>
        /// <param name="surveyId">the survey id</param>
        /// <param name="responses">the collection of survey responses</param>
        /// <param name="ethniticies">the demographic data for the respondent's ethnicities</param>
        /// <param name="gender">the demographic data fro the respondent's gender</param>
        public SubmitSurveyResponsesCommand(long surveyId, List<PerceptionSurveyResponseDTO> responses, string ethniticies, string gender)
        {
            SurveyId = surveyId;
            Responses = responses;
            Enthicities = ethniticies;
            Gender = gender;
        }
        /// <summary>
        /// The survey id
        /// </summary>
        public long SurveyId { get; set; }
        /// <summary>
        /// The colelction of responses for the survey
        /// </summary>
        public List<PerceptionSurveyResponseDTO> Responses { get; set; }
        /// <summary>
        /// The demographic data for the respondent's ethniticities
        /// </summary>
        public string Enthicities { get; set; }
        /// <summary>
        /// The demographic data for the respondent's gender.
        /// </summary>
        public string Gender { get; set; }  
    }

    public class SubmitSurveyResponsesCommandHandler : 
        IRequestHandler<SubmitSurveyResponsesCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public SubmitSurveyResponsesCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(SubmitSurveyResponsesCommand request, CancellationToken cancellationToken)
        {
            PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
                .Where(x => x.Id == request.SurveyId)
                .FirstOrDefaultAsync();

            if (survey == null)
            {
                throw new NotFoundException(nameof(PerceptionSurvey), request.SurveyId);
            }

            request.Responses.ForEach(responseDTO =>
            {
                var response = new PerceptionSurveyResponse
                {
                    SurveyId = request.SurveyId,
                    StatementId = responseDTO.StatementId,
                    RespondentId = responseDTO.RespondentId,
                    LevelOfAgreement = responseDTO.LevelOfAgreement
                };

                _dataContext.PerceptionSurveyResponses.Add(response);
            });

            var demographic = new PerceptionSurveyDemographic
            {
                SurveyId = request.SurveyId,
                Ethnicities = request.Enthicities,
                Gender = request.Gender
            };

            _dataContext.PerceptionSurveyDemographics.Add(demographic);
  
            await _dataContext.SaveChangesAsync();

            return Unit.Value;
        }
    }

}
