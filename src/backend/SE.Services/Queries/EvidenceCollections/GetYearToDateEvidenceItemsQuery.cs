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
using SE.Core.Common;
using SE.Core.Mappers;

namespace SE.Core.Queries.EvidenceCollections
{
    public class GetYearToDateEvidenceItemsQueryValidator
    : AbstractValidator<GetYearToDateEvidenceItemsQuery>
    {
        public GetYearToDateEvidenceItemsQueryValidator()
        {
        }
    }
    public sealed class GetYearToDateEvidenceItemsQuery : 
        IRequest<IResponse<List<EvidenceItemDTO>>>
    {
        public long EvaluationId { get; set; }

        public GetYearToDateEvidenceItemsQuery(long evaluationId)
        {
            EvaluationId = evaluationId;
        }

        internal sealed class GetYearToDateEvidenceItemsQueryHandler : 
            IRequestHandler<GetYearToDateEvidenceItemsQuery, IResponse<List<EvidenceItemDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetYearToDateEvidenceItemsQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<EvidenceItemDTO>>> Handle(GetYearToDateEvidenceItemsQuery request, CancellationToken cancellationToken)
            {
                var evidenceItems = _dataContext.EvidenceItems
                    .Include(x=>x.CreatedByUser)
                    .Include(x=>x.Observation)
                    .Where(x => x.EvaluationId == request.EvaluationId);

                return Response.Success(evidenceItems.Select(x => x.MapToEvidenceItemDTO()).ToList());
            }
        }
    }
}
