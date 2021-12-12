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
    public class AssignmentsControllerTests : IntegrationTest
    {
        public AssignmentsControllerTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task DelegateAssignments()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAdmin.UserName;

            var user = await TestHelpers.GetUserByUserName(_client, userName);
            var workAreaContexts = await TestHelpers.GetWorkAreaContextsForUser(_client, user.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_TR);
            workAreaContext.Should().NotBeNull();

            var url = $"/assignments/{workAreaContext.FrameworkContextId}";
            var summaries = await _client.GetAndDeserialize<List<SchoolTeacherAssignmentsSummaryDTO>>(url);

            var command = new DelegateAssignmentsCommand(workAreaContext.FrameworkContextId);

            var response = await _client.PostAsJsonAsync($"/assignments/{workAreaContext.FrameworkContextId}/delegate", command);

        }

    }
}
