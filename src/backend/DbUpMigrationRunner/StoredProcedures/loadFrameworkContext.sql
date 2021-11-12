IF exists (SELECT * FROM sysobjects 
WHERE id = object_id('dbo.LoadFrameworkContext') and sysstat & 0xf = 4)
   BEGIN
      PRINT '.. Dropping sproc LoadFrameworkContext.'
      drop procedure dbo.LoadFrameworkContext
   END
GO
PRINT '.. Creating sproc LoadFrameworkContext.'
GO
CREATE PROCEDURE LoadFrameworkContext
	@pDistrictCode VARCHAR(20)
	,@pFrameworkContextPrototypeID BIGINT

AS
SET NOCOUNT ON 

---------------
-- VARIABLES --
---------------
DECLARE @sql_error              INT
       ,@ProcName               SYSNAME
       ,@tran_count             INT
       ,@sql_error_message   	NVARCHAR(500)

---------------------
-- INITIALIZATIONS --
---------------------
SELECT  @sql_error              = 0
       ,@tran_count             = @@TRANCOUNT
       ,@ProcName               = OBJECT_NAME(@@PROCID)

------------------
-- TRAN CONTROL --
------------------
IF @tran_count = 0
   BEGIN TRANSACTION

/***********************************************************************************/
BEGIN
	DECLARE @FrameworkContextID BIGINT, @PrevFrameworkContextID BIGINT
	DECLARE @theDate DATETIME
	DECLARE @EvaluationType SMALLINT
	DECLARE @SchoolYear SMALLINT
	DECLARE @StateFrameworkID BIGINT
	DECLARE @InstructionalFrameworkID BIGINT
	DECLARE @CurrFrameworkTagName VARCHAR(20), @PrevFrameworkTagName VARCHAR(20)
	DECLARE @PrevFrameworkViewType SMALLINT

	SELECT @theDate = GETDATE()
	
	SELECT @StateFrameworkID=StateFrameworkID, 
	       @InstructionalFrameworkID=InstructionalFrameworkID,
		   @CurrFrameworkTagName=FrameworkTagName,
		   @EvaluationType=EvaluationType,
		   @SchoolYear=SchoolYear
	  FROM dbo.FrameworkContextPrototype proto
	 WHERE proto.Id=@pFrameworkContextPrototypeID
	 
	INSERT dbo.FrameworkContext(
		   Name
		  ,SchoolYear
		  ,DistrictCode
		  ,EvaluationType
		  ,LoadDateTime
		  ,StateFrameworkID
		  ,InstructionalFrameworkID
		  ,DefaultFrameworkID
		  ,PrototypeFrameworkContextID
		  ,FrameworkViewType
		  ,FrameworkTagName)
	SELECT proto.Name
		  ,proto.SchoolYear
		  ,@pDistrictCode
		  ,proto.EvaluationType
		  ,@theDate
		  ,@StateFrameworkID
		  ,@InstructionalFrameworkID
		  ,ISNULL(@InstructionalFrameworkID, @StateFrameworkID)
		  ,@pFrameworkContextPrototypeID
		  ,CASE
		   WHEN (@InstructionalFrameworkID IS NOT NULL) THEN 3
		   ELSE 2
		   END
		  ,@CurrFrameworkTagName
      FROM dbo.FrameworkContextPrototype proto
	 WHERE Id=@pFrameworkContextPrototypeID

	SELECT @FrameworkContextID=SCOPE_IDENTITY()

	SELECT @PrevFrameworkContextID = prev.Id, 
	       @PrevFrameworkTagName = prev.FrameworkTagName,
		   @PrevFrameworkViewType = prev.FrameworkViewType
	  FROM dbo.FrameworkContext cur
	  JOIN dbo.FrameworkContext prev on cur.DistrictCode=prev.DistrictCode
	 WHERE prev.SchoolYear=cur.SchoolYear-1
	   AND prev.EvaluationType=cur.EvaluationType
	   AND cur.Id=@FrameworkContextID
	 
	 -- set default frameworkviewtype
	 IF (@PrevFrameworkTagName = @CurrFrameworkTagName)
	 BEGIN
		UPDATE dbo.FrameworkContext
		   SET FrameworkViewType=@PrevFrameworkViewType
		 WHERE Id=@FrameworkContextID	
	 END
	 ELSE
	 BEGIN
		 IF (@InstructionalFrameworkID IS NOT NULL)
		 BEGIN
			IF (@StateFrameworkID IS NOT NULL)
			BEGIN
				UPDATE dbo.FrameworkContext
				   SET FrameworkViewType=3 -- instructional default
				 WHERE Id=@FrameworkContextID	
			END
			ELSE
			BEGIN
				 UPDATE dbo.FrameworkContext
				    SET FrameworkViewType=4 -- instructional only
				  WHERE Id=@FrameworkContextID	
			END
		END
		ELSE
		BEGIN
			UPDATE dbo.FrameworkContext
			   SET FrameworkViewType=1 -- state only
			 WHERE Id=@FrameworkContextID	
		END
	END

	IF (@PrevFrameworkContextID IS NULL)
	BEGIN

		 DECLARE @DAN BIT
		 SELECT @DAN = 0
		 IF EXISTS (SELECT Id FROM dbo.FrameworkContext WHERE Id=@FrameworkContextID AND Name LIKE '%Danielson%')
		 BEGIN
			SELECT @DAN = 1
		 END

		 INSERT dbo.DistrictConfiguration
				 ( FrameworkContextID ,
				   MidYearReportTitle,
				   FinalReportTitle ,
				   ObservationReportTitle ,
				   SelfAssessReportTitle ,
				   StudentGrowthGoalSettingReportTitle,
				   SummativeCriteriaStmtOfPerfRequired ,
				   SummativeNextYearEvalCycleIsRequired ,
				   SummativeEvaluationEnabled ,
				   SelfAssessmentsModuleEnabled ,
				   NonSummativeScoringEnabled ,
				   CriticalAttributesEnabled ,
				   CriticalAttributesReferenceOnly,
				   SummativeTorFinalRecIsRequired,
				   IsFinalReportConfigDelegated,
				   IsObsReportConfigDelegated,
				   IsSelfAssessReportConfigDelegated,
				   IsStudentGrowthReportConfigDelegated,
				   IsMidYearReportConfigDelegated,
				   AllowCollectedEvidenceSelectionInFinalReport,
				   AllowPackagedEvidenceSelectionInFinalReport,
				   AllowDownloadReportsSchoolAdmins,
				   ShowArchivedEvaluateeReports,
				   ReportArchivesPurged,
				   AssignedCalibrationExerciseSharingType,
				   DistrictAssignsCalibrationExercises,
				   CalibrationExercisesEnabled

				 )
		SELECT @FrameworkContextID , -- FrameworkContextID - bigint
				'eVAL Mid-year Report', -- MidYearReportTitle - varchar(200)
				'eVal Final Report' , -- FinalReportTitle - varchar(200)
				'eVal Observation Report' , -- ObservationReportTitle - varchar(200)
				'eVal Self Assessment Report' , -- SelfAssessReportTitle - varchar(200)
				'eVal Student Growth Goal Setting Report' , -- StudentGrowthGoalSettingReportTitle - varchar(200)
				0 , -- SummativeCriteriaStmtOfPerfRequired - bit
				0 , -- SummativeNextYearEvalCycleIsRequired - bit
				1 , -- SummativeEvaluationEnabled - bit
				1 , -- SelfAssessmentsModuleEnabled - bit
				1 , -- NonSummativeScoringEnabled - bit
				@DAN, -- CriticalAttributesEnabled - bit
				1,  -- CriticalAttributesReferenceOnly - bit
				0,  -- SummativeTorFinalRecIsRequired -- bit
				0, -- IsFinalReportDelegated
				0, -- IsObsReportDelegated
				0, -- IsSelfAssessReportDelegated
				0, -- IsSGReportDelegated
				0, -- IsMidYearReportDelegated
				0,  -- AllowCollectedEvidenceSelectionInFinalReport
				0,  -- AllowPackagedEvidenceSelectionInFinalReport
				1,  -- AllowDownloadReportsSchoolAdmins
				1,  -- ShowArchivedEvaluateeReports
				0,   -- ReportArchivesPurged
				3,   -- AssignedCalibrationExerciseSharingType
				0,    -- DistrictAssignsCalibrationExercises
				0   -- CalibrationExercisesEnabled


		SELECT @sql_error = @@ERROR
		IF @sql_error <> 0
		   BEGIN
			  SELECT @sql_error_message = 'Problem inserting seDistrictConfiguration' 

			  GOTO ErrorHandler
		   END

		INSERT dbo.SchoolConfiguration (
			FrameworkContextID, 
			SchoolCode, 
			IsPrincipalAssignmentDelegated)  --
		SELECT @FrameworkContextID, 
			   schoolCode, 
			   0
		  FROM dbo.Building l
		 WHERE DistrictCode = @pDistrictCode 
			AND SchoolCode <> '0001'
			AND IsSchool=1
	
		SELECT @sql_error = @@ERROR	
		IF @sql_error <> 0
		   BEGIN
			  SELECT @sql_error_message = 'Problem inserting seSchoolConfiguration' 

			  GOTO ErrorHandler
		   END
	END
	ELSE
	BEGIN
		UPDATE dbo.DistrictConfiguration
		   SET FrameworkContextID=@FrameworkContextID 
		 WHERE FrameworkContextID=@PrevFrameworkContextID
	
		SELECT @sql_error = @@ERROR
		IF @sql_error <> 0
		   BEGIN
			  SELECT @sql_error_message = 'Problem updating seDistrictConfiguration' 

			  GOTO ErrorHandler
		   END

		UPDATE dbo.SchoolConfiguration
		   SET FrameworkContextID=@FrameworkContextID
		 WHERE FrameworkContextID=@PrevFrameworkContextID
	
		SELECT @sql_error = @@ERROR	
		IF @sql_error <> 0
		   BEGIN
			  SELECT @sql_error_message = 'Problem updating seSchoolConfiguration' 

			  GOTO ErrorHandler
		   END
	END

	
	EXEC @sql_error =  dbo.InsertEvaluation @pEvaluationType=@EvaluationType, @pSchoolYear=@SchoolYear, @pDistrictCode=@pDistrictCode, @pEvaluateeID=NULL, @sql_error_message=@sql_error_message OUTPUT
	IF @sql_error <> 0
	 BEGIN
		SELECT @sql_error_message = 'EXEC InsertEvaluation failed. In: ' + @ProcName + '. ' + '>>>' + ISNULL(@sql_error_message, '')
		GOTO ErrorHandler
	 END 
END

/***********************************************************************************/
-------------------
-- Handle errors --
-------------------
ErrorHandler:
IF (@sql_error <> 0)
   BEGIN
      IF (@tran_count = 0) AND (@@TRANCOUNT <> 0)
         BEGIN
            ROLLBACK TRANSACTION
         END

	  SELECT @sql_error_message = '.... In: ' + @ProcName + '. ' + Convert(varchar(20), @sql_error) 
		+ '>>>' + ISNULL(@sql_error_message, '') + '<<<  '
		+ ' ... parameters...'
		+ 	' @pDistrictCode =' + @pDistrictCode
		+ 	' | @pProtoFrameworkContextID =' + @pFrameworkContextPrototypeID
        +   '<<<  '

      RAISERROR(@sql_error_message, 15, 10)
   END

----------------------
-- End of Procedure --
----------------------
ProcEnd:

IF (@tran_count = 0) AND (@@TRANCOUNT = 1)
   BEGIN
     COMMIT TRANSACTION
   END

RETURN(@sql_error)

GO



