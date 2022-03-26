using FluentAssertions;
using SE.API.Tests.Fixtures;
using SE.API.Tests.Utils;
using SE.Core.Commands.UserPrompts;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace SE.API.Tests
{
    public class UserPromptTests : IntegrationTest
    {
        public UserPromptTests(ApiWebApplicationFactory fixture)
           : base(fixture) { }


        [Fact]
        public async Task CreateStudentGrowthPrompt()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAdmin.UserName;
            var user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_TR);
            workAreaContext.Should().NotBeNull();

            var command = new CreateUserPromptCommand(workAreaContext.FrameworkContextId, "", UserPromptTier.DISTRICT_ADMIN,
                                        UserPromptType.PRE_CONFERENCE, "DA Pre-Conf Prompt", false, null, null, null);

            var userPrompt = await CreatUserPromptAPI(command);
            userPrompt.Should().NotBeNull();
            userPrompt.PromptType.Should().Be(UserPromptType.PRE_CONFERENCE);
            userPrompt.Prompt.Should().Be("DA Pre-Conf Prompt");
            userPrompt.OwnerTier.Should().Be(UserPromptTier.DISTRICT_ADMIN);
            userPrompt.SchoolCode.Should().Be("");
            userPrompt.EvaluatorId.Should().Be(null);
            userPrompt.ObservationId.Should().Be(null);
            userPrompt.TierConfigs.Count().Should().Be(1);
            var config = userPrompt.TierConfigs[0];
            config.Required.Should().Be(false);
        }
    }
}
