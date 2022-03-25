using FluentAssertions;
using SE.API.Tests.Fixtures;
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

            var command = new CreateUserPromptCommand();

            var userPrompt = await CreateUserPromptAPI(evaluation.Id, command);
            userPrompt.Should().NotBeNull();
            userPrompt.PromptType.Should().Be(evaluation.Id);

            perceptionSurveys = await GetPerceptionSurveysForEvaluationAPI(evaluation.Id);
            var countAfter = perceptionSurveys.Count;
            countAfter.Should().Be(countBefore + 1);
        }
    }
}
