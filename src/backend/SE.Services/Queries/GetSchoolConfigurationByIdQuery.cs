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
using SE.Core.Services;
using SE.Core.Common;

namespace SE.Core.Queries
{
    public class GetSchoolConfigurationByIdQueryValidator
    : AbstractValidator<GetSchoolConfigurationByIdQuery>
    {
        public GetSchoolConfigurationByIdQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
    public sealed class GetSchoolConfigurationByIdQuery : 
        IRequest<IResponse<SchoolConfigurationDTO>>
    {
        public long Id { get; }

        public GetSchoolConfigurationByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetSchoolConfigurationByIdQueryHandler : 
            IRequestHandler<GetSchoolConfigurationByIdQuery, IResponse<SchoolConfigurationDTO>>
        {
            private readonly ISchoolConfigurationService _schoolConfigurationService;
            public GetSchoolConfigurationByIdQueryHandler(ISchoolConfigurationService schoolConfigurationService)
            {
                _schoolConfigurationService = schoolConfigurationService;
            }

            public async Task<IResponse<SchoolConfigurationDTO>> Handle(GetSchoolConfigurationByIdQuery request, CancellationToken cancellationToken)
            {
                var configs = await _schoolConfigurationService.GetSchoolConfigurationById(request.Id);
                return Response.Success(configs);
            }
        }
    }
}
