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
            RuleFor(x => x.CollectionObjectId).GreaterThan(0);
            RuleFor(x => x.RubricRowId).GreaterThan(0);
            RuleFor(x => x.CreatedByUserId).GreaterThan(0);
            RuleFor(x => x.EvaluationId).GreaterThan(0);
            RuleFor(x => x.EvidenceType).NotEqual(EvidenceType.UNDEFINED);
            RuleFor(x => x.CollectionType).NotEqual(EvidenceCollectionType.UNDEFINED);
            RuleFor(x => x.EvidenceText).NotEmpty();

            RuleFor(x => x.UserPromptReponseId).GreaterThan(0)
                .When(x => Enum.GetName(typeof(EvidenceType), x.EvidenceType).Contains("PROMPT_RESPONSE"));

            RuleFor(x => x.CodedEvidenceClientId).NotEmpty()
                 .When(x => Enum.GetName(typeof(EvidenceType), x.EvidenceType).Contains("CODED"));
        }
    }
    public sealed class CreateEvidenceItemCommand : IRequest<IResponse<Unit>>
    {
        public CreateEvidenceItemCommand() { }
        public long CollectionObjectId { get; set; }
        public EvidenceCollectionType CollectionType { get; set;  }
        public EvidenceType EvidenceType { get; set; }
        public long CreatedByUserId { get; set; }
        public long RubricRowId { get; set; }
        public long EvaluationId { get; set; }
        public string EvidenceText { get; set; } = string.Empty;
        public Guid? CodedEvidenceClientId { get; set; }
        public long? UserPromptReponseId { get; set; }
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
                EvidenceCollectionType = request.CollectionType,
                EvidenceType = request.EvidenceType,
                EvidenceCollectionObjectId = request.CollectionObjectId,
                EvaluationId = request.EvaluationId,
                RubricRowId = request.RubricRowId,
                CreatedByUserId = request.CreatedByUserId,
                EvidenceText = request.EvidenceText,
                CodedEvidenceClientId = request.CodedEvidenceClientId,
                UserPromptResponseId = request.UserPromptReponseId,
                CreationDateTime = DateTime.Now,
                Public = request.Public,
            };

            _dataContext.EvidenceItems.Add(evidenceItem);
            await _dataContext.SaveChangesAsync();

            return Response.Success(Unit.Value);
        }
    }
}
