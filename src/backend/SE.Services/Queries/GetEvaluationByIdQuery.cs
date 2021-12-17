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

                return evaluation;
            }
        }
    }
}
