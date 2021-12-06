using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Queries;

namespace SE.Services.Queries
{
    public sealed class GetLocalLoginDistrictsQuery :
        IRequest<List<DistrictWithSchoolsDTO>>
    {
        public GetLocalLoginDistrictsQuery()
        {
        }

        internal sealed class GetLocalLoginDistrictsQueryHandler : 
            IRequestHandler<GetLocalLoginDistrictsQuery, List<DistrictWithSchoolsDTO>>
        {
            private readonly DataContext _dataContext;
            public GetLocalLoginDistrictsQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<DistrictWithSchoolsDTO>> Handle(GetLocalLoginDistrictsQuery request, CancellationToken cancellationToken)
            {
                var districts = await _dataContext.Buildings.Where(x => !x.IsSchool).ToListAsync();
                var schools = await _dataContext.Buildings.Where(x => x.IsSchool).ToListAsync();    

                var list = districts.Select(x =>
                    new DistrictWithSchoolsDTO
                    {
                        Id = x.Id,
                        Name = x.DistrictName,
                        DistrictCode = x.DistrictCode,
                        Schools = schools.Where(y => y.DistrictCode==x.DistrictCode).Select(y =>
                            new SchoolDTO
                            {
                                Id = y.Id,
                                SchoolName = y.SchoolName,
                                DistrictCode = y.DistrictCode,
                                SchoolCode = y.SchoolCode
                            }).ToList()
                    }).ToList();

                return list;
            }
        }
    }
}
