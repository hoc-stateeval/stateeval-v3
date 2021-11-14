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

namespace SE.API.Tests
{
    public class FrameworkControllerTests : IntegrationTest
    {
        public FrameworkControllerTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task GET_framework_by_id()
        {
            var framework = await _client.GetAndDeserialize<FrameworkDTO>("/frameworks/1");
            framework.Should().NotBeNull();
        }
    }
}
