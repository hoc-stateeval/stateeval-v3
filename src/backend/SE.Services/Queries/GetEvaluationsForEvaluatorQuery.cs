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

namespace SE.Core.Queries
{
    public class GetEvaluationsForEvaluatorQueryValidator
    : AbstractValidator<GetEvaluationsForEvaluatorQuery>
    {
        public GetEvaluationsForEvaluatorQueryValidator()
        {
        }
    }
    public sealed class GetEvaluationsForEvaluatorQuery :
        IRequest<IResponse<List<EvaluationSummaryDTO>>>
    {
        public long FrameworkContextId { get; }
        public long EvaluatorId { get; }

        public GetEvaluationsForEvaluatorQuery(long frameworkContextId, long evaluatorId)
        {
            FrameworkContextId = frameworkContextId;
            EvaluatorId = evaluatorId;
        }

        internal sealed class GetEvaluationsForEvaluatorQueryHandler : 
            IRequestHandler<GetEvaluationsForEvaluatorQuery, IResponse<List<EvaluationSummaryDTO>>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;
            public GetEvaluationsForEvaluatorQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<IResponse<List<EvaluationSummaryDTO>>> Handle(GetEvaluationsForEvaluatorQuery request, CancellationToken cancellationToken)
            {
                var evaluations = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(
                            x => x.IsActive &&
                            x.FrameworkContextId == request.FrameworkContextId &&
                            x.EvaluatorId == request.EvaluatorId)
                    .ToListAsync();

                return Response.Success(evaluations);
            }
        }
    }
}
