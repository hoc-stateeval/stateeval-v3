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
            private readonly IEvaluationService _evaluationService;
            public GetEvaluationByIdQueryHandler(DataContext dataContext, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _evaluationService = evaluationService;
            }

            public async Task<EvaluationSummaryDTO> Handle(GetEvaluationByIdQuery request, CancellationToken cancellationToken)
            {
                var evaluation = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.Id == request.Id)
                    .FirstOrDefaultAsync();

                if (evaluation == null)
                {
                    throw new NotFoundException(nameof(EvidenceItem), request.Id);
                }

                return evaluation;
            }
        }
    }
}
