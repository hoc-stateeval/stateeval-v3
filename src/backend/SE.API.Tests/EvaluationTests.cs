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
using SE.Core.Commands.Evaluations;
using SE.Core.Commands.Users;

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
            var userName = DAN_District.School2.PrincipalA.UserName;

            var user = await TestHelpers.GetUserByUserName(_client, userName);
            var workAreaContexts = await TestHelpers.GetWorkAreaContextsForUser(_client, user.Id);

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            var framework = await TestHelpers.GetFrameworkById(_client, workAreaContext.StateFrameworkId);
            framework.Should().NotBeNull(); 
            var focusFrameworkNode = framework.FrameworkNodes.Find(x => x.ShortName == "C3");
            focusFrameworkNode.Should().NotBeNull();    
            var focusSGFrameworkNode = framework.FrameworkNodes.Find(x => x.ShortName == "C6");
            focusSGFrameworkNode.Should().NotBeNull();

            var command = new UpdateEvaluateePlanTypeCommand(evaluation.Id, EvaluateePlanType.FOCUSED, 
                                        focusFrameworkNode.Id, focusSGFrameworkNode.Id, SchoolYear.SY_2020, RubricPerformanceLevel.PL3);


            await TestHelpers.UpdateEvaluateePlanType(_client, user.Id, workAreaContext.Id, evaluation.Id, command);

            evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            evaluation.PlanType.Should().Be(EvaluateePlanType.FOCUSED);
            evaluation.ComprehensiveCarryForward.Should().Be(true);
            evaluation.FocusedFrameworkNodeId.Should().Be(focusFrameworkNode.Id);
            evaluation.FocusedSGFrameworkNodeId.Should().Be(focusSGFrameworkNode.Id);
            evaluation.FocusedFrameworkNodeShortName.Should().Be("C3");
            evaluation.FocusedSGFrameworkNodeShortName.Should().Be("C6");
            evaluation.CarryForwardPerformanceLevel.Should().Be(RubricPerformanceLevel.PL3);
            evaluation.CarryForwardSchoolYear.Should().Be(SchoolYear.SY_2020);

            var command2 = new UpdateEvaluateePlanTypeCommand(evaluation.Id, EvaluateePlanType.COMPREHENSIVE);

            await TestHelpers.UpdateEvaluateePlanType(_client, user.Id, workAreaContext.Id, evaluation.Id, command2);
            evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            evaluation.PlanType.Should().Be(EvaluateePlanType.COMPREHENSIVE);
            evaluation.ComprehensiveCarryForward.Should().Be(false);
            evaluation.FocusedFrameworkNodeId.Should().BeNull();
            evaluation.FocusedSGFrameworkNodeId.Should().BeNull();
            evaluation.FocusedFrameworkNodeShortName.Should().BeEmpty();
            evaluation.FocusedSGFrameworkNodeShortName.Should().BeEmpty();
            evaluation.CarryForwardPerformanceLevel.Should().BeNull();
            evaluation.CarryForwardSchoolYear.Should().BeNull();
        }

        [Fact]
        public async Task Evaluation_Should_Be_Able_To_Change_Evalator()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School2.PrincipalA.UserName;

            var user = await TestHelpers.GetUserByUserName(_client, userName);
            var workAreaContexts = await TestHelpers.GetWorkAreaContextsForUser(_client, user.Id);

            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            var prB = await TestHelpers.GetUserByUserName(_client, DAN_District.School2.PrincipalB.UserName);


            var command = new UpdateEvaluatorCommand(evaluation.Id, prB.Id);

            await TestHelpers.UpdateEvaluator(_client, user.Id, workAreaContext.Id, evaluation.Id, command);

            evaluations = await TestHelpers.GetEvaluationsForWorkArea(_client, user.Id, workAreaContext.Id);
            evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            evaluation.EvaluatorId.Should().Be(prB.Id);

        }

        [Fact]
        public async Task DAN_District_School1_Should_Have_4_Teacher_Evaluations()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);

            var evaluations = await TestHelpers.GetEvaluationsForSchool(_client, DAN_District.DistrictCode, DAN_District.School1.SchoolCode, EvaluationType.TEACHER);
            evaluations.Count().Should().Be(4);
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherA.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherB.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherC.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherD.UserName).Should().NotBeNull();
        }

        [Fact]
        public async Task DAN_District_School1_Should_Have_2_Principal_Evaluations()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);

            var evaluations = await TestHelpers.GetEvaluationsForSchool(_client, DAN_District.DistrictCode, DAN_District.School1.SchoolCode, EvaluationType.PRINCIPAL);
            evaluations.Count().Should().Be(2);
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.PrincipalA.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.PrincipalB.UserName).Should().NotBeNull();

        }
    }
}