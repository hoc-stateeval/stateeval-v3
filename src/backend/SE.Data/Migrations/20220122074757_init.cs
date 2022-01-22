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
                    DistrictName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: false),
                    DistrictCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    SchoolName = table.Column<string>(type: "nvarchar(60)", maxLength: 60, nullable: true),
                    SchoolCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
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
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
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
                    Title = table.Column<string>(type: "nvarchar(350)", maxLength: 350, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    IsStudentGrowthAligned = table.Column<bool>(type: "bit", nullable: false),
                    PL1Descriptor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PL2Descriptor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PL3Descriptor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PL4Descriptor = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LookFor1 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LookFor2 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LookFor3 = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LookFor4 = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                    EmailAddress = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    ProfileImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LoginName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    CertificateNumber = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    OTPW = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: true),
                    LastLoginDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_User", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPromptGroup",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FrameworkContextId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PromptType = table.Column<int>(type: "int", nullable: false),
                    SchoolCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    SGFrameworkNodeId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPromptGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserPrompts",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FrameworkContextId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    PromptType = table.Column<int>(type: "int", nullable: false),
                    Prompt = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SchoolCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedAsAdmin = table.Column<bool>(type: "bit", nullable: false),
                    Sequence = table.Column<short>(type: "smallint", nullable: false),
                    Retired = table.Column<bool>(type: "bit", nullable: false),
                    Private = table.Column<bool>(type: "bit", nullable: false),
                    ObservationId = table.Column<long>(type: "bigint", nullable: true),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPrompts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FrameworkNode",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FrameworkContextPrototype",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    StateFrameworkId = table.Column<long>(type: "bigint", nullable: false),
                    InstructionalFrameworkId = table.Column<long>(type: "bigint", nullable: true),
                    EvaluateeRoleId = table.Column<long>(type: "bigint", nullable: false)
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FrameworkContextPrototype_Role_EvaluateeRoleId",
                        column: x => x.EvaluateeRoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkArea",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
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
                name: "EvidencePackage",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    PerformanceLevel = table.Column<int>(type: "int", nullable: false),
                    RubricStatement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AdditionalInput = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RubricRowId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvidencePackage", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EvidencePackage_User_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Token = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Expires = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Revoked = table.Column<DateTime>(type: "datetime2", nullable: true),
                    RevokedByIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplacedByToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReasonRevoked = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshTokens_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBuildingRole_Role_RoleId",
                        column: x => x.RoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserBuildingRole_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPromptGroupUserPrompt",
                schema: "dbo",
                columns: table => new
                {
                    UserPromptGroupId = table.Column<long>(type: "bigint", nullable: false),
                    UserPromptId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPromptGroupUserPrompt", x => new { x.UserPromptGroupId, x.UserPromptId });
                    table.ForeignKey(
                        name: "FK_UserPromptGroupUserPrompt_UserPromptGroup_UserPromptGroupId",
                        column: x => x.UserPromptGroupId,
                        principalSchema: "dbo",
                        principalTable: "UserPromptGroup",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_UserPromptGroupUserPrompt_UserPrompts_UserPromptId",
                        column: x => x.UserPromptId,
                        principalSchema: "dbo",
                        principalTable: "UserPrompts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserPromptResponses",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Response = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModifiedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    DefaultAssignment = table.Column<bool>(type: "bit", nullable: false),
                    UserPromptId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: true),
                    ObservationId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserPromptResponses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserPromptResponses_UserPrompts_UserPromptId",
                        column: x => x.UserPromptId,
                        principalSchema: "dbo",
                        principalTable: "UserPrompts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "FrameworkContext",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    SchoolYear = table.Column<int>(type: "int", nullable: false),
                    DistrictCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    EvaluationType = table.Column<int>(type: "int", nullable: false),
                    FrameworkTagName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    FrameworkViewType = table.Column<int>(type: "int", nullable: false),
                    LoadDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StateFrameworkId = table.Column<long>(type: "bigint", nullable: false),
                    InstructionalFrameworkId = table.Column<long>(type: "bigint", nullable: true),
                    DefaultFrameworkId = table.Column<long>(type: "bigint", nullable: false),
                    PrototypeFrameworkContextId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluateeRoleId = table.Column<long>(type: "bigint", nullable: false)
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FrameworkContext_Role_EvaluateeRoleId",
                        column: x => x.EvaluateeRoleId,
                        principalSchema: "dbo",
                        principalTable: "Role",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DistrictConfiguration",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FinalReportTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FinalReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AllowCollectedEvidenceSelectionInFinalReport = table.Column<bool>(type: "bit", nullable: false),
                    AllowPackagedEvidenceSelectionInFinalReport = table.Column<bool>(type: "bit", nullable: false),
                    IsFinalReportConfigDelegated = table.Column<bool>(type: "bit", nullable: false),
                    MidYearReportTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MidYearReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsMidYearReportConfigDelegated = table.Column<bool>(type: "bit", nullable: false),
                    StudentGrowthGoalSettingReportTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StudentGrowthGoalSettingReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsStudentGrowthReportConfigDelegated = table.Column<bool>(type: "bit", nullable: false),
                    ObservationReportTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ObservationReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsObsReportConfigDelegated = table.Column<bool>(type: "bit", nullable: false),
                    SelfAssessmentsModuleEnabled = table.Column<bool>(type: "bit", nullable: false),
                    SelfAssessReportTitle = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SelfAssessmentReportCustomText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsSelfAssessReportConfigDelegated = table.Column<bool>(type: "bit", nullable: false),
                    SummativeCriteriaStmtOfPerfRequired = table.Column<bool>(type: "bit", nullable: false),
                    SummativeNextYearEvalCycleIsRequired = table.Column<bool>(type: "bit", nullable: false),
                    SummativeTorFinalRecIsRequired = table.Column<bool>(type: "bit", nullable: false),
                    SummativeEvaluationEnabled = table.Column<bool>(type: "bit", nullable: false),
                    NonSummativeScoringEnabled = table.Column<bool>(type: "bit", nullable: false),
                    CriticalAttributesEnabled = table.Column<bool>(type: "bit", nullable: false),
                    CriticalAttributesReferenceOnly = table.Column<bool>(type: "bit", nullable: false),
                    AllowDownloadReportsSchoolAdmins = table.Column<bool>(type: "bit", nullable: false),
                    ShowArchivedEvaluateeReports = table.Column<bool>(type: "bit", nullable: false),
                    ReportArchivesPurged = table.Column<bool>(type: "bit", nullable: false),
                    AllowTeeYTDEvidence = table.Column<bool>(type: "bit", nullable: false),
                    AllowFocusedComponentScoring = table.Column<bool>(type: "bit", nullable: false),
                    AssignedCalibrationExerciseSharingType = table.Column<int>(type: "int", nullable: false),
                    DistrictAssignsCalibrationExercises = table.Column<bool>(type: "bit", nullable: false),
                    CalibrationExercisesModuleEnabled = table.Column<bool>(type: "bit", nullable: false),
                    ExemplarVideosModuleEnabled = table.Column<bool>(type: "bit", nullable: false),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                    DeactivateMessage = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WfState = table.Column<int>(type: "int", nullable: false),
                    SchoolCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    PerformanceLevel = table.Column<int>(type: "int", nullable: true),
                    StudentGrowthImpactRating = table.Column<int>(type: "int", nullable: true),
                    ComprehensiveCarryForward = table.Column<bool>(type: "bit", nullable: true),
                    CarryForwardPerformanceLevel = table.Column<int>(type: "int", nullable: true),
                    CarryForwardSchoolYear = table.Column<int>(type: "int", nullable: true),
                    EvaluateePlanType = table.Column<int>(type: "int", nullable: true),
                    LastYearEvaluateePlanType = table.Column<int>(type: "int", nullable: true),
                    NextYearEvaluateePlanType = table.Column<int>(type: "int", nullable: true),
                    LastYearFocusedFrameworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    LastYearFocusedSGframeworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    SuggestedEvaluateePlanType = table.Column<int>(type: "int", nullable: true),
                    SuggestedFocusedFrameworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    SuggestedFocusedSGframeworkNodeShortName = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Complete = table.Column<bool>(type: "bit", nullable: true),
                    ByPassSGScores = table.Column<bool>(type: "bit", nullable: true),
                    SGScoreOverrideComment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ByPassReceipt = table.Column<bool>(type: "bit", nullable: true),
                    ByPassReceiptOverrideComment = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DropToPaper = table.Column<bool>(type: "bit", nullable: true),
                    DropToPaperOverrideComment = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    AutoSubmitAfterReceipt = table.Column<bool>(type: "bit", nullable: true),
                    EvaluateeReflections = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluatorRecommendations = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluateeReflectionsIsPublic = table.Column<bool>(type: "bit", nullable: true),
                    MidYearReportsShared = table.Column<bool>(type: "bit", nullable: true),
                    EvaluatorScoresShared = table.Column<bool>(type: "bit", nullable: true),
                    FinalReportShared = table.Column<bool>(type: "bit", nullable: true),
                    SelfEvalComplete = table.Column<bool>(type: "bit", nullable: true),
                    SelfEvalShared = table.Column<bool>(type: "bit", nullable: true),
                    VisibleToEvaluatee = table.Column<bool>(type: "bit", nullable: true),
                    FrameworkContextId = table.Column<long>(type: "bigint", nullable: false),
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
                        name: "FK_Evaluation_FrameworkContext_FrameworkContextId",
                        column: x => x.FrameworkContextId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkContext",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Evaluation_User_EvaluatorId",
                        column: x => x.EvaluatorId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SchoolConfiguration",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SchoolCode = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    EvaluationSetupDelegated = table.Column<bool>(type: "bit", nullable: false),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_FrameworkContext_FrameworkContextId",
                        column: x => x.FrameworkContextId,
                        principalSchema: "dbo",
                        principalTable: "FrameworkContext",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_User_UserId",
                        column: x => x.UserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WorkAreaContext_WorkArea_WorkAreaId",
                        column: x => x.WorkAreaId,
                        principalSchema: "dbo",
                        principalTable: "WorkArea",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Observation",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluatorId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluateeId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluateePlanType = table.Column<int>(type: "int", nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Observation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Observation_Evaluation_EvaluationId",
                        column: x => x.EvaluationId,
                        principalSchema: "dbo",
                        principalTable: "Evaluation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Observation_User_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Observation_User_EvaluateeId",
                        column: x => x.EvaluateeId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Observation_User_EvaluatorId",
                        column: x => x.EvaluatorId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SelfAssessment",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EvaluateePlanType = table.Column<int>(type: "int", nullable: false),
                    ShortName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SelfAssessment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SelfAssessment_Evaluation_EvaluationId",
                        column: x => x.EvaluationId,
                        principalSchema: "dbo",
                        principalTable: "Evaluation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_SelfAssessment_User_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudentGrowthGoalBundle",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: false),
                    WfState = table.Column<int>(type: "int", nullable: false),
                    InRevision = table.Column<bool>(type: "bit", nullable: false),
                    EvaluatorProcessConfNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluateeProcessConfNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluatorMidConfNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluateeMidConfNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluatorEoyconfNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EvaluateeEoyconfNotes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SharingDraft = table.Column<bool>(type: "bit", nullable: false),
                    EvaluatorScoresShared = table.Column<bool>(type: "bit", nullable: false),
                    GoalSettingConfDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProcessCompleteDateTime = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ProcessSharedDateTime = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentGrowthGoalBundle", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentGrowthGoalBundle_Evaluation_EvaluationId",
                        column: x => x.EvaluationId,
                        principalSchema: "dbo",
                        principalTable: "Evaluation",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EvidenceItem",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Public = table.Column<bool>(type: "bit", nullable: false),
                    EvidenceType = table.Column<int>(type: "int", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedByUserId = table.Column<long>(type: "bigint", nullable: false),
                    RubricRowId = table.Column<long>(type: "bigint", nullable: false),
                    EvaluationId = table.Column<long>(type: "bigint", nullable: false),
                    EvidenceCollectionObjectId = table.Column<long>(type: "bigint", nullable: false),
                    EvidenceCollectionType = table.Column<int>(type: "int", nullable: false),
                    CodedEvidenceClientId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EvidenceText = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ObservationId = table.Column<long>(type: "bigint", nullable: true),
                    UserPromptResponseId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvidenceItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EvidenceItem_Observation_ObservationId",
                        column: x => x.ObservationId,
                        principalSchema: "dbo",
                        principalTable: "Observation",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EvidenceItem_RubricRow_RubricRowId",
                        column: x => x.RubricRowId,
                        principalSchema: "dbo",
                        principalTable: "RubricRow",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EvidenceItem_User_CreatedByUserId",
                        column: x => x.CreatedByUserId,
                        principalSchema: "dbo",
                        principalTable: "User",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EvidenceItem_UserPromptResponses_UserPromptResponseId",
                        column: x => x.UserPromptResponseId,
                        principalSchema: "dbo",
                        principalTable: "UserPromptResponses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "StudentGrowthGoal",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: true),
                    GoalStatement = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CreationDateTime = table.Column<DateTime>(type: "datetime2", nullable: false),
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
                });

            migrationBuilder.CreateTable(
                name: "EvidencePackageEvidenceItem",
                schema: "dbo",
                columns: table => new
                {
                    EvidencePackageId = table.Column<long>(type: "bigint", nullable: false),
                    EvidenceItemId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EvidencePackageEvidenceItem", x => new { x.EvidencePackageId, x.EvidenceItemId });
                    table.ForeignKey(
                        name: "FK_EvidencePackageEvidenceItem_EvidenceItem_EvidenceItemId",
                        column: x => x.EvidenceItemId,
                        principalSchema: "dbo",
                        principalTable: "EvidenceItem",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EvidencePackageEvidenceItem_EvidencePackage_EvidencePackageId",
                        column: x => x.EvidencePackageId,
                        principalSchema: "dbo",
                        principalTable: "EvidencePackage",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_DistrictConfiguration_FrameworkContextId",
                schema: "dbo",
                table: "DistrictConfiguration",
                column: "FrameworkContextId");

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
                name: "IX_Evaluation_FrameworkContextId",
                schema: "dbo",
                table: "Evaluation",
                column: "FrameworkContextId");

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
                name: "IX_EvidenceItem_CreatedByUserId",
                schema: "dbo",
                table: "EvidenceItem",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EvidenceItem_ObservationId",
                schema: "dbo",
                table: "EvidenceItem",
                column: "ObservationId");

            migrationBuilder.CreateIndex(
                name: "IX_EvidenceItem_RubricRowId",
                schema: "dbo",
                table: "EvidenceItem",
                column: "RubricRowId");

            migrationBuilder.CreateIndex(
                name: "IX_EvidenceItem_UserPromptResponseId",
                schema: "dbo",
                table: "EvidenceItem",
                column: "UserPromptResponseId");

            migrationBuilder.CreateIndex(
                name: "IX_EvidencePackage_CreatedByUserId",
                schema: "dbo",
                table: "EvidencePackage",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_EvidencePackageEvidenceItem_EvidenceItemId",
                schema: "dbo",
                table: "EvidencePackageEvidenceItem",
                column: "EvidenceItemId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContext_DefaultFrameworkId",
                schema: "dbo",
                table: "FrameworkContext",
                column: "DefaultFrameworkId");

            migrationBuilder.CreateIndex(
                name: "IX_FrameworkContext_EvaluateeRoleId",
                schema: "dbo",
                table: "FrameworkContext",
                column: "EvaluateeRoleId");

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
                name: "IX_FrameworkContextPrototype_EvaluateeRoleId",
                schema: "dbo",
                table: "FrameworkContextPrototype",
                column: "EvaluateeRoleId");

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
                name: "IX_Observation_CreatedByUserId",
                schema: "dbo",
                table: "Observation",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Observation_EvaluateeId",
                schema: "dbo",
                table: "Observation",
                column: "EvaluateeId");

            migrationBuilder.CreateIndex(
                name: "IX_Observation_EvaluationId",
                schema: "dbo",
                table: "Observation",
                column: "EvaluationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Observation_EvaluatorId",
                schema: "dbo",
                table: "Observation",
                column: "EvaluatorId");

            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                schema: "dbo",
                table: "RefreshTokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_SchoolConfiguration_FrameworkContextId",
                schema: "dbo",
                table: "SchoolConfiguration",
                column: "FrameworkContextId");

            migrationBuilder.CreateIndex(
                name: "IX_SelfAssessment_CreatedByUserId",
                schema: "dbo",
                table: "SelfAssessment",
                column: "CreatedByUserId");

            migrationBuilder.CreateIndex(
                name: "IX_SelfAssessment_EvaluationId",
                schema: "dbo",
                table: "SelfAssessment",
                column: "EvaluationId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_StudentGrowthGoal_BundleId",
                schema: "dbo",
                table: "StudentGrowthGoal",
                column: "BundleId");

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
                name: "IX_StudentGrowthGoalBundle_EvaluationId",
                schema: "dbo",
                table: "StudentGrowthGoalBundle",
                column: "EvaluationId",
                unique: true);

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
                name: "IX_UserPromptGroupUserPrompt_UserPromptId",
                schema: "dbo",
                table: "UserPromptGroupUserPrompt",
                column: "UserPromptId");

            migrationBuilder.CreateIndex(
                name: "IX_UserPromptResponses_UserPromptId",
                schema: "dbo",
                table: "UserPromptResponses",
                column: "UserPromptId");

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
                name: "EvidencePackageEvidenceItem",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkNodeRubricRow",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "RefreshTokens",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "SchoolConfiguration",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "SelfAssessment",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "StudentGrowthGoal",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserBuildingRole",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserPromptGroupUserPrompt",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "WorkAreaContext",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EvidenceItem",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "EvidencePackage",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "StudentGrowthGoalBundle",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserPromptGroup",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Building",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "WorkArea",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Observation",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "RubricRow",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserPromptResponses",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Evaluation",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "UserPrompts",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkContext",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkNode",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "User",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "FrameworkContextPrototype",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Framework",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Role",
                schema: "dbo");
        }
    }
}
