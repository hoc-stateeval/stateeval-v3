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

namespace SE.Services.Queries
{
    public class GetWorkAreaContextsForUserQueryValidator
    : AbstractValidator<GetWorkAreaContextsForUserQuery>
    {
        public GetWorkAreaContextsForUserQueryValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
        }
    }
    public sealed class GetWorkAreaContextsForUserQuery : 
        IRequest<List<WorkAreaContextDTO>>
    {
        public long Id { get; }

        public GetWorkAreaContextsForUserQuery(long id)
        {
            Id = id;
        }

        internal sealed class GetWorkAreaContextsForUserQueryHandler : 
            IRequestHandler<GetWorkAreaContextsForUserQuery, List<WorkAreaContextDTO>>
        {
            private readonly DataContext _dataContext;
            public GetWorkAreaContextsForUserQueryHandler(DataContext dataContext)
            {
                _dataContext = dataContext;
            }

            public async Task<List<WorkAreaContextDTO>> Handle(GetWorkAreaContextsForUserQuery request, CancellationToken cancellationToken)
            {
                User? user = await _dataContext.Users
                    .Include(x => x.WorkAreaContexts).ThenInclude(x => x.FrameworkContext)
                    .Include(x => x.WorkAreaContexts).ThenInclude(x => x.Building)
                    .Include(x => x.WorkAreaContexts).ThenInclude(x => x.WorkArea).ThenInclude(x => x.Role)
                    .Include(x => x.WorkAreaContexts).ThenInclude(x => x.WorkArea).ThenInclude(x=>x.EvaluateeRole)
                    .Where(x => x.Id == request.Id).FirstOrDefaultAsync(cancellationToken: cancellationToken);

                List<WorkAreaContextDTO> workAreaContexts = user.WorkAreaContexts.Select(wc => new WorkAreaContextDTO
                {
                    Id = wc.Id,
                    UserId = wc.User.Id,
                    TagName = wc.WorkArea.TagName,
                    Title = wc.WorkArea.Title,
                    RoleName = wc.WorkArea.Role.DisplayName,
                    EvaluatorTerm = EnumUtils.MapEvaluationTypeToEvaluatorTerm(wc.WorkArea.EvaluationType),
                    EvaluatorTermLC = StringExtensions.FirstCharacterToLower(EnumUtils.MapEvaluationTypeToEvaluatorTerm(wc.WorkArea.EvaluationType)),
                    EvaluateeTerm = EnumUtils.MapEvaluationTypeToEvaluateeTerm(wc.WorkArea.EvaluationType),
                    EvaluateeTermLC = StringExtensions.FirstCharacterToLower(EnumUtils.MapEvaluationTypeToEvaluateeTerm(wc.WorkArea.EvaluationType)),
                    IsSchool = wc.Building.IsSchool,
                    DistrictName = wc.Building.DistrictName,
                    DistrictCode = wc.Building.DistrictCode,
                    SchoolName = wc.Building.SchoolName,
                    SchoolCode = wc.Building.SchoolCode,
                    EvaluationType = wc.WorkArea.EvaluationType,
                    Priority = wc.WorkArea.Priority,
                    FrameworkContextId = wc.FrameworkContext.Id,
                    FrameworkContextName = wc.FrameworkContext.Name,
                    StateFrameworkId = wc.FrameworkContext.StateFrameworkId,
                    InstructionalFrameworkId = wc.FrameworkContext.InstructionalFrameworkId,
                    DefaultFrameworkId = wc.FrameworkContext.DefaultFrameworkId,
                    IsDistrictAdmin = Convert.ToBoolean(wc.WorkArea.IsDistrictAdmin),
                    IsSchoolAdmin = Convert.ToBoolean(wc.WorkArea.IsSchoolAdmin),
                    IsEvaluator = Convert.ToBoolean(wc.WorkArea.IsEvaluator),
                    IsEvaluatee = Convert.ToBoolean(wc.WorkArea.IsEvaluatee),
                }).OrderBy(x => x.Priority).ToList();

                return workAreaContexts;
            }
        }
    }
}
