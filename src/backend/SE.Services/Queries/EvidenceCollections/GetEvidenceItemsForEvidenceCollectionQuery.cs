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
    public class GetEvidenceItemsForEvidenceCollectionQueryValidator
    : AbstractValidator<GetEvidenceItemsForEvidenceCollectionQuery>
    {
        public GetEvidenceItemsForEvidenceCollectionQueryValidator()
        {
        }
    }
    public sealed class GetEvidenceItemsForEvidenceCollectionQuery :
        IRequest<List<EvidenceItemDTO>>
    {
        public long EvaluationId { get; set; }
        public EvidenceCollectionType CollectionType { get; set; }
        public long CollectionObjectId { get; set; }

        public GetEvidenceItemsForEvidenceCollectionQuery(
            long evaluationId, EvidenceCollectionType collectionType, long collectionObjectId)
        {
            EvaluationId = evaluationId;
            CollectionType = collectionType;
            CollectionObjectId = collectionObjectId;
        }

        internal sealed class GetEvidenceItemsForEvidenceCollectionQueryHandler :
            IRequestHandler<GetEvidenceItemsForEvidenceCollectionQuery, 
            List<EvidenceItemDTO>>
        {
            private readonly DataContext _dataContext;
            public GetEvidenceItemsForEvidenceCollectionQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<EvidenceItemDTO>> Handle(
                GetEvidenceItemsForEvidenceCollectionQuery request, 
                CancellationToken cancellationToken)
            {
                var evidenceItems = await _dataContext.EvidenceItems
                    .Include(x => x.CreatedByUser)
                    .Where(x => x.EvaluationId == request.EvaluationId &&
                                (EnumUtils.AggregateCollection(request.CollectionType) ||
                                (x.EvidenceCollectionType == request.CollectionType &&
                                x.EvidenceCollectionObjectId == request.CollectionObjectId)) &&
                                (!EnumUtils.AggregateCollection(request.CollectionType) || x.Public))
                    .Select(x => x.MapToEvidenceItemDTO())
                    .ToListAsync();

                return evidenceItems;
            }
        }
    }
}
