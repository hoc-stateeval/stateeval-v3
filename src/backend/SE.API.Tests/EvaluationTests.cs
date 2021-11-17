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
using SE.Core.Commands;

namespace SE.API.Tests
{
    public class EvaluationTests : IntegrationTest
    {
        public EvaluationTests(ApiWebApplicationFactory fixture)
            : base(fixture) { }

        [Fact]
        public async Task PR_Should_Have_Assigned_Evaluations()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await TestHelpers.GetUserByUserName(_client, userName);
            var workAreaContexts = await TestHelpers.GetWorkAreaContextsForUser(_client, user.Id);

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherA.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherB.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherC.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherD.UserName).Should().NotBeNull();
        }

        [Fact]
        public async Task Evaluation_Should_Have_Expected_Property_Values()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await TestHelpers.GetUserByUserName(_client, userName);
            var workAreaContexts = await TestHelpers.GetWorkAreaContextsForUser(_client, user.Id);

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherA.UserName);
            evaluation.Should().NotBeNull();

            evaluation.EvaluatorDisplayName.Should().Be(DAN_District.School1.PrincipalA.UserName);
            evaluation.WfState.Should().Be(WfState.EVAL_DRAFT);
            evaluation.LockDateTime.Should().BeNull();
            evaluation.EvaluationType.Should().Be(EvaluationType.TEACHER);
            evaluation.PerformanceLevel.Should().BeNull();
            evaluation.StudentGrowthImpactRating.Should().BeNull();
        }

        [Fact]
        public async Task Evaluation_Should_Be_Able_To_Change_EvaluateePlanType()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;

            var user = await TestHelpers.GetUserByUserName(_client, userName);
            var workAreaContexts = await TestHelpers.GetWorkAreaContextsForUser(_client, user.Id);

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherA.UserName);
            evaluation.Should().NotBeNull();

            var framework = await TestHelpers.GetFrameworkById(_client, workAreaContext.StateFrameworkId);
            framework.Should().NotBeNull(); 
            var focusFrameworkNode = framework.FrameworkNodes.Find(x => x.ShortName == "C3");
            focusFrameworkNode.Should().NotBeNull();    
            var focusSGFrameworkNode = framework.FrameworkNodes.Find(x => x.ShortName == "C6");
            focusSGFrameworkNode.Should().NotBeNull();

            var command = new UpdateEvaluateePlanTypeToFocusedCommand(user.Id, workAreaContext.Id, evaluation.Id,
                                    focusFrameworkNode.Id, focusSGFrameworkNode.Id, SchoolYear.SY_2020, 
                                    RubricPerformanceLevel.PL3);

            await TestHelpers.UpdateEvaluateePlanTypeToFocused(_client, user.Id, workAreaContext.Id, evaluation.Id, command);


            evaluation.PlanType.Should().Be(EvaluateePlanType.FOCUSED);
            evaluation.ComprehensiveCarryForward.Should().Be(true);
            evaluation.FocusedFrameworkNodeId.Should().Be(focusFrameworkNode.Id);
            evaluation.FocusedSGFrameworkNodeId.Should().Be(focusSGFrameworkNode.Id);
            evaluation.FocusedFrameworkNodeDisplayName.Should().Be("C3");
            evaluation.FocusedSGFrameworkNodeDisplayName.Should().Be("C6");
            evaluation.ComprehensiveCarryForwardPerformanceLevel.Should().Be(RubricPerformanceLevel.PL3);
            evaluation.ComprehensiveCarryForwardSchoolYear.Should().Be(SchoolYear.SY_2020);

            var command2 = new UpdateEvaluateePlanTypeToComprehensiveCommand(user.Id, workAreaContext.Id, evaluation.Id);

            await TestHelpers.UpdateEvaluateePlanTypeToComprehensive(_client, user.Id, workAreaContext.Id, evaluation.Id, command2);


            evaluation.PlanType.Should().Be(EvaluateePlanType.COMPREHENSIVE);
            evaluation.ComprehensiveCarryForward.Should().Be(false);
            evaluation.FocusedFrameworkNodeId.Should().BeNull();
            evaluation.FocusedSGFrameworkNodeId.Should().BeNull();
            evaluation.FocusedFrameworkNodeDisplayName.Should().BeNull();
            evaluation.FocusedSGFrameworkNodeDisplayName.Should().BeNull();
            evaluation.ComprehensiveCarryForwardPerformanceLevel.Should().BeNull();
            evaluation.ComprehensiveCarryForwardSchoolYear.Should().BeNull();
        }
    }
}