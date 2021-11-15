if exists (select * from sysobjects 
where id = object_id('dbo.InsertEvaluation') and sysstat & 0xf = 4)
   BEGIN
      PRINT '.. Dropping sproc InsertEvaluation.'
      drop procedure dbo.InsertEvaluation
   END
GO
PRINT '.. Creating sproc InsertEvaluation.'
GO

CREATE PROCEDURE InsertEvaluation
	@pEvaluationType SMALLINT
	,@pSchoolYear SMALLINT = NULL
	,@pDistrictCode VARCHAR(20)
	,@pEvaluateeID BIGINT = NULL
	,@pDebug BIT = 0
	,@sql_error_message VARCHAR(500) OUTPUT

AS
SET NOCOUNT ON 

---------------
-- VARIABLES --
---------------
DECLARE @sql_error                 INT
       ,@ProcName                  SYSNAME
       ,@tran_count                INT


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

DECLARE @SchoolYear SMALLINT, @theDate DATETIME
SELECT @theDate = getdate()
SELECT @SchoolYear = @pSchoolYear
IF (@pSchoolYear IS NULL)
BEGIN
	SELECT @SchoolYear = MAX(SchoolYear) 
	  FROM dbo.FrameworkContext 
	 WHERE DistrictCode=@pDistrictCode
	   AND EvaluationType=@pEvaluationType
END

IF @schoolYear IS NULL
	GOTO	PROCEND

CREATE TABLE #User(Id BIGINT, DistrictCode VARCHAR(20), SchoolCode VARCHAR(20))

IF (@pEvaluateeID IS NOT NULL)
BEGIN
	INSERT INTO #User(Id, DistrictCode, SchoolCode)
	SELECT DISTINCT u.Id
	      ,b.DistrictCode
		  ,b.SchoolCode
	  FROM dbo.[User] u
	  JOIN dbo.UserBuildingRole ubr ON ubr.UserId = u.Id
	  JOIN dbo.[Building] b on ubr.BuildingId=b.Id
	  JOIN dbo.[Role] r on ubr.RoleId=r.Id
	 WHERE u.Id=@pEvaluateeID
	   AND b.DistrictCode=@pDistrictCode
	   AND u.Id NOT IN
		   (SELECT EvaluateeID
		      FROM dbo.Evaluation
		     WHERE DistrictCode=@pDistrictCode
		       AND EvaluationType=@pEvaluationType
		       AND SchoolYear=@SchoolYear)
			   
	   AND r.EDSName IN ('SESchoolPrincipal', 'SESchoolHeadPrincipal', 'SESchoolTeacher', 'SESchoolLibrarian')
END
ELSE
BEGIN
	INSERT INTO #User(Id, DistrictCode, SchoolCode)
	SELECT DISTINCT u.Id
	      ,b.DistrictCode
		  ,b.SchoolCode
	  FROM dbo.[User] u
	  JOIN dbo.UserBuildingRole ubr ON ubr.UserId = u.Id
	  JOIN dbo.[Building] b on ubr.BuildingId=b.Id
	  JOIN dbo.[Role] r on ubr.RoleId=r.Id
	 WHERE b.DistrictCode=@pDistrictCode
	   AND r.EDSName=
	   CASE WHEN @pEvaluationType=1 THEN 'SESchoolPrincipal' 
	   WHEN @pEvaluationType=2 THEN 'SESchoolTeacher' 
	   WHEN @pEvaluationType=3 THEN 'SESchoolLibrarian'
	   END
	   AND u.Id NOT IN
	       (SELECT EvaluateeID
	          FROM dbo.Evaluation 
	         WHERE DistrictCode=@pDistrictCode
		       AND EvaluationType=@pEvaluationType
	           AND SchoolYear=@SchoolYear) 
END


IF @pDebug=1 SELECT '#User', * FROM #user

DECLARE @EvalID BIGINT

INSERT dbo.Evaluation(EvaluateeID, 
	IsActive, 
	EvaluatorID, 
	EvaluationType, 
	SchoolYear, 
	DistrictCode, 
	SchoolCode, 
	WfState, 
	ComprehensiveCarryForward, 
	CreationDateTime)
SELECT u.Id, 
	1,
	NULL, 
	@pEvaluationType, 
	@SchoolYear, 
	@pDistrictCode, 
	u.SchoolCode, 
	1, 
	0, 
	getdate()
  FROM #User u

  SELECT @EvalID=SCOPE_IDENTITY(), @sql_error = @@ERROR
		IF @sql_error <> 0
			BEGIN
				SELECT @sql_error_message = 'Problem inserting into SEEvaluation' 

				GOTO ErrorHandler
			END

