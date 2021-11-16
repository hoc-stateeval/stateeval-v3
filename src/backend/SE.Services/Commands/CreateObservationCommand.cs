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

namespace SE.Core.Commands
{
    public class CreateObservationCommandValidator
    : AbstractValidator<CreateObservationCommand>
    {
        public CreateObservationCommandValidator()
        {
            RuleFor(x=>x.EvaluationId).NotEmpty();
            RuleFor(x => x.EvaluateePlanType).NotEmpty();
            RuleFor(x=>x.EvaluatorId).NotEmpty();
        }
    }
    public sealed class CreateObservationCommand : 
        IRequest<long>
    {
        public long EvaluationId { get; }
        public string Title { get; }
        public EvaluateePlanType EvaluateePlanType { get; }
        public long EvaluatorId { get; }

        public CreateObservationCommand(long evaluationId, string title, EvaluateePlanType evaluateePlanType, long evaluatorId)
        {
            EvaluationId = evaluationId;
            Title = title;
            EvaluateePlanType = evaluateePlanType;
            EvaluatorId = evaluatorId;  
        }
    }

    public class CreateObservationCommandHandler :
    IRequestHandler<CreateObservationCommand, long>
    {
        private readonly DataContext _dataContext;
        public CreateObservationCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<long> Handle(CreateObservationCommand request, CancellationToken cancellationToken)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                 .Where(x => x.Id == request.EvaluationId)
                 .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Observation), request.EvaluationId);
            }

            User? evaluator = await _dataContext.Users
                .Where(x => x.Id == request.EvaluatorId)
                .FirstOrDefaultAsync();

            if (evaluator == null)
            {
                throw new NotFiniteNumberException(nameof(User), request.EvaluatorId);
            }

            int count = _dataContext.Observations
                .Where(x => x.EvaluationId == evaluation.Id)
                .ToList()
                .Count();

            string shortName = $"Obs {EnumUtils.GetCurrentSchoolYearDisplayName()} .{Convert.ToString(count + 1)}";

            Observation observation = new Observation()
            {
                EvaluationId = request.EvaluationId,
                EvaluatorId = request.EvaluatorId,
                ShortName = shortName,
                Title = String.IsNullOrEmpty(request.Title) ? shortName : request.Title,
                CreationDateTime = DateTime.Now,
                EvaluateePlanType = request.EvaluateePlanType,
            };

            _dataContext.Observations.Add(observation);
            _dataContext.SaveChanges();

            return observation.Id;
        }
    }
}
