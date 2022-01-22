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
        IRequest<IResponse<List<EvidenceItemDTO>>>
    {
        public EvidenceCollectionType CollectionType { get; set; }
        public long CollectionObjectId { get; set;  }

        public GetEvidenceItemsForEvidenceCollectionQuery(
            EvidenceCollectionType collectionType,
            long collectionObjectId)
        {
            CollectionObjectId = collectionObjectId;
            CollectionType = collectionType;
        }

        internal sealed class GetEvidenceItemsForEvidenceCollectionQueryHandler : 
            IRequestHandler<GetEvidenceItemsForEvidenceCollectionQuery, IResponse<List<EvidenceItemDTO>>>
        {
            private readonly DataContext _dataContext;
            public GetEvidenceItemsForEvidenceCollectionQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<IResponse<List<EvidenceItemDTO>>> Handle(GetEvidenceItemsForEvidenceCollectionQuery request, CancellationToken cancellationToken)
            {
                var evidenceItems = _dataContext.EvidenceItems
                     .Where(x => x.EvidenceCollectionType == request.CollectionType &&
                               x.EvidenceCollectionObjectId == request.CollectionObjectId);

                return Response.Success(evidenceItems.Select(x => x.MapToEvidenceItemDTO()).ToList());
            }
        }
    }
}
