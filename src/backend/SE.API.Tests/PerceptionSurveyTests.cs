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
            var evaluation = GetEvaluationForUserAPI(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var perceptionSurveys = await GetPerceptionSurveysForEvaluationAPI(evaluation.Id);
            var countBefore = perceptionSurveys.Count;

            var command = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");

            var perceptionSurvey = await CreatePerceptionSurveyAPI(evaluation.Id, command);
            perceptionSurvey.Should().NotBeNull();
            perceptionSurvey.EvaluationId.Should().Be(evaluation.Id);

            perceptionSurveys = await GetPerceptionSurveysForEvaluationAPI(evaluation.Id);
            var countAfter = perceptionSurveys.Count;
            countAfter.Should().Be(countBefore + 1);
        }

        [Fact]
        public async Task UpdatePerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUserAPI(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurveyAPI(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var newTitle = "New Title";
            var newWfState = WfState.PERCEPTION_SURVEY_OPEN;
            var updateCommand = new UpdatePerceptionSurveyCommand(survey.Id, newTitle, newWfState);

            var result = await UpdatePerceptionSurveyAPI(evaluation.Id, updateCommand);
            survey = await GetPerceptionSurveyByGuidAPI(survey.Guid);
            survey.Title.Should().Be(newTitle);
            survey.WfState.Should().Be(newWfState);        
        }

        [Fact]
        public async Task AddRemoveStatementsForPerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUserAPI(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurveyAPI(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var statements = await GetPerceptionSurveyStatementsForFrameworkTagNameAPI("DAN");
            statements.Count.Should().Be(67);
            var statementToAdd = statements[0];

            var statementIdsBefore = await GetPerceptionSurveyStatementIdsAPI(survey.Id);
            statementIdsBefore.Count.Should().Be(0);

            await AddStatementToSurveyAPI(survey.Id, statementToAdd.Id);
            var statementIdsAfter = await GetPerceptionSurveyStatementIdsAPI(survey.Id);
            statementIdsAfter.Count.Should().Be(1);

            statementIdsAfter[0].Should().Be(statementToAdd.Id);
            await RemoveStatementFromSurveyAPI(survey.Id, statementToAdd.Id);
            statementIdsAfter = await GetPerceptionSurveyStatementIdsAPI(survey.Id);
            statementIdsAfter.Count.Should().Be(0);
        }

        [Fact]
        public async Task SubmitPerceptionSurvey()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUserAPI(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurveyAPI(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var statements = await GetPerceptionSurveyStatementsForFrameworkTagNameAPI("DAN");
            statements.Count.Should().Be(67);
            var statementToAdd = statements[0];

            await AddStatementToSurveyAPI(survey.Id, statementToAdd.Id);
            var statementIds = await GetPerceptionSurveyStatementIdsAPI(survey.Id);
            statementIds.Count.Should().Be(1);

            statementIds[0].Should().Be(statementToAdd.Id);

            var responses = new List<PerceptionSurveyResponseDTO>();
            var respondentGuid = Guid.NewGuid();
            responses.Add(new PerceptionSurveyResponseDTO()
            {
                SurveyId = survey.Id,
                RespondentId = respondentGuid,
                StatementId = statementToAdd.Id,
                LevelOfAgreement = PerceptionSurveyLevelOfAgreement.STRONGLY_DISAGREE,
            });

            var submitCommand = new SubmitSurveyResponsesCommand(survey.Id, responses, "Asian, American Indian", "F");

            await SubmitSurveyResponsesAPI(survey.Id, submitCommand);

            responses = await GetPerceptionSurveyResponsesAPI(survey.Id);
            responses.Count.Should().Be(1);
            responses[0].StatementId.Should().Be(statementIds[0]);
            responses[0].SurveyId.Should().Be(survey.Id);
            responses[0].RespondentId.Should().Be(respondentGuid);

            var demographics = await GetPerceptionSurveyDemographicsAPI(survey.Id);
            demographics.Count.Should().Be(1);
            var demographic = demographics[0];
            demographic.SurveyId.Should().Be(survey.Id);
            demographic.Gender.Should().Be("F");
            demographic.Ethnitcities.Should().Be("Asian, American Indian");
        }

        [Fact]
        public async Task DeletePerceptionSurvey_NoStatements()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUserAPI(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurveyAPI(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var surveyGuid = survey.Guid;
            await DeleteSurveyAPI(survey.Id);

            await Assert.ThrowsAsync<HttpRequestException>(async () => await GetPerceptionSurveyByGuidAPI(survey.Guid));
        }

        [Fact]
        public async Task DeletePerceptionSurvey_WithStatements()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var evaluation = GetEvaluationForUserAPI(DAN_District.School1.TeacherA.UserName, WorkAreaType.TR_ME);

            var createCommand = new CreatePerceptionSurveyCommand(evaluation.Id, DAN_District.School1.SchoolCode, "localhost");
            var survey = await CreatePerceptionSurveyAPI(evaluation.Id, createCommand);
            survey.Should().NotBeNull();

            var statements = await GetPerceptionSurveyStatementsForFrameworkTagNameAPI("DAN");
            statements.Count.Should().Be(67);
            var statementToAdd = statements[0];

            var addStatementCommand = new AddStatementToSurveyCommand(evaluation.Id, statementToAdd.Id);
            await AddStatementToSurveyAPI(survey.Id, statementToAdd.Id);

            var surveyGuid = survey.Guid;
            await DeleteSurveyAPI(survey.Id);

            await Assert.ThrowsAsync<HttpRequestException>(async () => await GetPerceptionSurveyByGuidAPI(survey.Guid));



        }
    }
}
