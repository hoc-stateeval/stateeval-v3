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
        public async Task TestFrameworks()
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
        }
    }
}
