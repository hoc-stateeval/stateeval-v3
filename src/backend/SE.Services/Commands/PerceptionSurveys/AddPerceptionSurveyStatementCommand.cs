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
    public class AddPerceptionSurveyStatementCommandValidator
    : AbstractValidator<AddPerceptionSurveyStatementCommand>
    {
        public AddPerceptionSurveyStatementCommandValidator()
        {
            // put validation checks here
        }
    }
    public sealed class AddPerceptionSurveyStatementCommand : IRequest<IResponse<Unit>>
    {
        public long PerceptionSurveyId { get; set; }
        public long PerceptionSurveyStatementId { get; set; }
    }

    public class AddPerceptionSurveyStatementCommandHandler : IRequestHandler<AddPerceptionSurveyStatementCommand, IResponse<Unit>>
    {
        private readonly DataContext _dataContext;
        public AddPerceptionSurveyStatementCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<Unit>> Handle(AddPerceptionSurveyStatementCommand request, CancellationToken cancellationToken)
        {
            PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
              .Where(x => x.Id == request.PerceptionSurveyId)
              .FirstOrDefaultAsync();

            if (survey == null)
            {
                throw new NotFoundException(nameof(PerceptionSurvey), request.PerceptionSurveyId);
            }

            PerceptionSurveyStatement? statement = await _dataContext.PerceptionSurveyStatements
                  .Where(x => x.Id == request.PerceptionSurveyStatementId)
                  .FirstOrDefaultAsync();

            if (statement == null)
            {
                throw new NotFoundException(nameof(PerceptionSurveyStatement), request.PerceptionSurveyStatementId);
            }

            var surveySurveyStatement = new PerceptionSurveyPerceptionSurveyStatement
            {
                PerceptionSurveyId = request.PerceptionSurveyId,
                PerceptionSurveyStatementId = request.PerceptionSurveyStatementId
            };

            survey.PerceptionSurveyPerceptionSurveyStatements.Add(surveySurveyStatement);
            await _dataContext.SaveChangesAsync();

            return Response.Success(Unit.Value);
        }
    }

}
