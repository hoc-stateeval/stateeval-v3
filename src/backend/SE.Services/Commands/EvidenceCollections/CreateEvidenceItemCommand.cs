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
    public class CreateEvidenceItemCommandValidator
    : AbstractValidator<CreateEvidenceItemCommand>
    {
        public CreateEvidenceItemCommandValidator()
        {
            RuleFor(x => x.EvidenceCollectionObjectId).GreaterThan(0);
            RuleFor(x => x.RubricRowId).GreaterThan(0);
            RuleFor(x => x.CreatedByUserId).GreaterThan(0);
            RuleFor(x => x.EvaluationId).GreaterThan(0);
            RuleFor(x => x.EvidenceType).NotEqual(EvidenceType.UNDEFINED);
            RuleFor(x => x.EvidenceCollectionType).NotEqual(EvidenceCollectionType.UNDEFINED);
            RuleFor(x => x.EvidenceText).NotEmpty();

            RuleFor(x => x.UserPromptReponseId).GreaterThan(0)
                .When(x => Enum.GetName(typeof(EvidenceType), x.EvidenceType).Contains("PROMPT_RESPONSE"));

            RuleFor(x => x.CodedEvidenceClientId).NotEmpty()
                 .When(x => Enum.GetName(typeof(EvidenceType), x.EvidenceType).Contains("CODED"));
        }
    }
    public sealed class CreateEvidenceItemCommand : IRequest<IResponse<Unit>>
    {
        public long EvidenceCollectionObjectId { get; }
        public EvidenceCollectionType EvidenceCollectionType { get; }
        public EvidenceType EvidenceType { get; }
        public long CreatedByUserId { get; }
        public long RubricRowId { get; }
        public long EvaluationId { get; }
        public string EvidenceText { get; } = string.Empty;
        public Guid? CodedEvidenceClientId { get; }
        public long? UserPromptReponseId { get; }
        public bool Public { get; }
    }

    public class CreateEvidenceItemCommandHandler :
    IRequestHandler<CreateEvidenceItemCommand, IResponse<Unit>>
    {
        private readonly DataContext _dataContext;
         public CreateEvidenceItemCommandHandler(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<IResponse<Unit>> Handle(CreateEvidenceItemCommand request, CancellationToken cancellationToken)
        {
            var evidenceItem = new EvidenceItem()
            {
                EvidenceCollectionType = request.EvidenceCollectionType,
                EvidenceType = request.EvidenceType,
                EvidenceCollectionObjectId = request.EvidenceCollectionObjectId,
                EvaluationId = request.EvaluationId,
                RubricRowId = request.RubricRowId,
                CreatedByUserId = request.CreatedByUserId,
                EvidenceText = request.EvidenceText,
                CodedEvidenceClientId = request.CodedEvidenceClientId,
                UserPromptResponseId = request.UserPromptReponseId,
                Public = request.Public,
            };

            _dataContext.EvidenceItems.Add(evidenceItem);
            _dataContext.SaveChanges();

            return Response.Success(Unit.Value);
        }
    }
}
