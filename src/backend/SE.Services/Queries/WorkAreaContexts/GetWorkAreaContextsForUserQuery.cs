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
using SE.Core.Services;
using SE.Core.Common;

namespace SE.Core.Queries.WorkAreaContexts
{
    public class GetWorkAreaContextsForUserQueryValidator
    : AbstractValidator<GetWorkAreaContextsForUserQuery>
    {
        public GetWorkAreaContextsForUserQueryValidator()
        {
        }
    }
    public sealed class GetWorkAreaContextsForUserQuery : 
        IRequest<IResponse<List<WorkAreaContextDTO>>>
    {
        public long UserId { get; }

        public GetWorkAreaContextsForUserQuery(long userId)
        {
            UserId = userId;
        }

        internal sealed class GetWorkAreaContextsForUserQueryHandler : 
            IRequestHandler<GetWorkAreaContextsForUserQuery, IResponse<List<WorkAreaContextDTO>>>
        {
            private readonly DataContext _dataContext;
            private readonly IWorkAreaContextService _workAreaContextService;
            private readonly IEvaluationService _evaluationService;
            public GetWorkAreaContextsForUserQueryHandler(
                DataContext dataContext, 
                IWorkAreaContextService workAreaContextService, 
                IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _workAreaContextService = workAreaContextService;
                _evaluationService = evaluationService;
            }

            public async Task<IResponse<List<WorkAreaContextDTO>>> Handle(GetWorkAreaContextsForUserQuery request, CancellationToken cancellationToken)
            {
                var workAreaContexts = await _workAreaContextService
                    .GetWorkAreaContextsForUser(request.UserId);

                workAreaContexts.ForEach(x =>
                {
                    if (x.IsEvaluatee)
                    {
                        var evaluationId = _dataContext.Evaluations
                            .Where(y => y.FrameworkContextId == x.FrameworkContextId &&
                                        y.EvaluateeId == request.UserId)
                            .Select(y => y.Id)
                            .FirstOrDefault();
                        x.EvaluateeEvaluationId = evaluationId;

                    }
                    else if (x.IsEvaluator)
                    {
                        var expr = _evaluationService.GetLambaExpressionForWorkAreaContextEvaluations(
                                        x.FrameworkContextId, x.UserId, x.SchoolCode,
                                        x.IsEvaluatee, x.IsEvaluator, x.TagName);

                        var evaluatees = _dataContext.Evaluations
                              .Include(x => x.Evaluatee)
                              .OrderBy(x => x.Evaluatee.FirstName).ThenBy(x => x.Evaluatee.LastName)
                              .Where(expr)
                              .Select(x => new EvaluateeDTO
                              {
                                  EvaluationId = x.Id,
                                  DisplayName = x.Evaluatee.FirstName + " " + x.Evaluatee.LastName
                              })
                              .ToList();

                        x.Evaluatees = evaluatees;
                    }
                });

                return Response.Success(workAreaContexts);
            }
        }
    }
}
