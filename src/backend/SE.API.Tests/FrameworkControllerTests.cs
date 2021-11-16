﻿using SE.API.Tests.Fixtures;
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

        [Fact]
        public async Task DAN_TR_Eval_Should_Have_State_and_Instructional_Frameworks()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson State");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson Instructional");
        }

        [Fact]
        public async Task DAN_PR_Eval_Should_Have_State_Leadership_Framework_Only()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
            workAreaContext.InstructionalFrameworkId.Should().BeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Leadership");
        }

        [Fact]
        public async Task CEL_TR_Eval_Should_Have_State_and_Instructional_Frameworks()
        {
            var CEL_District = new District(DistrictNames.CEL, DistrictCodes.CEL);
            var userName = CEL_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("CEL State");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("CEL Instructional");
        }

        [Fact]
        public async Task CEL_PR_Eval_Should_Have_State_Leadership_Framework_Only()
        {
            var CEL_District = new District(DistrictNames.CEL, DistrictCodes.CEL);
            var userName = CEL_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
            workAreaContext.InstructionalFrameworkId.Should().BeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Leadership");
        }


        [Fact]
        public async Task MAR_TR_Eval_Should_Have_State_and_Instructional_Frameworks()
        {
            var MAR_District = new District(DistrictNames.MAR, DistrictCodes.MAR);
            var userName = MAR_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano State");
            framework.FrameworkTagName.Should().Be("MAR-TR");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano Instructional");
            framework.FrameworkTagName.Should().Be("MAR-TR");
        }

        [Fact]
        public async Task MAR_PR_Eval_Should_Have_State_MAR_and_Instructional_MAR_Frameworks()
        {
            var MAR_District = new District(DistrictNames.MAR, DistrictCodes.MAR);
            var userName = MAR_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_ME));
            workAreaContext.Should().NotBeNull();
            workAreaContext.InstructionalFrameworkId.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano State");
            framework.FrameworkTagName.Should().Be("MAR-PR");

            framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Marzano Instructional");
            framework.FrameworkTagName.Should().Be("MAR-PR");
        }

        [Fact]
        public async Task DAN_TR_Eval_State_Framework_Should_Have_Six_FrameworkNodes()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson State");

            framework.FrameworkNodes.Count.Should().Be(8);
            framework.FrameworkNodes.Where(x => x.ShortName == "C1").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C2").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C3").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C4").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C5").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C6").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C7").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "C8").Count().Should().Be(1);
        }

        [Fact]
        public async Task DAN_TR_Eval_State_Framework_C1_Should_Have_Three_RubricRows()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.StateFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson State");

            framework.FrameworkNodes.Count.Should().Be(8);
            var frameworkNode = framework.FrameworkNodes.Where(x => x.ShortName == "C1").FirstOrDefault();
            var rubricRows = frameworkNode.RubricRows;
            rubricRows.Count().Should().Be(3);
            rubricRows.Where(x => x.ShortName == "2b").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "3a").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "3c").Count().Should().Be(1);
        }

        [Fact]
        public async Task DAN_TR_Eval_Instructional_Framework_D1_Should_Have_Six_RubricRows()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson Instructional");

            framework.FrameworkNodes.Count.Should().Be(4);
            var frameworkNode = framework.FrameworkNodes.Where(x => x.ShortName == "D1").FirstOrDefault();
            var rubricRows = frameworkNode.RubricRows;
            rubricRows.Count().Should().Be(6);
            rubricRows.Where(x => x.ShortName == "1a").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "1b").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "1c").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "1d").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "1e").Count().Should().Be(1);
            rubricRows.Where(x => x.ShortName == "1f").Count().Should().Be(1);
        }

        [Fact]
        public async Task DAN_TR_Eval_Instructional_Framework_Should_Have_Eight_FrameworkNodes()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await _client.GetAndDeserialize<UserDTO>($"/users/{userName}");
            var workAreaContexts = await _client.GetAndDeserialize<List<WorkAreaContextDTO>>($"/users/{user.Id}/workarea-contexts");

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = workAreaContexts.Find(x => x.TagName == EnumUtils.MapWorkAreaTypeToTagName(WorkAreaType.PR_TR));
            workAreaContext.Should().NotBeNull();

            var framework = await _client.GetAndDeserialize<FrameworkDTO>($"/frameworks/{workAreaContext.InstructionalFrameworkId}");
            framework.Should().NotBeNull();
            framework.Name.Should().Be("Danielson Instructional");

            framework.FrameworkNodes.Count.Should().Be(8);
            framework.FrameworkNodes.Where(x => x.ShortName == "D1").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D2").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D3").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D4").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D5").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D6").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D7").Count().Should().Be(1);
            framework.FrameworkNodes.Where(x => x.ShortName == "D8").Count().Should().Be(1);
        }



    }
}
