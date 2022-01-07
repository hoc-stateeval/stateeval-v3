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

namespace SE.Core.Queries
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
            public GetWorkAreaContextsForUserQueryHandler(DataContext dataContext, IWorkAreaContextService workAreaContextService)
            {
                _dataContext = dataContext;
                _workAreaContextService = workAreaContextService;
            }

            public async Task<IResponse<List<WorkAreaContextDTO>>> Handle(GetWorkAreaContextsForUserQuery request, CancellationToken cancellationToken)
            {
                var workAreaContexts = await _workAreaContextService
                    .GetWorkAreaContextsForUser(request.UserId);

                return Response.Success(workAreaContexts);
            }
        }
    }
}
