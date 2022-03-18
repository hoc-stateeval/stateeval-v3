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
using SE.Core.Common.Exceptions;
using SE.Core.Mappers;

namespace SE.Core.Queries.SchoolConfigurations
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
        IRequest<List<SchoolConfigurationDTO>>
    {
        public long FrameworkContextId { get; }

        public GetSchoolConfigurationsForFrameworkContextQuery(long frameworkContextId)
        {
            FrameworkContextId = frameworkContextId;
        }

        internal sealed class GetSchoolConfigurationsForFrameworkContextQueryHandler :
            IRequestHandler<GetSchoolConfigurationsForFrameworkContextQuery, 
                List<SchoolConfigurationDTO>>
        {
            private readonly DataContext _dataContext;
            public GetSchoolConfigurationsForFrameworkContextQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<SchoolConfigurationDTO>> Handle(GetSchoolConfigurationsForFrameworkContextQuery request, CancellationToken cancellationToken)
            {
                var frameworkContext = await _dataContext.SchoolConfigurations
                   .Where(x => x.Id == request.FrameworkContextId)
                   .FirstOrDefaultAsync();

                if (frameworkContext == null)
                {
                    throw new NotFoundException(nameof(SchoolConfiguration), request.FrameworkContextId);
                }

                var configs = await _dataContext.SchoolConfigurations
                    .Where(x => x.FrameworkContextId == request.FrameworkContextId)
                    .Select(x => x.MapToSchoolConfigurationDTO())
                    .ToListAsync();

                return configs;
            }
        }
    }
}
