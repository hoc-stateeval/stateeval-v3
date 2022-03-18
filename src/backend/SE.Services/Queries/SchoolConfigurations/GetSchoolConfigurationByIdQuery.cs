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
using SE.Core.Mappers;
using SE.Core.Common.Exceptions;

namespace SE.Core.Queries.SchoolConfigurations
{
    public class GetSchoolConfigurationByIdQueryValidator
    : AbstractValidator<GetSchoolConfigurationByIdQuery>
    {
        public GetSchoolConfigurationByIdQueryValidator()
        {
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
                var config = await _dataContext.SchoolConfigurations
                   .Where(x => x.Id == request.Id)
                   .FirstOrDefaultAsync();

                if (config == null)
                {
                    throw new NotFoundException(nameof(SchoolConfiguration), request.Id);
                }

                return config.MapToSchoolConfigurationDTO();
            }
        }
    }
}
