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

namespace SE.Core.Commands.Observations
{
    public class CreateObservationNoteEvidenceCommandValidator
    : AbstractValidator<CreateObservationNoteEvidenceCommand>
    {
        public CreateObservationNoteEvidenceCommandValidator()
        {
            RuleFor(x => x.Evidence).NotEmpty();
        }
    }
    public sealed class CreateObservationNoteEvidenceCommand : IRequest<IResponse<Unit>>
    {
        public long ObservationId { get; set; }
        public long RubricRowId {  get; set; }
        public string Evidence { get; set; } = string.Empty;
        public Guid ClientId { get; set; }
    }

    public class CreateObservationNoteEvidenceCommandHandler :
    IRequestHandler<CreateObservationNoteEvidenceCommand, IResponse<Unit>>
    {
        private readonly IRubricRowService _rubricRowService;
        public CreateObservationNoteEvidenceCommandHandler(IRubricRowService rubricRowService)
        {
            _rubricRowService = rubricRowService;
        }

        public async Task<IResponse<Unit>> Handle(CreateObservationNoteEvidenceCommand request, CancellationToken cancellationToken)
        {
            var result = await _rubricRowService.CreateObservationNoteEvidence(request.RubricRowId, request.ObservationId, request.Evidence, request.ClientId);
            return Response.Success(result);
        }
    }
}
