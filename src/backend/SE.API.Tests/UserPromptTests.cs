using FluentAssertions;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using SE.API.Tests.Fixtures;
using SE.API.Tests.Utils;
using SE.Core.Commands.UserPrompts;
using SE.Core.Models;
using SE.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Xunit;

namespace SE.API.Tests
{
    public class UserPromptTests : IntegrationTest
    {
        public UserPromptTests(ApiWebApplicationFactory fixture)
           : base(fixture) { }


        public async Task<UserPromptDTO> CreateDistrictPrompt(UserDTO user, UserPromptType promptType, string prompt, bool required)
        { 
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.DA_TR);
            workAreaContext.Should().NotBeNull();

            var command = new CreateUserPromptCommand(workAreaContext.FrameworkContextId, "", UserPromptTier.DISTRICT_ADMIN,
                                        promptType, prompt, required, null, null, null);

            var userPrompt = await CreatUserPromptAPI(command);
            return userPrompt;
        }

        public async Task<UserPromptDTO> CreateSchoolPrompt(UserDTO user, string schoolCode, UserPromptType promptType, string prompt, bool required)
        {
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_TR);
            workAreaContext.Should().NotBeNull();

            var command = new CreateUserPromptCommand(workAreaContext.FrameworkContextId, schoolCode, UserPromptTier.SCHOOL_ADMIN,
                                        promptType, prompt, required, null, null, null);

