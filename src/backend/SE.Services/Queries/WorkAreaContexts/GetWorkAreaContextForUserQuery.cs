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
using SE.Core.Mappers;
using SE.Core.Services;
using SE.Core.Common;

namespace SE.Core.Queries.WorkAreaContexts
{
    public class GetWorkAreaContextForUserQueryValidator
    : AbstractValidator<GetWorkAreaContextForUserQuery>
    {
        public GetWorkAreaContextForUserQueryValidator()
        {
        }
    }
    public sealed class GetWorkAreaContextForUserQuery : 
        IRequest<WorkAreaContextDTO>
    {
        public long FrameworkContextId { get; }
        public long UserId { get; }
        public string SchoolCode { get; }

        public GetWorkAreaContextForUserQuery(long frameworkContextId, long userId, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            UserId = userId;    
            SchoolCode = schoolCode;
        }

        internal sealed class GetWorkAreaContextForUserQueryHandler : 
            IRequestHandler<GetWorkAreaContextForUserQuery, WorkAreaContextDTO>
        {
            private readonly DataContext _dataContext;
            private readonly IWorkAreaContextService _workAreaContextService;
            public GetWorkAreaContextForUserQueryHandler(DataContext dataContext, IWorkAreaContextService workAreaContextService)
            {
                _dataContext = dataContext;
                _workAreaContextService = workAreaContextService;
            }

            public async Task<WorkAreaContextDTO> Handle(GetWorkAreaContextForUserQuery request, CancellationToken cancellationToken)
            {
                var workAreaContext = await _workAreaContextService
                    .ExecuteWorkAreaContextDTOQuery(x => x.UserId == request.UserId &&
                                                         x.FrameworkContextId == request.FrameworkContextId &&
                                                         x.Building.SchoolCode == request.SchoolCode)
                    .FirstAsync();

                return workAreaContext;
            }
        }
    }
}
