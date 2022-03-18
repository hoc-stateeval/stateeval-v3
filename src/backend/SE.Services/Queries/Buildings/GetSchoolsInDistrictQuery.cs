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

namespace SE.Core.Queries.Buildings
{
    public class GetSchoolsInDistrictQueryValidator
    : AbstractValidator<GetSchoolsInDistrictQuery>
    {
        public GetSchoolsInDistrictQueryValidator()
        {
            RuleFor(x => x.DistrictCode).NotEmpty();
        }
    }
    public sealed class GetSchoolsInDistrictQuery :
        IRequest<List<BuildingDTO>>
    {
        public string DistrictCode { get; }

        public GetSchoolsInDistrictQuery(string districtCode)
        {
            DistrictCode = districtCode;
        }

        internal sealed class GetSchoolsInDistrictQueryHandler :
            IRequestHandler<GetSchoolsInDistrictQuery, List<BuildingDTO>>
        {
            private readonly IBuildingService _buildingService;
            public GetSchoolsInDistrictQueryHandler(IBuildingService buildingService)
            {
                _buildingService = buildingService;
            }

            public async Task<List<BuildingDTO>> Handle(GetSchoolsInDistrictQuery request, CancellationToken cancellationToken)
            {
                var schools = await _buildingService.GetSchoolsInDistrict(request.DistrictCode);
                return schools;
            }
        }
    }
}
