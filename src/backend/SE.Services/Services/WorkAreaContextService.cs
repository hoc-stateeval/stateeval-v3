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
    public interface IWorkAreaContextService
    {
        public IQueryable<WorkAreaContextDTO> ExecuteWorkAreaContextDTOQuery(System.Linq.Expressions.Expression<System.Func<WorkAreaContext, bool>> expr);
    }

    public class WorkAreaContextService : BaseService, IWorkAreaContextService
    {
        private readonly DataContext _dataContext;
        public WorkAreaContextService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IQueryable<WorkAreaContextDTO> ExecuteWorkAreaContextDTOQuery(System.Linq.Expressions.Expression<System.Func<WorkAreaContext, bool>> expr)
        {
            return _dataContext.WorkAreaContexts
                .Include(x => x.User)
                .Include(x => x.FrameworkContext)
                .Include(x => x.Building)
                .Include(x => x.WorkArea).ThenInclude(x => x.Role)
                .Include(x => x.WorkArea).ThenInclude(x => x.EvaluateeRole)
                .Where(expr)
                .OrderBy(x => x.WorkArea.Priority)
                .Select(e => Mapper.MapToWorkAreaContextDTO(e));
        }
    }
}
