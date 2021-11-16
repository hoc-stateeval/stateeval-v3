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
using System.Net.Http;
using System.Net.Http.Json;
using SE.Core.Commands;
using SE.Domain.Entities;

namespace SE.API.Tests
{
    public class ObservationControllerTests : IntegrationTest
    {
        public ObservationControllerTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task GET_Observation_by_id()
        {
            var command = new CreateObservationCommand(1, "Observation 1", EvaluateePlanType.COMPREHENSIVE, 49);

            var response = await _client.PostAsJsonAsync("/observations", command);

            var id = await response.Content.ReadAsStringAsync();

            response = await _client.DeleteAsync($"/observations/{id}");


            //observation = await _client.GetAndDeserialize<ObservationDTO>("/observations/1");
            //observation.Should().NotBeNull();
        }

    }
}
