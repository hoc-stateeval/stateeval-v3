using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Queries;

namespace SE.Services.Queries
{
    public class GetEvaluationByIdQueryValidator
    : AbstractValidator<GetEvaluationByIdQuery>
    {
        public GetEvaluationByIdQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
    public sealed class GetEvaluationByIdQuery : 
        IRequest<EvaluationSummaryDTO>
    {
        public long Id { get; }

        public GetEvaluationByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetEvaluationByIdQueryHandler : 
            IRequestHandler<GetEvaluationByIdQuery, EvaluationSummaryDTO>
        {
            private readonly DataContext _dataContext;
            public GetEvaluationByIdQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<EvaluationSummaryDTO> Handle(GetEvaluationByIdQuery request, CancellationToken cancellationToken)
            {
                var query = _dataContext.Evaluations
                    .Include(x => x.Evaluatee)
                    .Include(x => x.Evaluator)
                    .Include(x => x.FocusedFrameworkNode)
                    .Include(x => x.FocusedSGFrameworkNode)
                    .Where(x => x.Id == request.Id);

                List<EvaluationSummaryDTO> evaluations = QueryUtils.BuildEvaluationSummaryDTO(query);
                return evaluations[0];
            }
        }
    }
}
