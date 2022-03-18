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
using SE.Core.Common.Exceptions;
using SE.Core.Commands.PerceptionSurveys;

namespace SE.API.Tests
{
    public class PerceptionSurveyTests : IntegrationTest
    {
        public PerceptionSurveyTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }


        [Fact]
        public async Task Test_CreatePerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserName(DAN_District.School1.TeacherA.UserName);
            var workAreaContexts = await GetWorkAreaContextsForUser(user.Id);

            workAreaContexts.Count.Should().Be(1);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.TR_ME);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkArea(user.Id, workAreaContext.Id);
            evaluations.Count.Should().Be(1);

            var perceptionSurveys = await GetPerceptionSurveysForEvaluation(evaluations[0].Id);
            var countBefore = perceptionSurveys.Count;

            var command = new CreatePerceptionSurveyCommand(evaluations[0].Id, DAN_District.School1.SchoolCode, "localhost");

            var perceptionSurvey = await CreatePerceptionSurvey(evaluations[0].Id, command);
            perceptionSurvey.Should().NotBeNull();
            perceptionSurvey.EvaluationId.Should().Be(evaluations[0].Id);

            perceptionSurveys = await GetPerceptionSurveysForEvaluation(evaluations[0].Id);
            var countAfter = perceptionSurveys.Count;
            countAfter.Should().Be(countBefore + 1);
        }
    }
}
