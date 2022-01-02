using Microsoft.EntityFrameworkCore;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Core.Utils;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE.Core.Services
{
    public interface IEvaluationService
    {
        public IQueryable<EvaluationSummaryDTO> ExecuteEvaluationSummaryDTOQuery(System.Linq.Expressions.Expression<System.Func<Evaluation, bool>> expr);
        public Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkAreaContext(WorkAreaContext workAreaContext);
    }

    public class EvaluationService : BaseService, IEvaluationService
    {
        private readonly DataContext _dataContext;
        public EvaluationService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkAreaContext(WorkAreaContext workAreaContext)
        {
            var evaluations = await ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                               x.FrameworkContextId == workAreaContext.FrameworkContextId &&
                               x.SchoolCode == workAreaContext.Building.SchoolCode &&
                               (
                                // Evaluatee - can only see their own evaluation
                                workAreaContext.WorkArea.IsEvaluatee && x.EvaluateeId == workAreaContext.UserId ||
                                // Evaluator
                                (workAreaContext.WorkArea.IsEvaluator &&
                                // Non-DTE - can see all evaluations at his building
                                ((workAreaContext.WorkArea.TagName != EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DTE) ||
                                 // DTE - can only see evaluations assigned to him
                                 x.EvaluatorId == workAreaContext.UserId)))))
                   .ToListAsync();

            return evaluations;
        }

        public IQueryable<EvaluationSummaryDTO> ExecuteEvaluationSummaryDTOQuery(System.Linq.Expressions.Expression<System.Func<Evaluation, bool>> expr)
        {
            return _dataContext.Evaluations
                  .Include(x => x.Evaluatee)
                  .Include(x => x.Evaluator)
                  .Include(x => x.FocusedFrameworkNode)
                  .Include(x => x.FocusedSGFrameworkNode)
                  .Include(x => x.FrameworkContext)
                  .OrderBy(x => x.Evaluatee.FirstName).ThenBy(x => x.Evaluatee.LastName)
                  .Where(expr)
                  .Select(e => Mapper.MapToEvaluationSummaryDTO(e));
        }
    }
}
