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
    public interface ISchoolConfigurationService
    {
        public Task<SchoolConfigurationDTO> GetSchoolConfigurationById(long id);
        public Task<List<SchoolConfigurationDTO>> GetSchoolConfigurationsForFrameworkContext(long frameworkContextId);
    }

    public class SchoolConfigurationService : BaseService, ISchoolConfigurationService
    {
        private readonly DataContext _dataContext;
        public SchoolConfigurationService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<SchoolConfigurationDTO> GetSchoolConfigurationById(long id)
        {
            var config = await _dataContext.SchoolConfigurations
               .Where(x => x.Id == id)
               .Select(x => x.MapToSchoolConfigurationDTO())
               .FirstOrDefaultAsync();

            return config;
        }

        public async Task<List<SchoolConfigurationDTO>> GetSchoolConfigurationsForFrameworkContext(long frameworkContextId)
        {
            var configs = await _dataContext.SchoolConfigurations
               .Where(x => x.FrameworkContextId == frameworkContextId)
               .Select(x => x.MapToSchoolConfigurationDTO())
               .ToListAsync();

            return configs;
        }
    }
}
