﻿using FluentValidation;
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
using SE.Core.Queries;
using SE.Core.Services;
using SE.Core.Mappers;

namespace SE.Services.Queries
{
    public class GetTeacherAssignmentDataForSchoolQueryValidator
    : AbstractValidator<GetTeacherAssignmentDataForSchoolQuery>
    {
        public GetTeacherAssignmentDataForSchoolQueryValidator()
        {
            RuleFor(x => x.FrameworkContextId).NotEmpty();
            RuleFor(x => x.SchoolCode).NotEmpty();
        }
    }
    public sealed class GetTeacherAssignmentDataForSchoolQuery :
        IRequest<SchoolTeacherAssignmentsSummaryDTO>
    {
        public long FrameworkContextId { get; }
        public string SchoolCode { get; }

        public GetTeacherAssignmentDataForSchoolQuery(long frameworkContextId, string schoolCode)
        {
            FrameworkContextId = frameworkContextId;
            SchoolCode = schoolCode;
        }

        internal sealed class GetTeacherAssignmentDataForSchoolQueryHandler : 
            IRequestHandler<GetTeacherAssignmentDataForSchoolQuery, SchoolTeacherAssignmentsSummaryDTO>
        {
            private readonly DataContext _dataContext;
            private readonly IUserService _userService;
            private readonly IEvaluationService _evaluationService;

            public GetTeacherAssignmentDataForSchoolQueryHandler(DataContext dataContext, IUserService userService, IEvaluationService evaluationService)
            {
                _dataContext = dataContext;
                _userService = userService;
                _evaluationService = evaluationService;
            }

            public async Task<SchoolTeacherAssignmentsSummaryDTO> Handle(GetTeacherAssignmentDataForSchoolQuery request, CancellationToken cancellationToken)
            {
                SchoolTeacherAssignmentsSummaryDTO result = new SchoolTeacherAssignmentsSummaryDTO();

                var frameworkContext = await _dataContext.FrameworkContexts
                    .Where(x => x.Id == request.FrameworkContextId)
                    .FirstOrDefaultAsync();

                result.EvaluationSummaries = await _evaluationService
                    .ExecuteEvaluationSummaryDTOQuery(x => x.IsActive &&
                                x.FrameworkContextId == frameworkContext.Id &&
                                x.SchoolCode == request.SchoolCode)
                    .ToListAsync();

                result.Evaluatees = await _userService.GetUsersInRoleAtSchool(request.SchoolCode, RoleType.TR);

                result.Principals = await _userService.GetUsersInRoleAtSchools(frameworkContext.DistrictCode,RoleType.PR);

                result.DistrictWideTeacherEvaluators = await _userService.GetUsersInRoleAtDistrict(frameworkContext.DistrictCode, RoleType.DTE);
                return result;
                
            }
        }
    }
}
