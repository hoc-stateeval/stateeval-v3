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

namespace SE.API.Tests
{
    public class WorkAreaContextControllerTests : IntegrationTest
    {
        public WorkAreaContextControllerTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }


        [Fact]
        public async Task DAN_PR_TR_WorkAreaContext_Should_Have_Basic_Properties()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
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
            var userName = DAN_District.School1.TeacherA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.TR_ME));
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
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
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
            var userName = DAN_District.DistrictAdmin.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_TR));
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
            var userName = DAN_District.DTE.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DTE));
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
            var userName = SPS_District.School2.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.CT_SPS));
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
            var userName = DAN_District.School1.SchoolAdmin.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.SA_TR));
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
            var userName = DAN_District.School1.PrincipalB.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(5);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_PR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.SA_PR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.SA_TR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
        }


        [Fact]
        public async Task DAN_PR_Should_Have_Two_WorkAreaContext_PR_TR_and_PR_ME()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_TR_Should_Have_One_WorkAreaContext_TR_ME()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.TeacherA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.TR_ME));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DA_Should_Have_Two_WorkAreaContext_DA_PR_and_DA_TR()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAdmin.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_PR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_TR));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_SA_Should_Have_Two_WorkAreaContext_SA_PR_and_SA_TR()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.SchoolAdmin.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.SA_PR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.SA_TR));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DTE_Should_Have_One_WorkAreaContext_DTE()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DTE.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DTE));
            workAreaContext.Should().NotBeNull();
        }


        [Fact]
        public async Task DAN_DV_Should_Have_One_WorkAreaContext_DV()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictViewer.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DV));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DAM_Should_Have_Two_WorkAreaContext_DAM_PR_and_DAM_TR()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAssignmentManager.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DAM_PR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DAM_TR));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_DE_Should_Have_One_WorkAreaContext_DE()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictEvaluator.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DE));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_SPS_CT_Should_Have_Three_WorkAreaContext_SPS_CT_and_PR_TR_and_PR_ME()
        {
            // PrincipalA in SPS district school2 is in the role of consulting teacher

            var SPS_District = new District(DistrictNames.Seattle, DistrictCodes.Seattle);
            var userName = SPS_District.School2.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(3);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.CT_SPS));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_SPS_DA_Should_Have_Three_WorkAreaContext_DA_TR_and_DA_PR_and_SPS_CT()
        {
            // PrincipalA in SPS district school2 is in the role of consulting teacher

            var SPS_District = new District(DistrictNames.Seattle, DistrictCodes.Seattle);
            var userName = SPS_District.DistrictAdmin.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(3);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_PR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_TR));
            workAreaContext.Should().NotBeNull();

            workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.DA_CT_SPS));
            workAreaContext.Should().NotBeNull();
        }

    }
}
