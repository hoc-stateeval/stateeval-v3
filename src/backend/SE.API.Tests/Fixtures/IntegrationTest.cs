using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using SE.API.Tests.Utils;
using SE.Core.Commands.Authentication;
using SE.Core.Commands.Evaluations;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace SE.API.Tests.Fixtures
{
    public abstract class IntegrationTest : IClassFixture<ApiWebApplicationFactory>
    {
        protected readonly ApiWebApplicationFactory _factory;
        protected readonly HttpClient _client;

        private string workAreaContextsRoot = "work-area-contexts";
        private string perceptionSurveysRoot = "perception-surveys";
        private string perceptionSurveyStatementsRoot = "perception-survey-statements";
        private string evaluationsRoot = "evaluations";

        public IntegrationTest(ApiWebApplicationFactory fixture)
        {
            _factory = fixture;
            _client = _factory.CreateClient();
        }
        public async Task<UserDTO> GetUserByUserName(string userName)
        {
            var user = await _client.GetFromJsonAsync<UserDTO>($"users/{userName}");
            return user;
        }

        public async Task<List<WorkAreaContextDTO>> GetWorkAreaContextsForUser(long userId)
        {
            var url = $"${workAreaContextsRoot}/user/{userId}";
            var workAreaContexts = await _client.GetFromJsonAsync<List<WorkAreaContextDTO>>(url);
            return workAreaContexts;
        }

        public async Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkArea(long userId, long workAreaContextId)
        {
            var url = $"{evaluationsRoot}/work-area-context/{workAreaContextId}";
            var evaluations = await _client.GetFromJsonAsync<List<EvaluationSummaryDTO>>(url);
            return evaluations;
        }

        public async Task<FrameworkDTO> GetFrameworkById(long id)
        {
            var framework = await _client.GetFromJsonAsync<FrameworkDTO>($"frameworks/{id}");
            return framework;
        }

        public async Task<HttpResponseMessage> UpdateEvaluateePlanType(long userId, long workAreaContextId,
            long evaluationId, UpdateEvaluateePlanTypeCommand command)
        {
            var url = $"{evaluationsRoot}/{evaluationId}/update-plan-type";
            var response = await _client.PutAsJsonAsync(url, command);
            return response;
        }

        public async Task<HttpResponseMessage> UpdateEvaluator(long userId, long workAreaContextId,
           long evaluationId, UpdateEvaluatorCommand command)
        {
            var url = $"{evaluationsRoot}/{evaluationId}/update-evaluator";
            var response = await _client.PutAsJsonAsync(url, command);
            return response;
        }


        public async Task<PerceptionSurveyDTO> GetPerceptionSurveyByGuid(Guid guid)
        {
            var url = $"{perceptionSurveysRoot}/{guid}";
            var survey = await _client.GetFromJsonAsync<PerceptionSurveyDTO>(url);
            return survey;

        }
        public async Task<PerceptionSurveyDTO?> CreatePerceptionSurvey(long evaluationId, CreatePerceptionSurveyCommand command)
        {
            var url = $"{perceptionSurveysRoot}/evaluation/{evaluationId}";
            var response = _client.PostAsJsonAsync<CreatePerceptionSurveyCommand>(url, command);
            var survey = await response.Result.Content.ReadFromJsonAsync<PerceptionSurveyDTO>();
            return survey;
        }

        public async Task<Unit> UpdatePerceptionSurvey(long surveyId, UpdatePerceptionSurveyCommand command)
        {
            var url = $"{perceptionSurveysRoot}/{surveyId}";
            var response = _client.PutAsJsonAsync<UpdatePerceptionSurveyCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<List<long>> GetPerceptionSurveyStatementIds(long surveyId)
        {
            var url = $"{perceptionSurveyStatementsRoot}/{surveyId}/statementIds";
            var ids = await _client.GetFromJsonAsync<List<long>>(url);
            return ids;
        }

        public async Task<List<PerceptionSurveyStatementDTO>> GetPerceptionSurveyStatementsForFrameworkTagName(string tagName)
        {
            var url = $"{perceptionSurveyStatementsRoot}/by-tagname/{tagName}";
            var statements = await _client.GetFromJsonAsync<List<PerceptionSurveyStatementDTO>>(url);
            return statements;
        }

        public async Task<Unit> DeleteSurvey(long surveyId)
        {
            var url = $"{perceptionSurveysRoot}/{surveyId}";
            var response = _client.DeleteAsync(url);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<Unit> AddStatementToSurvey(long surveyId, long statementId)
        {
            var url = $"{perceptionSurveysRoot}/add-statement/{surveyId}/{statementId}";
            var command = new AddStatementToSurveyCommand(surveyId, statementId);
            var response = _client.PostAsJsonAsync<AddStatementToSurveyCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }
        public async Task<Unit> RemoveStatementFromSurvey(long surveyId, long statementId)
        {
            var url = $"{perceptionSurveysRoot}/remove-statement/{surveyId}/{statementId}";
            var command = new RemoveStatementFromSurveyCommand(surveyId, statementId);
            var response = _client.PostAsJsonAsync<RemoveStatementFromSurveyCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<List<PerceptionSurveyDTO>> GetPerceptionSurveysForEvaluation(long evaluationId)
        {
            var url = $"{perceptionSurveysRoot}/evaluation/{evaluationId}";
            var surveys = await _client.GetFromJsonAsync<List<PerceptionSurveyDTO>>(url);
            return surveys;
        }

        public async Task<EvaluationSummaryDTO> GetEvaluationForUser(string userName, WorkAreaType workAreaType)
        {
            var user = await GetUserByUserName(userName);
            var workAreaContexts = await GetWorkAreaContextsForUser(user.Id);
            workAreaContexts.Count.Should().BeGreaterThan(0);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, workAreaType);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkArea(user.Id, workAreaContext.Id);
            evaluations.Count.Should().Be(1);
            return evaluations[0];
        }


        //protected async Task AuthenticateAsync(string userName)
        //{
        //    _client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", await GetJwtAsync(userName));
        //}

        //private async Task<string> GetJwtAsync(string userName)
        //{
        //    var url = "/users/authenticate";
        //    LoginUserCommand command = new LoginUserCommand(userName, "password");
        //    var response = await _client.PostAsJsonAsync<LoginUserCommand>(url, command);
        //    var authenticatedUserDTO = await response.Content.ReadFromJsonAsync<AuthenticatedUserDTO>();
        //    return authenticatedUserDTO.Tokens.AccessToken;
        //}
    }
}
