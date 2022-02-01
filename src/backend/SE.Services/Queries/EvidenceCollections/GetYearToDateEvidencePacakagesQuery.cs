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
    public class GetYearToDateEvidencePackagesQueryValidator
    : AbstractValidator<GetYearToDateEvidencePackagesQuery>
    {
        public GetYearToDateEvidencePackagesQueryValidator()
        {
        }
    }
    public sealed class GetYearToDateEvidencePackagesQuery : 
        IRequest<IResponse<List<EvidencePackageDTO>>>
    {
        public long EvaluationId { get; set; }

        public GetYearToDateEvidencePackagesQuery(long evaluationId)
        {
            EvaluationId = evaluationId;
        }

        internal sealed class GetYearToDateEvidencePackagesQueryHandler : 
            IRequestHandler<GetYearToDateEvidencePackagesQuery, IResponse<List<EvidencePackageDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetYearToDateEvidencePackagesQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<EvidencePackageDTO>>> Handle(GetYearToDateEvidencePackagesQuery request, CancellationToken cancellationToken)
            {
                var evidenceItems = await _dataContext.EvidencePackages
                    .Include(x=>x.CreatedByUser)
                    .Include(x=>x.Observation)
                    .Include(x=>x.EvidencePackageEvidenceItems).ThenInclude(x=>x.EvidenceItem)
                    .Where(x => x.EvaluationId == request.EvaluationId &&
                                x.Public)
                    .ToListAsync();

                return Response.Success(evidenceItems.Select(x => x.MapToEvidencePackageDTO()).ToList());
            }
        }
    }
}