DECLARE @TR_WfStateID BIGINT
DECLARE @PR_WfStateID BIGINT
SELECT @TR_WfStateID = 11 --'SGBUNDLE STARTED'
SELECT @PR_WfStateID = 12 -- 'SGBUNDLE PROCESS-COMPLETE'

INSERT dbo.StudentGrowthGoalBundle(
	EvaluationID, 
	WfState, 
	EvaluationType, 
	InRevision,
	SharingDraft,
	EvaluatorScoresShared) 
SELECT e.Id,
	   CASE e.EvaluationType WHEN 2 THEN @TR_WfStateID ELSE @PR_WfStateID END,
	   e.EvaluationType,
	   0,
	   0,
	   0
  FROM dbo.Evaluation e
 WHERE e.DistrictCode=@pDistrictCode
   AND e.SchoolYear=@SchoolYear
   AND e.EvaluationType=@pEvaluationType

  SELECT @EvalID=SCOPE_IDENTITY(), @sql_error = @@ERROR
		IF @sql_error <> 0
			BEGIN
				SELECT @sql_error_message = 'Problem inserting into SEStudentGrowthGoalBundle' 

				GOTO ErrorHandler
			END

--INSERT dbo.SEEvidenceCollectionVisibility(EvidenceCollectionTypeID, EvidenceCollectionObjectID, EvaluationID, EvidenceOwnerID, EvidenceShared)
--SELECT 4, b.StudentGrowthGoalBundleID, e.EvaluationID, u.UserID, 0
--  FROM dbo.SEEvaluation e
--  JOIN dbo.SEStudentGrowthGoalBundle b ON e.EvaluationID=b.EvaluationID
--  JOIN dbo.#User u ON e.EvaluateeID=u.UserID
-- WHERE e.DistrictCode=@pDistrictCode
--   AND e.SchoolYear=@SchoolYear
--   AND e.EvaluationTypeID=@pEvaluationTypeID
 
--  SELECT @sql_error = @@ERROR
--		IF @sql_error <> 0
--			BEGIN
--				SELECT @sql_error_message = 'Problem inserting into SEEvidenceCollectionVisibility' 

--				GOTO ErrorHandler
--			END

--UPDATE e
--	   SET e.LastYearEvaluateePlanTypeID=e_prev.EvaluateePlanTypeID,
--	   	   e.LastYearFocusedFrameworkNodeShortName=fn_focus_prev.ShortName,
--		   e.LastYearFocusedSGFrameworkNodeShortName=fn_focus_sg_prev.ShortName,
--		   e.SuggestedEvaluateePlanTypeID=e_prev.NextYearEvaluateePlanTypeID,
--		   e.SuggestedFocusedFrameworkNodeShortName=fn_suggested_focus_prev.ShortName,
--		   e.SuggestedFocusedSGFrameworkNodeShortName=fn_suggested_focus_sg_prev.ShortName
--	  FROM dbo.SEEvaluation e
--	  JOIN dbo.#User u ON e.EvaluateeID=u.UserID
--	  JOIN dbo.SEEvaluation e_prev ON e.EvaluateeID=e_prev.EvaluateeID
--	  LEFT OUTER JOIN dbo.SEFrameworkNode fn_focus_prev on e_prev.FocusedFrameworkNodeID=fn_focus_prev.FrameworkNodeID
--	  LEFT OUTER JOIN dbo.SEFrameworkNode fn_focus_sg_prev on e_prev.FocusedSGFrameworkNodeID=fn_focus_sg_prev.FrameworkNodeID
--	  LEFT OUTER JOIN dbo.SEFrameworkNode fn_suggested_focus_prev on e_prev.NextYearFocusedFrameworkNodeID=fn_suggested_focus_prev.FrameworkNodeID
--	  LEFT OUTER JOIN dbo.SEFrameworkNode fn_suggested_focus_sg_prev on e_prev.NextYearFocusedSGFrameworkNodeID=fn_suggested_focus_sg_prev.FrameworkNodeID
--	 WHERE e.EvaluationTypeID=e_prev.EvaluationTypeID
--	   AND e.DistrictCode=e_prev.DistrictCode
--	   AND e.SchoolYear-1=e_prev.SchoolYear
--	   AND e.SchoolYear=@pSchoolYear
--	   AND e.DistrictCode=@pDistrictCode
--	   AND e.EvaluationTypeID=@pEvaluationTypeID

