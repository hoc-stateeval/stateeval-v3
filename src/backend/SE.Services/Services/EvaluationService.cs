﻿using Microsoft.EntityFrameworkCore;
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
    public interface IEvaluationService
    {
        public IQueryable<EvaluationSummaryDTO> ExecuteEvaluationSummaryDTOQuery(System.Linq.Expressions.Expression<System.Func<Evaluation, bool>> expr);
    }

    public class EvaluationService : BaseService, IEvaluationService
    {
        private readonly DataContext _dataContext;
        public EvaluationService(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public IQueryable<EvaluationSummaryDTO> ExecuteEvaluationSummaryDTOQuery(System.Linq.Expressions.Expression<System.Func<Evaluation, bool>> expr)
        {
            return _dataContext.Evaluations
                  .Include(x => x.Evaluatee)
                  .Include(x => x.Evaluator)
                  .Include(x => x.FocusedFrameworkNode)
                  .Include(x => x.FocusedSGFrameworkNode)
                  .OrderBy(x => x.Evaluatee.FirstName).ThenBy(x => x.Evaluatee.LastName)
                  .Where(expr)
                  .Select(e => Mapper.MapToEvaluationSummaryDTO(e));
        }
    }
}
