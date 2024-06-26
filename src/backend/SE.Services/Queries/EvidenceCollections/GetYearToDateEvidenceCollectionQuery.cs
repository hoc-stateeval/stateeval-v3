﻿using System;
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
    public class GetYearToDateEvidenceCollectionQueryValidator
    : AbstractValidator<GetYearToDateEvidenceCollectionQuery>
    {
        public GetYearToDateEvidenceCollectionQueryValidator()
        {
        }
    }
    public sealed class GetYearToDateEvidenceCollectionQuery :
        IRequest<YearToDateEvidenceCollectionDTO>
    {
        public long EvaluationId { get; set; }

        public GetYearToDateEvidenceCollectionQuery(long evaluationId)
        {
            EvaluationId = evaluationId;
        }

        internal sealed class GetYearToDateEvidenceCollectionQueryHandler :
            IRequestHandler<GetYearToDateEvidenceCollectionQuery, 
            YearToDateEvidenceCollectionDTO>
        {
            private readonly DataContext _dataContext;
            public GetYearToDateEvidenceCollectionQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<YearToDateEvidenceCollectionDTO> Handle(
                GetYearToDateEvidenceCollectionQuery request, 
                CancellationToken cancellationToken)
            {
                var evidenceItems = await _dataContext.EvidenceItems
                    .Include(x=> x.CreatedByUser)
                    .Where(x => x.EvaluationId == request.EvaluationId &&
                                x.Public)
                    .ToListAsync();

                var evidencePackages = await _dataContext.EvidencePackages
                    .Include(x => x.CreatedByUser)
                    .Include(x => x.EvidencePackageEvidenceItems)
                    .Where(x => x.EvaluationId == request.EvaluationId &&
                                x.Public)
                    .ToListAsync();

                var dto = new YearToDateEvidenceCollectionDTO()
                {
                    EvidenceItems = evidenceItems.Select(x => x.MapToEvidenceItemDTO()).ToList(),
                    EvidencePackages = evidencePackages.Select(x => x.MapToEvidencePackageDTO()).ToList()
                };

                return dto;
            }
        }
    }
}