-- SELECT @EvalID=SCOPE_IDENTITY(), @sql_error = @@ERROR
--		IF @sql_error <> 0
--			BEGIN
--				SELECT @sql_error_message = 'Problem updating SEEvaluation' 

--				GOTO ErrorHandler
--			END
		

	-- set up default prompts

	INSERT dbo.StudentGrowthGoal(
		BundleId, 
		EvaluationID, 
		FrameworkNodeID, 
		ProcessRubricRowID, 
		ResultsRubricRowID,
		IsActive, 
		CreationDateTime, 
		Title)
	SELECT DISTINCT 
			gb.Id,
			e.Id,
			fn.Id,
			NULL,
			NULL,
			1,
			@theDate,
			fn.shortName
	  FROM dbo.StudentGrowthGoalBundle gb
	  JOIN dbo.Evaluation e ON e.Id=gb.EvaluationID
	  JOIN dbo.FrameworkContext fc on fc.DistrictCode = e.DistrictCode AND fc.SchoolYear = e.SchoolYear AND fc.EvaluationType = e.EvaluationType
	  JOIN dbo.Framework f on fc.StateFrameworkID=f.Id
	  JOIN dbo.FrameworkNode fn on f.Id=fn.FrameworkID
	 WHERE e.DistrictCode=@pDistrictCode
	   AND e.SchoolYear=@SchoolYear
	   AND e.EvaluationType=@pEvaluationType
	   AND fn.IsStudentGrowthAligned = 1
	   AND f.Id = fc.StateFrameworkID
	
	  SELECT @sql_error = @@ERROR
		IF @sql_error <> 0
			BEGIN
				SELECT @sql_error_message = 'Problem inserting into SEStudentGrowthGoal' 

				GOTO ErrorHandler
			END
						            
	UPDATE g
		SET ProcessRubricRowID=rr.Id
		FROM dbo.StudentGrowthGoal g
		JOIN dbo.FrameworkNode fn on g.FrameworkNodeID=fn.Id
		JOIN dbo.FrameworkNodeRubricRow rrfn on fn.Id=rrfn.FrameworkNodeID
		JOIN dbo.RubricRow rr on rrfn.RubricRowID=rr.Id
	WHERE rr.IsStudentGrowthAligned = 1 AND rr.ShortName LIKE ('%.1')
			
	UPDATE g
		SET ResultsRubricRowID=rr.Id
		FROM dbo.StudentGrowthGoal g
		JOIN dbo.FrameworkNode fn on g.FrameworkNodeID=fn.Id
		JOIN dbo.FrameworkNodeRubricRow rrfn on fn.Id=rrfn.FrameworkNodeID
		JOIN dbo.RubricRow rr on rrfn.RubricRowID=rr.Id
	WHERE rr.IsStudentGrowthAligned = 1 AND rr.ShortName NOT LIKE ('%.1')


--INSERT dbo.SEOtherEvidenceCollection(EvaluationID)
--SELECT e.EvaluationID
--  FROM dbo.SEEvaluation e
--  JOIN dbo.#User u ON e.EvaluateeID=u.UserID
-- WHERE e.DistrictCode=@pDistrictCode
--   AND e.SchoolYear=@SchoolYear
--   AND e.EvaluationTypeID=@pEvaluationTypeID
 
--  SELECT @sql_error = @@ERROR
--		IF @sql_error <> 0
--			BEGIN
--				SELECT @sql_error_message = 'Problem inserting into SEOtherEvidenceCollection' 

--				GOTO ErrorHandler
--			END

--INSERT dbo.SEEvidenceCollectionVisibility(EvidenceCollectionTypeID, EvidenceCollectionObjectID, EvaluationID, EvidenceOwnerID, EvidenceShared)
--SELECT 1, oe.OtherEvidenceCollectionID, e.EvaluationID, u.UserID, 1
--  FROM dbo.SEEvaluation e
--  JOIN dbo.SEOtherEvidenceCollection oe ON e.EvaluationID=oe.EvaluationID
--  JOIN dbo.#User u ON e.EvaluateeID=u.UserID
-- WHERE e.DistrictCode=@pDistrictCode
--   AND e.SchoolYear=@SchoolYear
--   AND e.EvaluationTypeID=@pEvaluationTypeID
 
--  SELECT @sql_error = @@ERROR
--		IF @sql_error <> 0
--			BEGIN
--				SELECT @sql_error_message = 'Problem inserting into SEEvidenceCollectionVisibility' 

--				GOTO ErrorHandler
--			END


-------------------
-- Handle errors --
-------------------
ErrorHandler:
IF (@sql_error <> 0)
   BEGIN
      ROLLBACK TRANSACTION
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


GO


