using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using SE.Core.Common.Exceptions;
using SE.Core.Common;

namespace SE.Core.Commands.PerceptionSurveys
{
    public class DeleteSurveyCommandValidator
    : AbstractValidator<DeleteSurveyCommand>
    {
        public DeleteSurveyCommandValidator()
        {
        }
    }
    public sealed class DeleteSurveyCommand : 
        IRequest<Unit>
    {
        public long SurveyId { get; }
        public DeleteSurveyCommand(long surveyId)
        {
            SurveyId = surveyId; 
        }
    }

    public class DeleteSurveyCommandHandler :
    IRequestHandler<DeleteSurveyCommand, Unit>
    {
        private readonly DataContext _dataContext;
        public DeleteSurveyCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Unit> Handle(DeleteSurveyCommand request, CancellationToken cancellationToken)
        {
            PerceptionSurvey? survey = await _dataContext.PerceptionSurveys
                 .Where(x => x.Id == request.SurveyId)
                 .FirstOrDefaultAsync();

            if (survey == null)
            {
                throw new NotFoundException(nameof(PerceptionSurvey), request.SurveyId);
            }

            _dataContext.PerceptionSurveys.Remove(survey);
            _dataContext.SaveChanges();

            return Unit.Value;
        }
    }
}
