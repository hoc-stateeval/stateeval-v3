using Microsoft.EntityFrameworkCore;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Services
{
    public interface IBuildingService
    {
        public Task<List<BuildingDTO>> GetSchoolsInDistrict(string districtCode);
    }

    public class BuildingService : BaseService, IBuildingService
    {
        private readonly DataContext _dataContext;
        public BuildingService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<BuildingDTO>> GetSchoolsInDistrict(string districtCode)
        {
            var schools = await _dataContext.Buildings
                .Where(x => x.IsSchool && x.DistrictCode == districtCode)
                .ToListAsync();

            return schools.ToList().Select(x => x.MapToBuildingDTO()).ToList();
        }
    }
}
