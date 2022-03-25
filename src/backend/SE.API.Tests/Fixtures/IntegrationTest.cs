using FluentAssertions;
using MediatR;
using Microsoft.AspNetCore.Http;
using SE.API.Tests.Utils;
using SE.Core.Commands.Authentication;
using SE.Core.Commands.Evaluations;
using SE.Core.Commands.PerceptionSurveys;
using SE.Core.Commands.UserPrompts;
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
        private string perceptionSurveyResponsesRoot = "perception-survey-responses";
        private string perceptionSurveyDemographicsRoot = "perception-survey-demographics";
        private string evaluationsRoot = "evaluations";
        private string userPromptsRoot = "user-prompts";

        public IntegrationTest(ApiWebApplicationFactory fixture)
        {
            _factory = fixture;
            _client = _factory.CreateClient();
        }
        public async Task<UserDTO> GetUserByUserNameAPI(string userName)
        {
            var user = await _client.GetFromJsonAsync<UserDTO>($"users/{userName}");
            return user;
        }

        public async Task<List<WorkAreaContextDTO>> GetWorkAreaContextsForUserAPI(long userId)
        {
            var url = $"${workAreaContextsRoot}/user/{userId}";
            var workAreaContexts = await _client.GetFromJsonAsync<List<WorkAreaContextDTO>>(url);
            return workAreaContexts;
        }

        public async Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkAreaAPI(long userId, long workAreaContextId)
        {
            var url = $"{evaluationsRoot}/work-area-context/{workAreaContextId}";
            var evaluations = await _client.GetFromJsonAsync<List<EvaluationSummaryDTO>>(url);
            return evaluations;
        }

        public async Task<FrameworkDTO> GetFrameworkByIdAPI(long id)
        {
            var framework = await _client.GetFromJsonAsync<FrameworkDTO>($"frameworks/{id}");
            return framework;
        }

        public async Task<HttpResponseMessage> UpdateEvaluateePlanTypeAPI(long userId, long workAreaContextId,
            long evaluationId, UpdateEvaluateePlanTypeCommand command)
        {
            var url = $"{evaluationsRoot}/{evaluationId}/update-plan-type";
            var response = await _client.PutAsJsonAsync(url, command);
            return response;
        }

        public async Task<HttpResponseMessage> UpdateEvaluatorAPI(long userId, long workAreaContextId,
           long evaluationId, UpdateEvaluatorCommand command)
        {
            var url = $"{evaluationsRoot}/{evaluationId}/update-evaluator";
            var response = await _client.PutAsJsonAsync(url, command);
            return response;
        }


        public async Task<PerceptionSurveyDTO> GetPerceptionSurveyByGuidAPI(string guid)
        {
            var url = $"{perceptionSurveysRoot}/{guid}";
            var survey = await _client.GetFromJsonAsync<PerceptionSurveyDTO>(url);
            return survey;

        }
        public async Task<PerceptionSurveyDTO?> CreatePerceptionSurveyAPI(long evaluationId, CreatePerceptionSurveyCommand command)
        {
            var url = $"{perceptionSurveysRoot}/evaluation/{evaluationId}";
            var response = _client.PostAsJsonAsync<CreatePerceptionSurveyCommand>(url, command);
            var survey = await response.Result.Content.ReadFromJsonAsync<PerceptionSurveyDTO>();
            return survey;
        }

        public async Task<Unit> SubmitSurveyResponsesAPI(long surveyId, SubmitSurveyResponsesCommand command)
        {
            var url = $"{perceptionSurveyResponsesRoot}/{surveyId}";
            var response = _client.PostAsJsonAsync<SubmitSurveyResponsesCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<List<PerceptionSurveyResponseDTO>> GetPerceptionSurveyResponsesAPI(long surveyId)
        {
            var url = $"{perceptionSurveyResponsesRoot}/{surveyId}";
            var responses = await _client.GetFromJsonAsync<List<PerceptionSurveyResponseDTO>>(url);
            return responses;
        }

        public async Task<List<PerceptionSurveyDemographicDTO>> GetPerceptionSurveyDemographicsAPI(long surveyId)
        {
            var url = $"{perceptionSurveyDemographicsRoot}/{surveyId}";
            var demographics = await _client.GetFromJsonAsync<List<PerceptionSurveyDemographicDTO>>(url);
            return demographics;
        }

        public async Task<Unit> UpdatePerceptionSurveyAPI(long surveyId, UpdatePerceptionSurveyCommand command)
        {
            var url = $"{perceptionSurveysRoot}/{surveyId}";
            var response = _client.PutAsJsonAsync<UpdatePerceptionSurveyCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<List<long>> GetPerceptionSurveyStatementIdsAPI(long surveyId)
        {
            var url = $"{perceptionSurveyStatementsRoot}/{surveyId}/statementIds";
            var ids = await _client.GetFromJsonAsync<List<long>>(url);
            return ids;
        }

        public async Task<List<PerceptionSurveyResponseDTO>> GetPerceptionSurveyStatementsForFrameworkTagNameAPI(string tagName)
        {
            var url = $"{perceptionSurveyStatementsRoot}/by-tagname/{tagName}";
            var statements = await _client.GetFromJsonAsync<List<PerceptionSurveyResponseDTO>>(url);
            return statements;
        }

        public async Task<Unit> DeleteSurveyAPI(long surveyId)
        {
            var url = $"{perceptionSurveysRoot}/{surveyId}";
            var response = _client.DeleteAsync(url);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<Unit> AddStatementToSurveyAPI(long surveyId, long statementId)
        {
            var url = $"{perceptionSurveysRoot}/add-statement/{surveyId}/{statementId}";
            var command = new AddStatementToSurveyCommand(surveyId, statementId);
            var response = _client.PostAsJsonAsync<AddStatementToSurveyCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }
        public async Task<Unit> RemoveStatementFromSurveyAPI(long surveyId, long statementId)
        {
            var url = $"{perceptionSurveysRoot}/remove-statement/{surveyId}/{statementId}";
            var command = new RemoveStatementFromSurveyCommand(surveyId, statementId);
            var response = _client.PostAsJsonAsync<RemoveStatementFromSurveyCommand>(url, command);
            var result = await response.Result.Content.ReadFromJsonAsync<Unit>();
            return result;
        }

        public async Task<List<PerceptionSurveyDTO>> GetPerceptionSurveysForEvaluationAPI(long evaluationId)
        {
            var url = $"{perceptionSurveysRoot}/evaluation/{evaluationId}";
            var surveys = await _client.GetFromJsonAsync<List<PerceptionSurveyDTO>>(url);
            return surveys;
        }

        public async Task<EvaluationSummaryDTO> GetEvaluationForUserAPI(string userName, WorkAreaType workAreaType)
        {
            var user = await GetUserByUserNameAPI(userName);
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().BeGreaterThan(0);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, workAreaType);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            evaluations.Count.Should().Be(1);
            return evaluations[0];
        }

        public async Task<Unit> CreatUserPromptAPI(long evaluationId, CreateUserPromptCommand command)
        {
            var url = $"{userPromptsRoot}";
            var response = _client.PostAsJsonAsync<CreateUserPromptCommand>(url, command);
            return Unit.Value;
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
