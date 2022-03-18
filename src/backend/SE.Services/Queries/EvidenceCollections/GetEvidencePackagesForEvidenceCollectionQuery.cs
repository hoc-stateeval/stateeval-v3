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
    public class GetEvidencePackagesForEvidenceCollectionQueryValidator
    : AbstractValidator<GetEvidencePackagesForEvidenceCollectionQuery>
    {
        public GetEvidencePackagesForEvidenceCollectionQueryValidator()
        {
        }
    }
    public sealed class GetEvidencePackagesForEvidenceCollectionQuery :
        IRequest<List<EvidencePackageDTO>>
    {
        public long EvaluationId { get; set; }
        public EvidenceCollectionType CollectionType { get; set; }
        public long? CollectionObjectId { get; set; }

        public GetEvidencePackagesForEvidenceCollectionQuery(
            long evaluationId, EvidenceCollectionType collectionType, long collectionObjectId)
        {
            EvaluationId = evaluationId;
            CollectionType = collectionType;
            CollectionObjectId = collectionObjectId;
        }

        internal sealed class GetEvidencePackagesForEvidenceCollectionQueryHandler :
            IRequestHandler<GetEvidencePackagesForEvidenceCollectionQuery, 
            List<EvidencePackageDTO>>
        {
            private readonly DataContext _dataContext;
            public GetEvidencePackagesForEvidenceCollectionQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<EvidencePackageDTO>> Handle(
                GetEvidencePackagesForEvidenceCollectionQuery request, 
                CancellationToken cancellationToken)
            {
                var evidencePackages = await _dataContext.EvidencePackages
                    .Include(x => x.CreatedByUser)
                    .Include(x => x.EvidencePackageEvidenceItems)
                    .Where(x => x.EvaluationId == request.EvaluationId &&
                                (EnumUtils.AggregateCollection(request.CollectionType) ||
                                (x.EvidenceCollectionType == request.CollectionType &&
                                x.EvidenceCollectionObjectId == request.CollectionObjectId)) &&
                                (!EnumUtils.AggregateCollection(request.CollectionType) || x.Public))
                    .Select(x => x.MapToEvidencePackageDTO())
                    .ToListAsync();

                return evidencePackages;
            }
        }
    }
}
