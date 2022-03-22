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
    public class CreatePerceptionSurveyCommandValidator
    : AbstractValidator<CreatePerceptionSurveyCommand>
    {
        public CreatePerceptionSurveyCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class CreatePerceptionSurveyCommand : 
        IRequest<PerceptionSurveyDTO>
    {
        public long EvaluationId { get; set; }
        public string SchoolCode { get; set; } = string.Empty;

        public string LocationOrigin { get; set; } = string.Empty;

        public CreatePerceptionSurveyCommand(
           long evaluationId,
           string schoolCode,
           string locationOrigin)
        {
            EvaluationId = evaluationId;
            SchoolCode = schoolCode;
            LocationOrigin = locationOrigin;
        }
    }


    public class CreatePerceptionSurveyCommandHandler : 
        IRequestHandler<CreatePerceptionSurveyCommand, 
        PerceptionSurveyDTO>
    {
        private readonly DataContext _dataContext;
        public CreatePerceptionSurveyCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<PerceptionSurveyDTO> Handle(CreatePerceptionSurveyCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                  .Where(x => x.Id == request.EvaluationId)
                  .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Evaluation), request.EvaluationId);
            }

            PerceptionSurvey survey = new PerceptionSurvey();
            survey.Title = "New Perception Survey";
            survey.SchoolCode = request.SchoolCode;
            survey.EvaluationId = request.EvaluationId;
            survey.WfState = WfState.PERCEPTION_SURVEY_BUILDING;

            string guid = Guid.NewGuid().ToString();
            survey.Guid = guid;

            string fullUrl = request.LocationOrigin + "/perception-surveys/student-survey/" + guid;
            if (request.LocationOrigin.Contains("localhost"))
            {
                survey.TinyURL = fullUrl;
            }
            else
            {
                survey.TinyURL = WebUtils.MakeTinyUrl(fullUrl);
            }

            _dataContext.PerceptionSurveys.Add(survey);
            await _dataContext.SaveChangesAsync();

            survey = await _dataContext.PerceptionSurveys
                .Include(x=>x.PerceptionSurveyPerceptionSurveyStatements)
                .Where(x => x.Id == survey.Id)
                .FirstAsync();

            return survey.MapToPerceptionSurveyDTO();
        }
    }

}
