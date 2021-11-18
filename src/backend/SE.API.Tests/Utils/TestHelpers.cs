﻿using FluentAssertions;
using SE.Core.Commands;
using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace SE.API.Tests.Utils
{
    public class TestHelpers
    {
        public async static Task<UserDTO> GetUserByUserName(HttpClient client, string userName)
        {
            var user = await client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            return user;
        }

        public async static Task<List<WorkAreaContextDTO>> GetWorkAreaContextsForUser(HttpClient client, long userId)
        {
            var url = $"/users/{userId}/workarea-contexts";
            var workAreaContexts = await client.GetAndDeserialize<List<WorkAreaContextDTO>>(url);
            return workAreaContexts;
        }

        public async static Task<List<EvaluationSummaryDTO>> GetEvaluationsForWorkArea(HttpClient client, long userId, long workAreaContextId)
        {
            var url = $"/users/{userId}/workarea-contexts/{workAreaContextId}/evaluations";
            var evaluations = await client.GetAndDeserialize<List<EvaluationSummaryDTO>>(url);
            return evaluations;
        }

        public static WorkAreaContextDTO FindWorkAreaWithTagName(List<WorkAreaContextDTO> list, WorkAreaType workAreaType)
        {
            return list.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(workAreaType));

        }

        public async static Task<FrameworkDTO> GetFrameworkById(HttpClient client, long id)
        {
            var framework = await client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{id}");
            return framework;
        }

        public async static Task<HttpResponseMessage> UpdateEvaluateePlanType(HttpClient client, long userId, long workAreaContextId, 
            long evaluationId, UpdateEvaluateePlanTypeCommand command)
        {

            //string json = JsonSerializer.Serialize(command);
            //using var content = new StringContent(json);
            //content.Headers.ContentType.MediaType = "application/json";

            var url = $"/users/{userId}/workarea-contexts/{workAreaContextId}/evaluations/{evaluationId}";
            var response = await client.PutAsJsonAsync(url, command);
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
            return response;
        }
    }
}
