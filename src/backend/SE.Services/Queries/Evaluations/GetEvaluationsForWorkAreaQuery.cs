﻿using FluentValidation;
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
using SE.Core.Common.Exceptions;

namespace SE.Core.Queries.Evaluations
{
    public class GetEvaluationsForWorkAreaContextQueryValidator
    : AbstractValidator<GetEvaluationsForWorkAreaContextQuery>
    {
        public GetEvaluationsForWorkAreaContextQueryValidator()
        {
            RuleFor(x => x.WorkAreaContextId).NotEmpty();
        }
    }
    public sealed class GetEvaluationsForWorkAreaContextQuery : 
        IRequest<List<EvaluationSummaryDTO>>
    {
        public long WorkAreaContextId { get; }

        public GetEvaluationsForWorkAreaContextQuery(long workAreaContextId)
        {
            WorkAreaContextId = workAreaContextId;
        }

        internal sealed class GetEvaluationsForWorkAreaContextQueryHandler : 
            IRequestHandler<GetEvaluationsForWorkAreaContextQuery, List<EvaluationSummaryDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IEvaluationService _evaluationService;

            public GetEvaluationsForWorkAreaContextQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<List<EvaluationSummaryDTO>> Handle(GetEvaluationsForWorkAreaContextQuery request, CancellationToken cancellationToken)
            {
                WorkAreaContext? workAreaContext = await _dataContext.WorkAreaContexts
                    .Include(x=>x.Building)
                    .Include(x => x.WorkArea)
                    .Where(x => x.Id == request.WorkAreaContextId).FirstOrDefaultAsync(cancellationToken: cancellationToken);

                if (workAreaContext == null)
                {
                    throw new NotFoundException(nameof(WorkAreaContext), request.WorkAreaContextId);
                }

                var evaluations = await _evaluationService.GetEvaluationsForWorkAreaContext(workAreaContext);

                return evaluations;
            }
        }
    }
}
