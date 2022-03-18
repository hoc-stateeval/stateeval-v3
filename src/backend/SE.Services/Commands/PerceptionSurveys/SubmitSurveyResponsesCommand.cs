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
        public SubmitSurveyResponsesCommand(long surveyId, List<PerceptionSurveyResponseDTO> responses, string ethniticies, string gender)
        {
            SurveyId = surveyId;
            Responses = responses;
            Enthicities = ethniticies;
            Gender = gender;
        }
        public long SurveyId { get; set; }
        public List<PerceptionSurveyResponseDTO> Responses { get; set; }
        public string Enthicities { get; set; }
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
                    LevelOfAgreement = responseDTO.LevelOfAgreement
                };

                _dataContext.PerceptionSurveyResponses.Add(response);
            });
  
            await _dataContext.SaveChangesAsync();

            return Unit.Value;
        }
    }

}
