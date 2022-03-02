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
    public class RemoveStatementFromSurveyCommandValidator
    : AbstractValidator<RemoveStatementFromSurveyCommand>
    {
        public RemoveStatementFromSurveyCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class RemoveStatementFromSurveyCommand : IRequest<IResponse<Unit>>
    {
        public RemoveStatementFromSurveyCommand(long surveyId, long statementId)
        {
            SurveyId = surveyId;
            StatementId = statementId;
        }
        public long SurveyId { get; set; }
        public long StatementId { get; set; }
    }

    public class RemoveStatementFromSurveyCommandHandler : IRequestHandler<RemoveStatementFromSurveyCommand, IResponse<Unit>>
    {
        private readonly DataContext _dataContext;
        public RemoveStatementFromSurveyCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<Unit>> Handle(RemoveStatementFromSurveyCommand request, CancellationToken cancellationToken)
        {
            PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
              .Where(x => x.Id == request.SurveyId)
              .FirstOrDefaultAsync();

            if (survey == null)
            {
                throw new NotFoundException(nameof(PerceptionSurvey), request.SurveyId);
            }

            PerceptionSurveyStatement? statement = await _dataContext.PerceptionSurveyStatements
              .Where(x => x.Id == request.StatementId)
              .FirstOrDefaultAsync();

            if (statement == null)
            {
                throw new NotFoundException(nameof(PerceptionSurveyStatement), request.StatementId);
            }

            var surveySurveyStatement = new PerceptionSurveyPerceptionSurveyStatement
            {
                PerceptionSurveyId = request.SurveyId,
                PerceptionSurveyStatementId = request.StatementId
            };

            survey.PerceptionSurveyPerceptionSurveyStatements.Remove(surveySurveyStatement);
            await _dataContext.SaveChangesAsync();

            return Response.Success(Unit.Value);
        }
    }

}
