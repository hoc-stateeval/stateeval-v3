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
using SE.Core.Common.Exceptions;
using SE.Core.Common;
using SE.Core.Services;
using SE.Core.Mappers;

namespace SE.Core.Commands.EvidenceCollections
{
    public class CreateEvidencePackageCommandValidator
    : AbstractValidator<CreateEvidencePackageCommand>
    {
        public CreateEvidencePackageCommandValidator()
        {
            RuleFor(x => x.CollectionObjectId).GreaterThan(0);
            RuleFor(x => x.RubricRowId).GreaterThan(0);
            RuleFor(x => x.CreatedByUserId).GreaterThan(0);
            RuleFor(x => x.EvaluationId).GreaterThan(0);
            RuleFor(x => x.CollectionType).NotEqual(EvidenceCollectionType.UNDEFINED);
            RuleFor(x => x.PerformanceLevel).NotEqual(RubricPerformanceLevel.UNDEFINED);
            RuleFor(x => x.RubricStatement).NotEmpty();
        }
    }
    public sealed class CreateEvidencePackageCommand : IRequest<IResponse<EvidencePackageDTO>>
    {
        public CreateEvidencePackageCommand() { }
        public long CollectionObjectId { get; set; }
        public EvidenceCollectionType CollectionType { get; set;  }
        public EvidenceType EvidenceType { get; set; }
        public long CreatedByUserId { get; set; }
        public long RubricRowId { get; set; }
        public long EvaluationId { get; set; }
        public string RubricStatement { get; set; } = string.Empty;
        public RubricPerformanceLevel PerformanceLevel { get; set; }

        public List<long> EvidenceItemIds { get; set; }
        public bool Public { get; set; }
    }

    public class CreateEvidencePackageCommandHandler :
    IRequestHandler<CreateEvidencePackageCommand, IResponse<EvidencePackageDTO>>
    {
        private readonly DataContext _dataContext;
         public CreateEvidencePackageCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<EvidencePackageDTO>> Handle(CreateEvidencePackageCommand request, CancellationToken cancellationToken)
        {
            var evidencePackage = new EvidencePackage()
            {
                EvidenceCollectionType = request.CollectionType,
                EvidenceCollectionObjectId = request.CollectionObjectId,
                EvaluationId = request.EvaluationId,
                RubricRowId = request.RubricRowId,
                CreatedByUserId = request.CreatedByUserId,
                RubricStatement = request.RubricStatement,
                CreationDateTime = DateTime.Now,
                PerformanceLevel = request.PerformanceLevel,
                Public = (request.CollectionType == EvidenceCollectionType.YEAR_TO_DATE),
            };

            _dataContext.EvidencePackages.Add(evidencePackage);

            var evidenceItems = await _dataContext.EvidenceItems
                               .Where(x => request.EvidenceItemIds.Contains(x.Id))
                               .ToListAsync();
    
            await _dataContext.SaveChangesAsync();

            evidencePackage = await _dataContext.EvidencePackages
                .Include(x => x.CreatedByUser)
                .Include(x => x.EvidencePackageEvidenceItems)
                .Where(x => x.Id == evidencePackage.Id)
                .FirstOrDefaultAsync();


            var evidencePackageEvidenceItems = evidenceItems.Select(x => new EvidencePackageEvidenceItem
            {
                EvidenceItemId = x.Id,
                EvidencePackageId = evidencePackage.Id
            }).ToList();

            _dataContext.EvidencePackageEvidenceItems.AddRange(evidencePackageEvidenceItems);

            //     await _dataContext.EvidencePackageEvidenceItems.AddRangeAsync(evidencePackageEvidenceItems);

            await _dataContext.SaveChangesAsync();


            return Response.Success(evidencePackage.MapToEvidencePackageDTO());
        }
    }
}