            var userPrompt = await CreatUserPromptAPI(command);
            return userPrompt;
        }

        public async Task<UserPromptDTO> CreateEvaluatorPrompt(UserDTO user, string schoolCode, UserPromptType promptType, string prompt, bool required)
        {
            var workAreaContexts = await GetWorkAreaContextsForUserAPI(user.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var command = new CreateUserPromptCommand(workAreaContext.FrameworkContextId, schoolCode, UserPromptTier.EVALUATOR,
                                        promptType, prompt, required, user.Id, null, null);

            var userPrompt = await CreatUserPromptAPI(command);
            return userPrompt;
        }
        [Fact]
        public async Task CreateRequiredDistrictTierPreConferencePrompt()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAdmin.UserName;
            var user = await GetUserByUserNameAPI(userName);

            var prompt = "DA Pre-Conf Prompt 1";
            var userPrompt = await CreateDistrictPrompt(user, UserPromptType.PRE_CONFERENCE, prompt, true);
            userPrompt.Should().NotBeNull();
            userPrompt.PromptType.Should().Be(UserPromptType.PRE_CONFERENCE);
            userPrompt.Prompt.Should().Be(prompt);
            userPrompt.OwnerTier.Should().Be(UserPromptTier.DISTRICT_ADMIN);
            userPrompt.SchoolCode.Should().Be("");
            userPrompt.EvaluatorId.Should().Be(null);
            userPrompt.ObservationId.Should().Be(null);
            userPrompt.TierConfigs.Count().Should().Be(1);
            var config = userPrompt.TierConfigs[0];
            config.ConfigurationTier.Should().Be(UserPromptTier.DISTRICT_ADMIN);
            config.EvaluatorId.Should().Be(null);
            config.UserPromptId.Should().Be(userPrompt.Id);
            config.Required.Should().Be(true);
        }

        [Fact]
        public async Task CreateRequiredSchoolTierPreConferencePrompt()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.SchoolAdmin.UserName;
            var user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var prompt = "SA Pre-Conf Prompt 1";
            var userPrompt = await CreateSchoolPrompt(user, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, prompt, true);

            userPrompt.PromptType.Should().Be(UserPromptType.PRE_CONFERENCE);
            userPrompt.Prompt.Should().Be(prompt);
            userPrompt.OwnerTier.Should().Be(UserPromptTier.SCHOOL_ADMIN);
            userPrompt.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            userPrompt.EvaluatorId.Should().Be(null);
            userPrompt.ObservationId.Should().Be(null);
            userPrompt.TierConfigs.Count().Should().Be(1);
            var config = userPrompt.TierConfigs[0];
            config.ConfigurationTier.Should().Be(UserPromptTier.SCHOOL_ADMIN);
            config.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            config.EvaluatorId.Should().Be(null);
            config.UserPromptId.Should().Be(userPrompt.Id);
            config.Required.Should().Be(true);
        }

        [Fact]
        public async Task CreateRequiredEvaluatorTierPreConferencePrompt()
        {
            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.School1.PrincipalA.UserName;
            var user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var prompt = "Evluator Pre-Conf Prompt 1";
            var userPrompt = await CreateEvaluatorPrompt(user, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, prompt, true);

            userPrompt.PromptType.Should().Be(UserPromptType.PRE_CONFERENCE);
            userPrompt.Prompt.Should().Be(prompt);
            userPrompt.OwnerTier.Should().Be(UserPromptTier.EVALUATOR);
            userPrompt.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            userPrompt.EvaluatorId.Should().Be(user.Id);
            userPrompt.ObservationId.Should().Be(null);
            userPrompt.TierConfigs.Count().Should().Be(1);
            var config = userPrompt.TierConfigs[0];
            config.ConfigurationTier.Should().Be(UserPromptTier.EVALUATOR);
            config.SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            config.EvaluatorId.Should().Be(user.Id);
            config.UserPromptId.Should().Be(userPrompt.Id);
            config.Required.Should().Be(true);
        }

        public async void FlushData()
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile($"integrationsettings.json", true, true);

            var config = builder.Build();

            var connectionString = config["ConnectionString"];

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();

                SqlCommand command = new SqlCommand("delete UserPromptTierConfig delete UserPrompt", connection);
                var returnval = command.ExecuteNonQuery();
                connection.Close();
            }
        }

        [Fact]
        public async Task SchoolTierShouldSeeInheritedTiers()
        {
            FlushData();

            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAdmin.UserName;
            var user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var daPrompt = "DA Prompt";
            var daUserPrompt = await CreateDistrictPrompt(user, UserPromptType.PRE_CONFERENCE, daPrompt, true);
            daUserPrompt.Should().NotBeNull();


            userName = DAN_District.School1.SchoolAdmin.UserName;
            user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var saPrompt = "SA Prompt";
            var saUserPrompt = await CreateSchoolPrompt(user, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, saPrompt, false);
            saUserPrompt.Should().NotBeNull();

            userName = DAN_District.School1.PrincipalA.UserName;
            var evaluator = await GetUserByUserNameAPI(userName);

            var torPrompt = "TOR Prompt";
            var torUserPrompt = await CreateEvaluatorPrompt(evaluator, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, torPrompt, true);
            torUserPrompt.Should().NotBeNull();


            var workAreaContexts = await GetWorkAreaContextsForUserAPI(evaluator.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var prompts = await GetUserPromptsForSchoolTier(workAreaContext.FrameworkContextId, UserPromptType.PRE_CONFERENCE, workAreaContext.SchoolCode);
            prompts.Count.Should().Be(2);

            prompts.FindAll(x=>x.PromptType == UserPromptType.PRE_CONFERENCE).Count.Should().Be(2);
            prompts.FindAll(x => x.OwnerTier == UserPromptTier.DISTRICT_ADMIN).Count.Should().Be(1);
            prompts.FindAll(x => x.OwnerTier == UserPromptTier.SCHOOL_ADMIN).Count.Should().Be(1);
        }

        [Fact]
        public async Task EvaluatorTierShouldSeeInheritedTiers()
        {
            FlushData();

            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            var userName = DAN_District.DistrictAdmin.UserName;
            var user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var daPrompt = "DA Prompt";
            var daUserPrompt = await CreateDistrictPrompt(user, UserPromptType.PRE_CONFERENCE, daPrompt, true);
            daUserPrompt.Should().NotBeNull();


            userName = DAN_District.School1.SchoolAdmin.UserName;
            user = await GetUserByUserNameAPI(userName);
            user.Should().NotBeNull();

            var saPrompt = "SA Prompt";
            var saUserPrompt = await CreateSchoolPrompt(user, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, saPrompt, false);
            saUserPrompt.Should().NotBeNull();

            userName = DAN_District.School1.PrincipalA.UserName;
            var evaluator = await GetUserByUserNameAPI(userName);

            var torPrompt = "TOR Prompt";
            var torUserPrompt = await CreateEvaluatorPrompt(evaluator, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, torPrompt, true);
            torUserPrompt.Should().NotBeNull();


            var workAreaContexts = await GetWorkAreaContextsForUserAPI(evaluator.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var prompts = await GetUserPromptsForEvaluatorTier(workAreaContext.FrameworkContextId, UserPromptType.PRE_CONFERENCE, workAreaContext.SchoolCode, evaluator.Id);
            prompts.Count.Should().Be(3);

            prompts.FindAll(x => x.PromptType == UserPromptType.PRE_CONFERENCE).Count.Should().Be(3);
            prompts.FindAll(x => x.OwnerTier == UserPromptTier.DISTRICT_ADMIN).Count.Should().Be(1);
            prompts.FindAll(x => x.OwnerTier == UserPromptTier.SCHOOL_ADMIN).Count.Should().Be(1);
            prompts.FindAll(x => x.OwnerTier == UserPromptTier.EVALUATOR).Count.Should().Be(1);
        }

        [Fact]
        public async Task SchoolTierShouldNotSeePierSchoolPrompts()
        {
            FlushData();

            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);
            
            var userName = DAN_District.School1.SchoolAdmin.UserName;
            var saSchool1 = await GetUserByUserNameAPI(userName);
            saSchool1.Should().NotBeNull();

            var saSchool1Prompt = "School 1 Prompt";
            var saUserPrompt = await CreateSchoolPrompt(saSchool1, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, saSchool1Prompt, false);
            saUserPrompt.Should().NotBeNull();

            userName = DAN_District.School2.SchoolAdmin.UserName;
            var saSchool2 = await GetUserByUserNameAPI(userName);
            saSchool2.Should().NotBeNull();

            var saSchool2Prompt = "School 2 Prompt";
            saUserPrompt = await CreateSchoolPrompt(saSchool2, DAN_District.School2.SchoolCode, UserPromptType.PRE_CONFERENCE, saSchool2Prompt, false);
            saUserPrompt.Should().NotBeNull();

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(saSchool1.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.SA_TR);
            workAreaContext.Should().NotBeNull();

            var prompts = await GetUserPromptsForSchoolTier(workAreaContext.FrameworkContextId, UserPromptType.PRE_CONFERENCE, workAreaContext.SchoolCode);
            prompts.Count.Should().Be(1);
            prompts[0].SchoolCode.Should().Be(DAN_District.School1.SchoolCode);
            prompts[0].Prompt.Equals(saSchool1Prompt);
        }

        [Fact]
        public async Task EvaluatorShouldNotSeePierEvaluatorPrompts()
        {
           FlushData();

            var DAN_District = new District(DistrictNames.DAN, DistrictCodes.DAN);

            var userName = DAN_District.School1.PrincipalA.UserName;
            var torSchool1 = await GetUserByUserNameAPI(userName);
            torSchool1.Should().NotBeNull();

            var torSchool1Prompt = "Tor 1 Prompt";
            var torUserPrompt = await CreateEvaluatorPrompt(torSchool1, DAN_District.School1.SchoolCode, UserPromptType.PRE_CONFERENCE, torSchool1Prompt, false);
            torUserPrompt.Should().NotBeNull();

            userName = DAN_District.School2.PrincipalA.UserName;
            var torSchool2 = await GetUserByUserNameAPI(userName);
            torSchool2.Should().NotBeNull();

            var torSchool2Prompt = "Tor 2 Prompt";
            torUserPrompt = await CreateEvaluatorPrompt(torSchool2, DAN_District.School2.SchoolCode, UserPromptType.PRE_CONFERENCE, torSchool2Prompt, false);
            torUserPrompt.Should().NotBeNull();

            var workAreaContexts = await GetWorkAreaContextsForUserAPI(torSchool2.Id);
            var workAreaContext = TestHelpers.FindWorkAreaWithTagName(workAreaContexts, WorkAreaType.PR_TR);
            workAreaContext.Should().NotBeNull();

            var prompts = await GetUserPromptsForEvaluatorTier(workAreaContext.FrameworkContextId, UserPromptType.PRE_CONFERENCE, workAreaContext.SchoolCode, torSchool2.Id);
            prompts.Count.Should().Be(1);
            prompts[0].SchoolCode.Should().Be(DAN_District.School2.SchoolCode);
            prompts[0].Prompt.Equals(torSchool2Prompt);
        }
    }
}
