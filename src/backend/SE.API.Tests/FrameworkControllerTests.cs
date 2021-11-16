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
    public class FrameworkControllerTests : IntegrationTest
    {
        public FrameworkControllerTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task GET_framework_by_id()
        {
            var framework = await _client.GetAndDeserialize<FrameworkDTO>("/frameworks/1");
            framework.Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_TR_Eval_Should_Have_State_and_Instructional_Frameworks()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson State");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson Instructional");
        }

        [Fact]
        public async Task DAN_PR_Eval_Should_Have_State_Leadership_Framework_Only()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
            workAreaContext.InstructionalFrameworkId.Should().BeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Leadership");
        }

        [Fact]
        public async Task CEL_TR_Eval_Should_Have_State_and_Instructional_Frameworks()
        {
            var CEL_District = new District(DistrictNames.CEL, DistrictCodes.CEL);
            var userName = CEL_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("CEL State");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("CEL Instructional");
        }

        [Fact]
        public async Task CEL_PR_Eval_Should_Have_State_Leadership_Framework_Only()
        {
            var CEL_District = new District(DistrictNames.CEL, DistrictCodes.CEL);
            var userName = CEL_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
            workAreaContext.InstructionalFrameworkId.Should().BeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Leadership");
        }


        [Fact]
        public async Task MAR_TR_Eval_Should_Have_State_and_Instructional_Frameworks()
        {
            var MAR_District = new District(DistrictNames.MAR, DistrictCodes.MAR);
            var userName = MAR_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano State");
            framework.FrameworkTagName.Should().Be("MAR-TR");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano Instructional");
            framework.FrameworkTagName.Should().Be("MAR-TR");
        }

        [Fact]
        public async Task MAR_PR_Eval_Should_Have_State_MAR_and_Instructional_MAR_Frameworks()
        {
            var MAR_District = new District(DistrictNames.MAR, DistrictCodes.MAR);
            var userName = MAR_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
            workAreaContext.InstructionalFrameworkId.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano State");
            framework.FrameworkTagName.Should().Be("MAR-PR");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano Instructional");
            framework.FrameworkTagName.Should().Be("MAR-PR");
        }

    }
}
