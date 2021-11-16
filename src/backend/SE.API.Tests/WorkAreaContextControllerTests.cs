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
