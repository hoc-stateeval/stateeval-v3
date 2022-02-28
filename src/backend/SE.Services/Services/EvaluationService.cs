using Microsoft.EntityFrameworkCore;
using SE.Core.Mappers;
using SE.Core.Models;
using SE.Core.Common;
using SE.Data;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Common.Exceptions;

namespace SE.Core.Services
{
    public interface IEvaluationService
    {
        public Task<Evaluation> GetEvaluationById(long id);
        public IQueryable<EvaluationSummaryDTO> ExecuteEvaluationSummaryDTOQuery(System.Linq.Expressions.Expression<System.Func<Evaluation, bool>> expr);
        public Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkAreaContext(WorkAreaContext workAreaContext);

        public System.Linq.Expressions.Expression<System.Func<Evaluation, bool>>
          GetLambaExpressionForWorkAreaContextEvaluations(
              long frameworkContextId, long userId, string schoolCode, bool isEvaluatee, bool isEvaluator, string workAreaTagName);
    }

    public class EvaluationService : BaseService, IEvaluationService
    {
        private readonly DataContext _dataContext;
        public EvaluationService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Evaluation> GetEvaluationById(long id)
        {
            Evaluation? evaluation = await _dataContext.Evaluations
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (evaluation == null)
            {
                throw new NotFoundException(nameof(Observation), id);
            }

            return evaluation;
        }

        public System.Linq.Expressions.Expression<System.Func<Evaluation, bool>> 
            GetLambaExpressionForWorkAreaContextEvaluations(
                long frameworkContextId, long userId, string schoolCode, bool isEvaluatee, bool isEvaluator, string workAreaTagName)
        {
            return (
                x => 
                    x.IsActive &&
                    x.FrameworkContextId == frameworkContextId &&
                    x.SchoolCode == schoolCode &&
                    (
                    // Evaluatee - can only see their own evaluation
                    isEvaluatee && x.EvaluateeId == userId ||
                    // Evaluator
                    (isEvaluator &&
                    // Non-DTE - can see all evaluations at his building
                    ((workAreaTagName != EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DTE) ||
                        // DTE - can only see evaluations assigned to him
                        x.EvaluatorId == userId)))));
        }

        public async Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkAreaContext(WorkAreaContext workAreaContext)
        {
            var evaluations = await ExecuteEvaluationSummaryDTOQuery(
                            GetLambaExpressionForWorkAreaContextEvaluations(
                                    workAreaContext.FrameworkContextId, workAreaContext.UserId, workAreaContext.Building.SchoolCode,
                                    workAreaContext.WorkArea.IsEvaluatee, workAreaContext.WorkArea.IsEvaluator, workAreaContext.WorkArea.TagName))
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
