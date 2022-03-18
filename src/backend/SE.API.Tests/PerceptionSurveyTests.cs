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
using System.Net.Http;

namespace SE.API.Tests
{
    public class PerceptionSurveyTests : IntegrationTest
    {
        public PerceptionSurveyTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }


        [Fact]
        public async Task CreatePerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUser(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var perceptionSurveys = await GetPerceptionSurveysForEvaluation(evaluation.Id);
            var countBefore = perceptionSurveys.Count;

            var command = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");

            var perceptionSurvey = await CreatePerceptionSurvey(evaluation.Id, command);
            perceptionSurvey.Should().NotBeNull();
            perceptionSurvey.EvaluationId.Should().Be(evaluation.Id);

            perceptionSurveys = await GetPerceptionSurveysForEvaluation(evaluation.Id);
            var countAfter = perceptionSurveys.Count;
            countAfter.Should().Be(countBefore + 1);
        }

        [Fact]
        public async Task UpdatePerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUser(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurvey(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var newTitle = "New Title";
            var newWfState = WfState.PERCEPTION_SURVEY_OPEN;
            var updateCommand = new UpdatePerceptionSurveyCommand(survey.Id, newTitle, newWfState);

            var result = await UpdatePerceptionSurvey(evaluation.Id, updateCommand);
            survey = await GetPerceptionSurveyByGuid(survey.Guid);
            survey.Title.Should().Be(newTitle);
            survey.WfState.Should().Be(newWfState);        
        }

        [Fact]
        public async Task AddRemoveStatementsForPerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUser(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurvey(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var statements = await GetPerceptionSurveyStatementsForFrameworkTagName("DAN");
            statements.Count.Should().Be(67);
            var statementToAdd = statements[0];

            var statementIdsBefore = await GetPerceptionSurveyStatementIds(survey.Id);
            statementIdsBefore.Count.Should().Be(0);

            var addStatementCommand = new AddStatementToSurveyCommand(evaluation.Id, statementToAdd.Id);
            await AddStatementToSurvey(survey.Id, statementToAdd.Id);
            var statementIdsAfter = await GetPerceptionSurveyStatementIds(survey.Id);
            statementIdsAfter.Count.Should().Be(1);

            statementIdsAfter[0].Should().Be(statementToAdd.Id);

            var removeStatementCommand = new RemoveStatementFromSurveyCommand(evaluation.Id, statementToAdd.Id);
            await RemoveStatementFromSurvey(survey.Id, statementToAdd.Id);
            statementIdsAfter = await GetPerceptionSurveyStatementIds(survey.Id);
            statementIdsAfter.Count.Should().Be(0);


        }

        [Fact]
        public async Task DeletePerceptionSurvey_NoStatements()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUser(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurvey(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var surveyGuid = survey.Guid;
            await DeleteSurvey(survey.Id);

            await Assert.ThrowsAsync<HttpRequestException>(async () => await GetPerceptionSurveyByGuid(survey.Guid));
        }

        [Fact]
        public async Task DeletePerceptionSurvey_WithStatements()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUser(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurvey(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var statements = await GetPerceptionSurveyStatementsForFrameworkTagName("DAN");
            statements.Count.Should().Be(67);
            var statementToAdd = statements[0];

            var addStatementCommand = new AddStatementToSurveyCommand(evaluation.Id, statementToAdd.Id);
            await AddStatementToSurvey(survey.Id, statementToAdd.Id);

            var surveyGuid = survey.Guid;
            await DeleteSurvey(survey.Id);

            await Assert.ThrowsAsync<HttpRequestException>(async () => await GetPerceptionSurveyByGuid(survey.Guid));



        }
    }
}
