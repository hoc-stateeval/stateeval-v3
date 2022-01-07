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
    public class GetSchoolConfigurationsForFrameworkContextQueryValidator
    : AbstractValidator<GetSchoolConfigurationsForFrameworkContextQuery>
    {
        public GetSchoolConfigurationsForFrameworkContextQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
        }
    }
    public sealed class GetSchoolConfigurationsForFrameworkContextQuery :
        IRequest<IResponse<List<SchoolConfigurationDTO>>>
    {
        public long FrameworkContextId { get; }

        public GetSchoolConfigurationsForFrameworkContextQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetSchoolConfigurationsForFrameworkContextQueryHandler :
            IRequestHandler<GetSchoolConfigurationsForFrameworkContextQuery, IResponse<List<SchoolConfigurationDTO>>>
        {
            private readonly ISchoolConfigurationService _schoolConfigurationService;
            public GetSchoolConfigurationsForFrameworkContextQueryHandler(ISchoolConfigurationService schoolConfigurationService)
            {
                _schoolConfigurationService = schoolConfigurationService;
            }

            public async Task<IResponse<List<SchoolConfigurationDTO>>> Handle(GetSchoolConfigurationsForFrameworkContextQuery request, CancellationToken cancellationToken)
            {
                var configs = await _schoolConfigurationService.GetSchoolConfigurationsForFrameworkContext(request.FrameworkContextId);
                return Response.Success(configs);
            }
        }
    }
}
