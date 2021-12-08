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
        IRequest<SchoolConfigurationDTO>
    {
        public long Id { get; }

        public GetSchoolConfigurationByIdQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetSchoolConfigurationByIdQueryHandler : 
            IRequestHandler<GetSchoolConfigurationByIdQuery, SchoolConfigurationDTO>
        {
            private readonly DataContext _dataContext;
            public GetSchoolConfigurationByIdQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<SchoolConfigurationDTO> Handle(GetSchoolConfigurationByIdQuery request, CancellationToken cancellationToken)
            {
                SchoolConfiguration? config = await _dataContext.SchoolConfigurations
                    .Where(x => x.Id == request.Id).FirstOrDefaultAsync();

                SchoolConfigurationDTO configDTO = new SchoolConfigurationDTO()
                {
                    Id = config.Id,
                    SchoolCode = config.SchoolCode,
                    FrameworkContextId = config.FrameworkContextId,
                    IsPrincipalAssignmentDelegated = config.IsPrincipalAssignmentDelegated, 
                };

                return configDTO;
            }
        }
    }
}
