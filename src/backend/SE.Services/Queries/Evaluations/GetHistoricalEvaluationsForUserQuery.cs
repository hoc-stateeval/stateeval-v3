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
using SE.Core.Mappers;
using SE.Core.Services;
using SE.Core.Common;

namespace SE.Core.Queries.Evaluations
{
    public class GetHistoricalEvaluationsForUserQueryValidator
    : AbstractValidator<GetHistoricalEvaluationsForUserQuery>
    {
        public GetHistoricalEvaluationsForUserQueryValidator()
        {
            RuleFor(x => x.UserId).NotEmpty();
        }
    }
    public sealed class GetHistoricalEvaluationsForUserQuery :
        IRequest<IResponse<List<EvaluationSummaryDTO>>>
    {
        public long UserId { get; }

        public GetHistoricalEvaluationsForUserQuery(long userId)
        {
            UserId = userId;
        }

        internal sealed class GetHistoricalEvaluationsForUserQueryHandler : 
            IRequestHandler<GetHistoricalEvaluationsForUserQuery, IResponse<List<EvaluationSummaryDTO>>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;

            public GetHistoricalEvaluationsForUserQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<IResponse<List<EvaluationSummaryDTO>>> Handle(GetHistoricalEvaluationsForUserQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive && x.EvaluateeId == request.UserId)
                    .ToListAsync();

                return Response.Success(evaluations);
            }
        }
    }
}
