using SE.API.Tests.Fixtures;
using SE.API.Tests.Utils;
using SE.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using FluentValidation;
using FluentAssertions;
using SE.Domain.Entities;
using SE.Core.Common;
using System.Net.Http.Json;

namespace SE.API.Tests
{
    public class WorkAreaContextTests : IntegrationTest
    {
        public WorkAreaContextTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }


        [Fact]
        public async Task DAN_PR_TR_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalA.UserName);

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(DAN_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(DAN_District.DistrictCode);
            workAreaContext.SchoolName.Should().Be(DAN_District.School1.SchoolName);
            workAreaContext.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            workAreaContext.IsSchool.Should().BeTrue();
            workAreaContext.FrameworkContextName.Should().Be("Charlotte Danielson's Framework for Teaching (2011)");
            workAreaContext.Title.Should().Be("Evaluate Teachers");
            workAreaContext.RoleName.Should().Be("Principal");
            workAreaContext.EvaluatorTerm.Should().Be("Evaluator");
            workAreaContext.EvaluatorTermLC.Should().Be("evaluator");
            workAreaContext.EvaluateeTerm.Should().Be("Teacher");
            workAreaContext.EvaluateeTermLC.Should().Be("teacher");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.TEACHER);
            workAreaContext.IsEvaluatee.Should().BeFalse();
            workAreaContext.IsEvaluator.Should().BeTrue();
            workAreaContext.IsSchoolAdmin.Should().BeFalse();
            workAreaContext.IsDistrictAdmin.Should().BeFalse();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);

        }

        [Fact]
        public async Task DAN_TR_ME_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.TeacherA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.TR_ME);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(DAN_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(DAN_District.DistrictCode);
            workAreaContext.SchoolName.Should().Be(DAN_District.School1.SchoolName);
            workAreaContext.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            workAreaContext.IsSchool.Should().BeTrue();
            workAreaContext.FrameworkContextName.Should().Be("Charlotte Danielson's Framework for Teaching (2011)");
            workAreaContext.Title.Should().Be("Prepare for My Evaluation (Teacher)");
            workAreaContext.RoleName.Should().Be("Teacher");
            workAreaContext.EvaluatorTerm.Should().Be("Evaluator");
            workAreaContext.EvaluatorTermLC.Should().Be("evaluator");
            workAreaContext.EvaluateeTerm.Should().Be("Teacher");
            workAreaContext.EvaluateeTermLC.Should().Be("teacher");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.TEACHER);
            workAreaContext.IsEvaluatee.Should().BeTrue();
            workAreaContext.IsEvaluator.Should().BeFalse();
            workAreaContext.IsSchoolAdmin.Should().BeFalse();
            workAreaContext.IsDistrictAdmin.Should().BeFalse();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);

        }

        [Fact]
        public async Task DAN_PR_ME_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_ME);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(DAN_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(DAN_District.DistrictCode);
            workAreaContext.SchoolName.Should().Be(DAN_District.School1.SchoolName);
            workAreaContext.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            workAreaContext.IsSchool.Should().BeTrue();
            workAreaContext.FrameworkContextName.Should().Be("The AWSP Leadership Framework");
            workAreaContext.Title.Should().Be("Prepare for My Evaluation (Principal)");
            workAreaContext.RoleName.Should().Be("Principal");
            workAreaContext.EvaluatorTerm.Should().Be("Evaluator");
            workAreaContext.EvaluatorTermLC.Should().Be("evaluator");
            workAreaContext.EvaluateeTerm.Should().Be("Principal");
            workAreaContext.EvaluateeTermLC.Should().Be("principal");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.PRINCIPAL);
            workAreaContext.IsEvaluatee.Should().BeTrue();
            workAreaContext.IsEvaluator.Should().BeFalse();
            workAreaContext.IsSchoolAdmin.Should().BeFalse();
            workAreaContext.IsDistrictAdmin.Should().BeFalse();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);
        }

        public async Task DAN_DA_TR_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DistrictAdmin.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(DAN_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(DAN_District.DistrictCode);
            workAreaContext.SchoolName.Should().BeEmpty();
            workAreaContext.SchoolCode.Should().BeEmpty();
            workAreaContext.IsSchool.Should().BeFalse();
            workAreaContext.FrameworkContextName.Should().Be("Charlotte Danielson's Framework for Teaching (2011)");
            workAreaContext.Title.Should().Be("Admin Teacher Evaluations");
            workAreaContext.RoleName.Should().Be("District Admin");
            workAreaContext.EvaluatorTerm.Should().Be("Evaluator");
            workAreaContext.EvaluatorTermLC.Should().Be("evaluator");
            workAreaContext.EvaluateeTerm.Should().Be("Teacher");
            workAreaContext.EvaluateeTermLC.Should().Be("teacher");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.TEACHER);
            workAreaContext.IsEvaluatee.Should().BeFalse();
            workAreaContext.IsEvaluator.Should().BeFalse();
            workAreaContext.IsSchoolAdmin.Should().BeFalse();
            workAreaContext.IsDistrictAdmin.Should().BeTrue();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);
        }

        public async Task DAN_DTE_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DTE.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DTE);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(DAN_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(DAN_District.DistrictCode);
            workAreaContext.SchoolName.Should().BeEmpty();
            workAreaContext.SchoolCode.Should().BeEmpty();
            workAreaContext.IsSchool.Should().BeFalse();
            workAreaContext.FrameworkContextName.Should().Be("Charlotte Danielson's Framework for Teaching (2011)");
            workAreaContext.Title.Should().Be("Evaluate Teachers (DTE)");
            workAreaContext.RoleName.Should().Be("District-wide Teacher Evaluator");
            workAreaContext.EvaluatorTerm.Should().Be("Evalator");
            workAreaContext.EvaluatorTermLC.Should().Be("evaluator");
            workAreaContext.EvaluateeTerm.Should().Be("Teacher");
            workAreaContext.EvaluateeTermLC.Should().Be("teacher");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.TEACHER);
            workAreaContext.IsEvaluatee.Should().BeFalse();
            workAreaContext.IsEvaluator.Should().BeTrue();
            workAreaContext.IsSchoolAdmin.Should().BeFalse();
            workAreaContext.IsDistrictAdmin.Should().BeFalse();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);
        }

        public async Task DAN_CT_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var SPS_District = new District(DistrictNames.Seattle, DistrictCodes.Seattle);
            var user = await GetUserByUserNameAPI(SPS_District.School2.PrincipalA.UserName);
           
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.CT_SPS);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(SPS_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(SPS_District.DistrictCode);
            workAreaContext.SchoolName.Should().BeEmpty();
            workAreaContext.SchoolCode.Should().BeEmpty();
            workAreaContext.IsSchool.Should().BeFalse();
            workAreaContext.FrameworkContextName.Should().Be("Charlotte Danielson's Framework for Teaching (2011)");
            workAreaContext.Title.Should().Be("Evaluate Teachers (CT)");
            workAreaContext.RoleName.Should().Be("Consulting Teacher");
            workAreaContext.EvaluatorTerm.Should().Be("CT");
            workAreaContext.EvaluatorTermLC.Should().Be("CT");
            workAreaContext.EvaluateeTerm.Should().Be("Teacher");
            workAreaContext.EvaluateeTermLC.Should().Be("teacher");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.TEACHER_CT_SPS);
            workAreaContext.IsEvaluatee.Should().BeFalse();
            workAreaContext.IsEvaluator.Should().BeTrue();
            workAreaContext.IsSchoolAdmin.Should().BeFalse();
            workAreaContext.IsDistrictAdmin.Should().BeFalse();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);
        }

        public async Task DAN_SA_TR_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.SchoolAdmin.UserName);

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext.DistrictName.Should().Be(DAN_District.DistrictName);
            workAreaContext.DistrictCode.Should().Be(DAN_District.DistrictCode);
            workAreaContext.SchoolName.Should().Be(DAN_District.School1.SchoolName);
            workAreaContext.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            workAreaContext.IsSchool.Should().BeTrue();
            workAreaContext.FrameworkContextName.Should().Be("Charlotte Danielson's Framework for Teaching (2011)");
            workAreaContext.Title.Should().Be("Admin Teacher Evaluations");
            workAreaContext.RoleName.Should().Be("School Admin");
            workAreaContext.EvaluatorTerm.Should().Be("Evaluator");
            workAreaContext.EvaluatorTermLC.Should().Be("evaluator");
            workAreaContext.EvaluateeTerm.Should().Be("Teacher");
            workAreaContext.EvaluateeTermLC.Should().Be("teacher");
            workAreaContext.EvaluationType.Should().Be(EvaluationType.TEACHER);
            workAreaContext.IsEvaluatee.Should().BeFalse();
            workAreaContext.IsEvaluator.Should().BeFalse();
            workAreaContext.IsSchoolAdmin.Should().BeTrue();
            workAreaContext.IsDistrictAdmin.Should().BeFalse();

            workAreaContext.Priority.Should().BeGreaterThanOrEqualTo(0);
        }

        [Fact]
        public async Task DAN_HEAD_PR_Should_Have_Four_WorkAreaContext_PR_PR_and_PR_TR_and_PR_ME_and_SA_PR_and_SA_TR()
        {
            // PrincipalB at each school has been given roles of : principal, head principal, and school admin

            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalB.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(5);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_PR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_PR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_ME);
            workAreaContext.Should().NotBeNull();
        }


        [Fact]
        public async Task DAN_PR_Should_Have_Two_WorkAreaContext_PR_TR_and_PR_ME()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_ME);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_TR_Should_Have_One_WorkAreaContext_TR_ME()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.TeacherA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.TR_ME));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DA_Should_Have_Two_WorkAreaContext_DA_PR_and_DA_TR()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DistrictAdmin.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_PR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_TR);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_SA_Should_Have_Two_WorkAreaContext_SA_PR_and_SA_TR()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.SchoolAdmin.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_PR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_TR);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DTE_Should_Have_One_WorkAreaContext_DTE()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DTE.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DTE);
            workAreaContext.Should().NotBeNull();
        }


        [Fact]
        public async Task DAN_DV_Should_Have_One_WorkAreaContext_DV()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DistrictViewer.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(4);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DV_DTE);
            workAreaContext.Should().NotBeNull();
            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DV_PR_PR);
            workAreaContext.Should().NotBeNull();
            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DV_PR_TR);
            workAreaContext.Should().NotBeNull();
            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DV_DE);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DAM_Should_Have_Two_WorkAreaContext_DAM_PR_and_DAM_TR()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DistrictAssignmentManager.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DAM_PR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DAM_TR);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DE_Should_Have_One_WorkAreaContext_DE()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.DistrictEvaluator.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DE);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_SPS_CT_Should_Have_Three_WorkAreaContext_SPS_CT_and_PR_TR_and_PR_ME()
        {
            // PrincipalA in SPS district school2 is in the role of consulting teacher

            var SPS_District = new District(DistrictNames.Seattle, DistrictCodes.Seattle);
            var user = await GetUserByUserNameAPI(SPS_District.School2.PrincipalA.UserName);

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(3);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.CT_SPS);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_ME);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_SPS_DA_Should_Have_Three_WorkAreaContext_DA_TR_and_DA_PR_and_SPS_CT()
        {
            // PrincipalA in SPS district school2 is in the role of consulting teacher

            var SPS_District = new District(DistrictNames.Seattle, DistrictCodes.Seattle);
            var user = await GetUserByUserNameAPI(SPS_District.DistrictAdmin.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(3);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_PR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_TR);
            workAreaContext.Should().NotBeNull();

            workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_CT_SPS);
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task MAR2__CEL2_DA_Should_Have_Two_DA_WorkAreas_For_Each_District()
        {
            // MAR2.DA is in roles in two districts: CEL2 and MAR2, and should therefore have DA workarea contexts in
            // both districts

            var MAR2_District = new District(DistrictNames.MAR2, DistrictCodes.MAR2);
            var user = await GetUserByUserNameAPI(MAR2_District.DistrictAdmin.UserName);

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(4);
           
            workAreaContexts.FindAll(x => x.DistrictCode == DistrictCodes.CEL2 &&
                                          x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_TR))
                            .Count().Should().Be(1);

            workAreaContexts.FindAll(x => x.DistrictCode == DistrictCodes.CEL2 &&
                              x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_PR))
                .Count().Should().Be(1);

            workAreaContexts.FindAll(x => x.DistrictCode == DistrictCodes.MAR2 &&
                                          x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_TR))
                            .Count().Should().Be(1);

            workAreaContexts.FindAll(x => x.DistrictCode == DistrictCodes.MAR2 &&
                              x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_PR))
                .Count().Should().Be(1);
        }

        [Fact]
        public async Task MAR2_CEL2_Teacher_Should_Have_Two_TR_ME_WorkAreas_For_Each_District()
        {
            // MAR2.School2.TeacherB is a teacher in two districts: CEL2 and MAR2, and should therefore
            // have TR_ME workarea contexts in both districts

            var MAR2_District = new District(DistrictNames.MAR2, DistrictCodes.MAR2);
            var user = await GetUserByUserNameAPI(MAR2_District.School2.TeacherB.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);

            workAreaContexts.FindAll(x => x.DistrictCode == DistrictCodes.CEL2 &&
                                          x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.TR_ME))
                            .Count().Should().Be(1);

            workAreaContexts.FindAll(x => x.DistrictCode == DistrictCodes.MAR2 &&
                                          x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.TR_ME))
                            .Count().Should().Be(1);
        }

    }
}
