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
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherA.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherB.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherC.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherD.UserName).Should().NotBeNull();
        }

        [Fact]
        public async Task Evaluation_Should_Have_Expected_Property_Values()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.TeacherA.UserName);
            evaluation.Should().NotBeNull();

            evaluation.EvaluatorDisplayName.Should().Be(DAN_District.School1.PrincipalA.UserName);
            evaluation.WfState.Should().Be(WfState.EVAL_DRAFT);
            evaluation.LockDateTime.Should().BeNull();
            evaluation.EvaluationType.Should().Be(EvaluationType.TEACHER);
            evaluation.PerformanceLevel.Should().Be(RubricPerformanceLevel.UNDEFINED);
            evaluation.StudentGrowthImpactRating.Should().Be(StudentGrowthImpactRating.UNDEFINED);
        }

        [Fact]
        public async Task Evaluation_Should_Be_Able_To_Change_EvaluateePlanType()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School2.PrincipalA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            var framework = await GetFrameworkByIdAPI(workAreaContext.StateFrameworkId);
            framework.Should().NotBeNull(); 
            var focusFrameworkNode = framework.FrameworkNodes.Find(x => x.ShortName == "C3");
            focusFrameworkNode.Should().NotBeNull();    
            var focusSGFrameworkNode = framework.FrameworkNodes.Find(x => x.ShortName == "C6");
            focusSGFrameworkNode.Should().NotBeNull();

            var command = new UpdateEvaluateePlanTypeCommand(evaluation.Id, EvaluateePlanType.FOCUSED, 
                                        focusFrameworkNode.Id, focusSGFrameworkNode.Id, SchoolYear.SY_2020, RubricPerformanceLevel.PL3);


            await UpdateEvaluateePlanTypeAPI(user.Id, workAreaContext.Id, evaluation.Id, command);

            evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
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

            await UpdateEvaluateePlanTypeAPI(user.Id, workAreaContext.Id, evaluation.Id, command2);
            evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            evaluation.PlanType.Should().Be(EvaluateePlanType.COMPREHENSIVE);
            evaluation.ComprehensiveCarryForward.Should().Be(false);
            evaluation.FocusedFrameworkNodeId.Should().BeNull();
            evaluation.FocusedSGFrameworkNodeId.Should().BeNull();
            evaluation.FocusedFrameworkNodeShortName.Should().BeEmpty();
            evaluation.FocusedSGFrameworkNodeShortName.Should().BeEmpty();
            evaluation.CarryForwardPerformanceLevel.Should().Be(RubricPerformanceLevel.UNDEFINED);
            evaluation.CarryForwardSchoolYear.Should().Be(SchoolYear.UNDEFINED);
        }

        [Fact]
        public async Task Evaluation_Should_Be_Able_To_Change_Evalator()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School2.PrincipalA.UserName);
            
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            var evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            var prB = await GetUserByUserNameAPI(DAN_District.School2.PrincipalB.UserName);


            var command = new UpdateEvaluatorCommand(evaluation.Id, prB.Id);

            await UpdateEvaluatorAPI(user.Id, workAreaContext.Id, evaluation.Id, command);

            evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            evaluation = evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School2.TeacherD.UserName);
            evaluation.Should().NotBeNull();

            evaluation.EvaluatorId.Should().Be(prB.Id);

        }

        [Fact]
        public async Task DAN_District_School1_Should_Have_4_Teacher_Evaluations()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var user = await GetUserByUserNameAPI(DAN_District.School1.PrincipalA.UserName);

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().Be(2);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
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
            var user = await GetUserByUserNameAPI(DAN_District.School1.HeadPrincipal.UserName);

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            workAreaContexts.Count.Should().BeGreaterThanOrEqualTo(3);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_PR);
            workAreaContext.Should().NotBeNull();

            var evaluations = await GetEvaluationsForWorkAreaAPI(user.Id, workAreaContext.Id);
            evaluations.Count().Should().Be(2);
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.PrincipalA.UserName).Should().NotBeNull();
            evaluations.Find(x => x.EvaluateeDisplayName == DAN_District.School1.PrincipalB.UserName).Should().NotBeNull();

        }
    }
}