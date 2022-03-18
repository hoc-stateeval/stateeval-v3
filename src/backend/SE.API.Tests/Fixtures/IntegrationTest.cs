using Microsoft.AspNetCore.Http;
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

        public IntegrationTest(ApiWebApplicationFactory fixture)
        {
            _factory = fixture;
            _client = _factory.CreateClient();
        }
        public async Task<UserDTO> GetUserByUserName(string userName)
        {
            var user = await _client.GetFromJsonAsync<UserDTO>($"/users/{userName}");
            return user;
        }

        public async Task<List<WorkAreaContextDTO>> GetWorkAreaContextsForUser(long userId)
        {
            var url = $"/workarea-contexts/user/{userId}";
            var workAreaContexts = await _client.GetFromJsonAsync<List<WorkAreaContextDTO>>(url);
            return workAreaContexts;
        }

        public async Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkArea(long userId, long workAreaContextId)
        {
            var url = $"/evaluations/work-area-context/{workAreaContextId}";
            var evaluations = await _client.GetFromJsonAsync<List<EvaluationSummaryDTO>>(url);
            return evaluations;
        }

        public async Task<List<EvaluationSummaryDTO>> GetEvaluationsForSchool(string districtCode, string schoolCode, EvaluationType evaluationType)
        {
            var url = $"/districts/{districtCode}/schools/{schoolCode}/evaluations/{Convert.ToInt32(evaluationType)}";
            var evaluations = await _client.GetFromJsonAsync<List<EvaluationSummaryDTO>>(url);
            return evaluations;
        }

        public async Task<FrameworkDTO> GetFrameworkById(long id)
        {
            var framework = await _client.GetFromJsonAsync<FrameworkDTO>($"/frameworks/{id}");
            return framework;
        }

        public async Task<HttpResponseMessage> UpdateEvaluateePlanType(long userId, long workAreaContextId,
            long evaluationId, UpdateEvaluateePlanTypeCommand command)
        {
            var url = $"/evaluations/{evaluationId}/update-plan-type";
            var response = await _client.PutAsJsonAsync(url, command);
            return response;
        }

        public async Task<HttpResponseMessage> UpdateEvaluator(long userId, long workAreaContextId,
           long evaluationId, UpdateEvaluatorCommand command)
        {
            var url = $"/evaluations/{evaluationId}/update-evaluator";
            var response = await _client.PutAsJsonAsync(url, command);
            return response;
        }

        public async Task<PerceptionSurveyDTO?> CreatePerceptionSurvey(long evaluationId, CreatePerceptionSurveyCommand command)
        {
            var url = $"perception-surveys/evaluation/{evaluationId}";
            var response = _client.PostAsJsonAsync<CreatePerceptionSurveyCommand>(url, command);
            var survey = await response.Result.Content.ReadFromJsonAsync<PerceptionSurveyDTO>();
            return survey;
        }

        public async Task<List<PerceptionSurveyDTO>> GetPerceptionSurveysForEvaluation(long evaluationId)
        {
            var surveys = await _client.GetFromJsonAsync<List<PerceptionSurveyDTO>>($"/perception-surveys/evaluation/{evaluationId}");
            return surveys;
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
