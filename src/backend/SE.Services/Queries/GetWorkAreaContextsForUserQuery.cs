using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using SE.Data;
using SE.Domain.Entities;
using SE.Core.Models;
using SE.Core.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SE.Core.Services;

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
        IRequest<List<WorkAreaContextDTO>>
    {
        public long UserId { get; }

        public GetWorkAreaContextsForUserQuery(long userId)
        {
            UserId = userId;
        }

        internal sealed class GetWorkAreaContextsForUserQueryHandler : 
            IRequestHandler<GetWorkAreaContextsForUserQuery, List<WorkAreaContextDTO>>
        {
            private readonly DataContext _dataContext;
            private readonly IWorkAreaContextService _workAreaContextService;
            public GetWorkAreaContextsForUserQueryHandler(DataContext dataContext, IWorkAreaContextService workAreaContextService)
            {
                _dataContext = dataContext;
                _workAreaContextService = workAreaContextService;
            }

            public async Task<List<WorkAreaContextDTO>> Handle(GetWorkAreaContextsForUserQuery request, CancellationToken cancellationToken)
            {
                var workAreaContexts = await _workAreaContextService
                     .ExecuteWorkAreaContextDTOQuery(x => x.UserId == request.UserId)
                     .ToListAsync();

                return workAreaContexts;
            }
        }
    }
}
