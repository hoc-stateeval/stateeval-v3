using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SE.Data.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "dbo");

            migrationBuilder.CreateTable(
                name: "Building",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DistrictName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    DistrictCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SchoolCode = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    IsSchool = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Building", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Framework",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Framework", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Role",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EDSName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    DisplayName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Role", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RubricRow",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsStudentGrowthAligned = table.Column<bool>(type: "bit", nullable: false),
                    PL1Descriptor = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    PL2Descriptor = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    PL3Descriptor = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    PL4Descriptor = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    LookFor1 = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    LookFor2 = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    LookFor3 = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true),
                    LookFor4 = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RubricRow", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "User",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Password = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: false),
                    LoginName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FrameworkContextPrototype",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    StateFrameworkId = table.Column<long>(type: "bigint", nullable: true),
                    InstructionalFrameworkId = table.Column<long>(type: "bigint", nullable: true),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrameworkContextPrototype", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FrameworkContextPrototype_Framework_InstructionalFrameworkId",
                        column: x => x.InstructionalFrameworkId,
                        principalSchema: "dbo",
                        principalTable: "Framework",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FrameworkContextPrototype_Framework_StateFrameworkId",
                        column: x => x.StateFrameworkId,
                        principalSchema: "dbo",
                        principalTable: "Framework",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FrameworkNode",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsStudentGrowthAligned = table.Column<bool>(type: "bit", nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    Sequence = table.Column<int>(type: "int", nullable: false),
                    FrameworkId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrameworkNode", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FrameworkNode_Framework_FrameworkId",
                        column: x => x.FrameworkId,
                        principalSchema: "dbo",
                        principalTable: "Framework",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkArea",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    TagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluateeRoleId = table.Column<long>(type: "bigint", nullable: false),
                    IsEvaluatee = table.Column<bool>(type: "bit", nullable: false),
                    IsEvaluator = table.Column<bool>(type: "bit", nullable: false),
                    IsSchoolAdmin = table.Column<bool>(type: "bit", nullable: false),
                    IsDistrictAdmin = table.Column<bool>(type: "bit", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkArea", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkArea_Role_EvaluateeRoleId",
                        column: x => x.EvaluateeRoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkArea_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UserBuildingRole",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    BuildingId = table.Column<long>(type: "bigint", nullable: false),
                    RoleId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserBuildingRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserBuildingRole_Building_BuildingId",
                        column: x => x.BuildingId,
                        principalSchema: "dbo",
                        principalTable: "Building",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserBuildingRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserBuildingRole_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FrameworkContext",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    DistrictCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    StateFrameworkId = table.Column<long>(type: "bigint", nullable: false),
                    InstructionalFrameworkId = table.Column<long>(type: "bigint", nullable: true),
                    DefaultFrameworkId = table.Column<long>(type: "bigint", nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FrameworkViewType = table.Column<int>(type: "int", nullable: false),
                    LoadDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PrototypeFrameworkContextId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrameworkContext", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FrameworkContext_Framework_DefaultFrameworkId",
                        column: x => x.DefaultFrameworkId,
                        principalSchema: "dbo",
                        principalTable: "Framework",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FrameworkContext_Framework_InstructionalFrameworkId",
                        column: x => x.InstructionalFrameworkId,
                        principalSchema: "dbo",
                        principalTable: "Framework",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FrameworkContext_Framework_StateFrameworkId",
                        column: x => x.StateFrameworkId,
                        principalSchema: "dbo",
                        principalTable: "Framework",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_FrameworkContext_FrameworkContextPrototype_PrototypeFrameworkContextId",
                        column: x => x.PrototypeFrameworkContextId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkContextPrototype",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Evaluation",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    DeactivateMessage = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, defaultValue: ""),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    WfState = table.Column<int>(type: "int", nullable: false, defaultValue: 1),
                    DistrictCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    SchoolCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValue: ""),
                    PerformanceLevel = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    StudentGrowthImpactRating = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    ComprehensiveCarryForward = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    ComprehensiveCarryForwardPerformanceLevel = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    ComprehensiveCarryForwardSchoolYear = table.Column<int>(type: "int", nullable: true),
                    EvaluateePlanType = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    LastYearEvaluateePlanType = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    NextYearEvaluateePlanType = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    LastYearFocusedFrameworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: ""),
                    LastYearFocusedSGframeworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: ""),
                    SuggestedEvaluateePlanType = table.Column<int>(type: "int", nullable: true, defaultValue: 0),
                    SuggestedFocusedFrameworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: ""),
                    SuggestedFocusedSgframeworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true, defaultValue: ""),
                    Complete = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    ByPassSGScores = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    SGScoreOverrideComment = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true, defaultValue: ""),
                    ByPassReceipt = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    ByPassReceiptOverrideComment = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true, defaultValue: ""),
                    DropToPaper = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    DropToPaperOverrideComment = table.Column<string>(type: "nvarchar(2048)", maxLength: 2048, nullable: true, defaultValue: ""),
                    MarkedFinalDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SendFinalDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    FinalAcknowledgementSentDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LockDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EvaluateeFinalReportViewDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EOYConfDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SelfEvalSentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    SelfEvalCompleteDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PromptsTorSentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PromptsTeeSentDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AutoSubmitAfterReceipt = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    EvaluateeReflections = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: true, defaultValue: ""),
                    EvaluatorRecommendations = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: true, defaultValue: ""),
                    EvaluateeReflectionsIsPublic = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    MidYearReportsShared = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    EvaluatorScoresShared = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    FinalReportShared = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    SelfEvalComplete = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    SelfEvalShared = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    VisibleToEvaluatee = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    EvaluateeId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluatorId = table.Column<long>(type: "bigint", nullable: true),
                    FocusedFrameworkNodeId = table.Column<long>(type: "bigint", nullable: true),
                    FocusedSGFrameworkNodeId = table.Column<long>(type: "bigint", nullable: true),
                    ModifiedCompFocusedFrameworkNode2Id = table.Column<long>(type: "bigint", nullable: true),
                    NextYearFocusedFrameworkNodeId = table.Column<long>(type: "bigint", nullable: true),
                    NextYearFocusedSGframeworkNodeId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Evaluation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Evaluation_FrameworkNode_FocusedFrameworkNodeId",
                        column: x => x.FocusedFrameworkNodeId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluation_FrameworkNode_FocusedSGFrameworkNodeId",
                        column: x => x.FocusedSGFrameworkNodeId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluation_FrameworkNode_ModifiedCompFocusedFrameworkNode2Id",
                        column: x => x.ModifiedCompFocusedFrameworkNode2Id,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluation_FrameworkNode_NextYearFocusedFrameworkNodeId",
                        column: x => x.NextYearFocusedFrameworkNodeId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluation_FrameworkNode_NextYearFocusedSGframeworkNodeId",
                        column: x => x.NextYearFocusedSGframeworkNodeId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluation_User_EvaluateeId",
                        column: x => x.EvaluateeId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Evaluation_User_EvaluatorId",
                        column: x => x.EvaluatorId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FrameworkNodeRubricRow",
                schema: "dbo",
                columns: table => new
                {
                    FrameworkNodeId = table.Column<long>(type: "bigint", nullable: false),
                    RubricRowId = table.Column<long>(type: "bigint", nullable: false),
                    Sequence = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FrameworkNodeRubricRow", x => new { x.FrameworkNodeId, x.RubricRowId });
                    table.ForeignKey(
                        name: "FK_FrameworkNodeRubricRow_FrameworkNode_FrameworkNodeId",
                        column: x => x.FrameworkNodeId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FrameworkNodeRubricRow_RubricRow_RubricRowId",
                        column: x => x.RubricRowId,
                        principalSchema: "dbo",
                        principalTable: "RubricRow",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DistrictConfiguration",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FinalReportTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, defaultValue: "eVAL Summative Report"),
                    MidYearReportTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, defaultValue: "eVAL Mid Year Report"),
                    ObservationReportTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, defaultValue: "eVAL Observation Report"),
                    SelfAssessReportTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, defaultValue: "eVAL Self Assessment Report"),
                    SummativeCriteriaStmtOfPerfRequired = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    SummativeNextYearEvalCycleIsRequired = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    SummativeEvaluationEnabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    SelfAssessmentsModuleEnabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    NonSummativeScoringEnabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    CriticalAttributesEnabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    CriticalAttributesReferenceOnly = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    SummativeTorFinalRecIsRequired = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    StudentGrowthGoalSettingReportTitle = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: true, defaultValue: "eVAL Student Growth Goal Setting Report"),
                    ObservationReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: ""),
                    SelfAssessmentReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: ""),
                    StudentGrowthGoalSettingReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: ""),
                    FinalReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: ""),
                    IsObsReportConfigDelegated = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    IsSelfAssessReportConfigDelegated = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    IsStudentGrowthReportConfigDelegated = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    IsFinalReportConfigDelegated = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    IsMidYearReportConfigDelegated = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    MidYearReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true, defaultValue: ""),
                    AllowCollectedEvidenceSelectionInFinalReport = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    AllowPackagedEvidenceSelectionInFinalReport = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    AllowDownloadReportsSchoolAdmins = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    ShowArchivedEvaluateeReports = table.Column<bool>(type: "bit", nullable: true, defaultValue: true),
                    ReportArchivesPurged = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    AllowTeeYTDEvidence = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    CalibrationExercisesEnabled = table.Column<bool>(type: "bit", nullable: true),
                    AssignedCalibrationExerciseSharingType = table.Column<int>(type: "int", nullable: true, defaultValue: 3),
                    DistrictAssignsCalibrationExercises = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    ExemplarVideosModuleEnabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    CalibrationExercisesModuleEnabled = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    AllowFocusedComponentScoring = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    FrameworkContextId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DistrictConfiguration", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DistrictConfiguration_FrameworkContext_FrameworkContextId",
                        column: x => x.FrameworkContextId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkContext",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SchoolConfiguration",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SchoolCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsPrincipalAssignmentDelegated = table.Column<bool>(type: "bit", nullable: true, defaultValue: false),
                    FrameworkContextId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SchoolConfiguration", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SchoolConfiguration_FrameworkContext_FrameworkContextId",
                        column: x => x.FrameworkContextId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkContext",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WorkAreaContext",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BuildingId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    WorkAreaId = table.Column<long>(type: "bigint", nullable: false),
                    FrameworkContextId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkAreaContext", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_Building_BuildingId",
                        column: x => x.BuildingId,
                        principalSchema: "dbo",
                        principalTable: "Building",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_FrameworkContext_FrameworkContextId",
                        column: x => x.FrameworkContextId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkContext",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_WorkArea_WorkAreaId",
                        column: x => x.WorkAreaId,
                        principalSchema: "dbo",
                        principalTable: "WorkArea",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "StudentGrowthGoalBundle",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    WfState = table.Column<int>(type: "int", nullable: false),
                    InRevision = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    EvaluatorProcessConfNotes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false, defaultValue: ""),
                    EvaluateeProcessConfNotes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false, defaultValue: ""),
                    EvaluatorMidConfNotes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false, defaultValue: ""),
                    EvaluateeMidConfNotes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false, defaultValue: ""),
                    EvaluatorEoyconfNotes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false, defaultValue: ""),
                    EvaluateeEoyconfNotes = table.Column<string>(type: "nvarchar(max)", maxLength: 5000, nullable: false, defaultValue: ""),
                    SharingDraft = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    EvaluatorScoresShared = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    GoalSettingConfDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProcessCompleteDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProcessSharedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    EvaluateeId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentGrowthGoalBundle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoalBundle_Evaluation_EvaluationId",
                        column: x => x.EvaluationId,
                        principalSchema: "dbo",
                        principalTable: "Evaluation",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoalBundle_User_EvaluateeId",
                        column: x => x.EvaluateeId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentGrowthGoal",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: false, defaultValue: ""),
                    GoalStatement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false, defaultValue: false),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EvaluateeId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: false),
                    FrameworkNodeId = table.Column<long>(type: "bigint", nullable: false),
                    BundleId = table.Column<long>(type: "bigint", nullable: false),
                    ProcessRubricRowId = table.Column<long>(type: "bigint", nullable: true),
                    ResultsRubricRowId = table.Column<long>(type: "bigint", nullable: true),
                    StudentGrowthGoalBundleId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentGrowthGoal", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_Evaluation_EvaluationId",
                        column: x => x.EvaluationId,
                        principalSchema: "dbo",
                        principalTable: "Evaluation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_FrameworkNode_FrameworkNodeId",
                        column: x => x.FrameworkNodeId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkNode",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_RubricRow_ProcessRubricRowId",
                        column: x => x.ProcessRubricRowId,
                        principalSchema: "dbo",
                        principalTable: "RubricRow",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_RubricRow_ResultsRubricRowId",
                        column: x => x.ResultsRubricRowId,
                        principalSchema: "dbo",
                        principalTable: "RubricRow",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_StudentGrowthGoalBundle_BundleId",
                        column: x => x.BundleId,
                        principalSchema: "dbo",
                        principalTable: "StudentGrowthGoalBundle",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_StudentGrowthGoalBundle_StudentGrowthGoalBundleId",
                        column: x => x.StudentGrowthGoalBundleId,
                        principalSchema: "dbo",
                        principalTable: "StudentGrowthGoalBundle",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoal_User_EvaluateeId",
                        column: x => x.EvaluateeId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DistrictConfiguration_FrameworkContextId",
                schema: "dbo",
                table: "DistrictConfiguration",
                column: "FrameworkContextId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_EvaluateeId",
                schema: "dbo",
                table: "Evaluation",
                column: "EvaluateeId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_EvaluatorId",
                schema: "dbo",
                table: "Evaluation",
                column: "EvaluatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_FocusedFrameworkNodeId",
                schema: "dbo",
                table: "Evaluation",
                column: "FocusedFrameworkNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_FocusedSGFrameworkNodeId",
                schema: "dbo",
                table: "Evaluation",
                column: "FocusedSGFrameworkNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_ModifiedCompFocusedFrameworkNode2Id",
                schema: "dbo",
                table: "Evaluation",
                column: "ModifiedCompFocusedFrameworkNode2Id");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_NextYearFocusedFrameworkNodeId",
                schema: "dbo",
                table: "Evaluation",
                column: "NextYearFocusedFrameworkNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Evaluation_NextYearFocusedSGframeworkNodeId",
                schema: "dbo",
                table: "Evaluation",
                column: "NextYearFocusedSGframeworkNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContext_DefaultFrameworkId",
                schema: "dbo",
                table: "FrameworkContext",
                column: "DefaultFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContext_InstructionalFrameworkId",
                schema: "dbo",
                table: "FrameworkContext",
                column: "InstructionalFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContext_PrototypeFrameworkContextId",
                schema: "dbo",
                table: "FrameworkContext",
                column: "PrototypeFrameworkContextId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContext_StateFrameworkId",
                schema: "dbo",
                table: "FrameworkContext",
                column: "StateFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContextPrototype_InstructionalFrameworkId",
                schema: "dbo",
                table: "FrameworkContextPrototype",
                column: "InstructionalFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContextPrototype_StateFrameworkId",
                schema: "dbo",
                table: "FrameworkContextPrototype",
                column: "StateFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkNode_FrameworkId",
                schema: "dbo",
                table: "FrameworkNode",
                column: "FrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkNodeRubricRow_RubricRowId",
                schema: "dbo",
                table: "FrameworkNodeRubricRow",
                column: "RubricRowId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolConfiguration_FrameworkContextId",
                schema: "dbo",
                table: "SchoolConfiguration",
                column: "FrameworkContextId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_BundleId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "BundleId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_EvaluateeId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "EvaluateeId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_EvaluationId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "EvaluationId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_FrameworkNodeId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "FrameworkNodeId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_ProcessRubricRowId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "ProcessRubricRowId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_ResultsRubricRowId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "ResultsRubricRowId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_StudentGrowthGoalBundleId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "StudentGrowthGoalBundleId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoalBundle_EvaluateeId",
                schema: "dbo",
                table: "StudentGrowthGoalBundle",
                column: "EvaluateeId");

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoalBundle_EvaluationId",
                schema: "dbo",
                table: "StudentGrowthGoalBundle",
                column: "EvaluationId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBuildingRole_BuildingId",
                schema: "dbo",
                table: "UserBuildingRole",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBuildingRole_RoleId",
                schema: "dbo",
                table: "UserBuildingRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserBuildingRole_UserId",
                schema: "dbo",
                table: "UserBuildingRole",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkArea_EvaluateeRoleId",
                schema: "dbo",
                table: "WorkArea",
                column: "EvaluateeRoleId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkArea_RoleId",
                schema: "dbo",
                table: "WorkArea",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkAreaContext_BuildingId",
                schema: "dbo",
                table: "WorkAreaContext",
                column: "BuildingId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkAreaContext_FrameworkContextId",
                schema: "dbo",
                table: "WorkAreaContext",
                column: "FrameworkContextId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkAreaContext_UserId",
                schema: "dbo",
                table: "WorkAreaContext",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkAreaContext_WorkAreaId",
                schema: "dbo",
                table: "WorkAreaContext",
                column: "WorkAreaId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DistrictConfiguration",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkNodeRubricRow",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "SchoolConfiguration",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "StudentGrowthGoal",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserBuildingRole",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "WorkAreaContext",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "RubricRow",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "StudentGrowthGoalBundle",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Building",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkContext",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "WorkArea",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Evaluation",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkContextPrototype",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkNode",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "User",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Framework",
                schema: "dbo");
        }
    }
}
