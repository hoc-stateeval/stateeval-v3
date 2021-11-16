declare @nextBuildingId BIGINT, @BuildingId BIGINT
declare @nextTeacherId BIGINT, @teacherId BIGINT
declare @BaseName VARCHAR(100)
declare @SchoolName VARCHAR(200)
DECLARE @TeacherRoleId BIGINT 
declare @userId BIGINT
declare @nextPrincipalId BIGINT, @principalId BIGINT
DECLARE @PrincipalRoleId BIGINT
DECLARE @HeadPrincipalRoleId BIGINT
DECLARE @SchoolAdminRoleId BIGINT
DECLARE @DistrictName VARCHAR(50)  
declare @RoleName VARCHAR(100)
declare @nextRoleId BIGINT
declare @roleId BIGINT

--drop table #teacher
--drop table #principal
--drop table #role
--drop table #cmd

SELECT  @TeacherRoleId = Id FROM [Role] WHERE   EDSName = 'SESchoolTeacher'; 
SELECT  @PrincipalRoleId = Id FROM [Role] WHERE   EDSName = 'SESchoolPrincipal';  
SELECT  @HeadPrincipalRoleId = Id FROM [Role] WHERE   EDSName = 'SESchoolHeadPrincipal';  
SELECT  @SchoolAdminRoleId = Id FROM [Role] WHERE   EDSName = 'SESchoolAdmin';  


CREATE TABLE #teacher(Id BIGINT IDENTITY(1,1), BaseName VARCHAR(20))
INSERT #teacher(BaseName) VALUES ('Teacher A')
INSERT #teacher(BaseName) VALUES ('Teacher B')
INSERT #teacher(BaseName) VALUES ('Teacher C')
INSERT #teacher(BaseName) VALUES ('Teacher D')

SELECT @nextBuildingId = min( id ) FROM [Building] WHERE IsSchool=1
WHILE @nextBuildingId is not null
BEGIN
    SELECT @BuildingId=Id, @SchoolName=SchoolName FROM [Building] l WHERE Id = @nextBuildingId
    SELECT @nextBuildingId = min( id ) FROM [Building] WHERE Id > @BuildingId

	SELECT @nextTeacherId = min( id ) FROM #teacher
	WHILE @nextTeacherId is not null
	BEGIN
		SELECT @teacherId=Id, @BaseName=BaseName FROM #teacher t WHERE Id = @nextTeacherId
		SELECT @nextTeacherId = min( id ) FROM #teacher WHERE Id > @teacherId

		INSERT [User](UserName, FirstName, LastName, OTPW, LoginName, EmailAddress, ProfileImageUrl) 
		SELECT  @BaseName + ' ' + @SchoolName, @BaseName , @SchoolName ,'password', 'noop@noop.com', 'noop@noop.com', ''
		INSERT UserBuildingRole(UserId, RoleId, BuildingId)
		SELECT @@IDENTITY, @TeacherRoleId, @BuildingId
	end
end


CREATE TABLE #principal(Id BIGINT IDENTITY(1,1), BaseName VARCHAR(20))
INSERT #principal(BaseName) VALUES ('Principal A')
INSERT #principal(BaseName) VALUES ('Principal B')

SELECT @nextBuildingId = min( id ) FROM [Building] WHERE IsSchool=1
WHILE @nextBuildingId is not null
BEGIN
    SELECT @BuildingId=Id, @SchoolName=SchoolName FROM [Building] l WHERE Id = @nextBuildingId
    SELECT @nextBuildingId = min( id ) FROM [Building] WHERE Id > @BuildingId

	SELECT @nextPrincipalId = min( id ) FROM #principal
	WHILE @nextPrincipalId is not null
	BEGIN
		SELECT @principalId=Id, @BaseName=BaseName FROM #principal t WHERE Id = @nextPrincipalId
		SELECT @nextPrincipalId = min( id ) FROM #principal WHERE Id > @principalId

		INSERT [User](UserName, FirstName, LastName, OTPW, LoginName, EmailAddress, ProfileImageUrl) 
		SELECT  @BaseName + ' ' + @SchoolName,@BaseName ,@SchoolName ,'','noop@noop.com', 'noop@noop.com' , ''
		SELECT @userId = @@IDENTITY
		INSERT UserBuildingRole(UserId, RoleId, BuildingId)
		SELECT @userId, @PrincipalRoleId, @BuildingId

		IF (@nextPrincipalId is null) BEGIN
			-- make the last principal also head principal and school admin
			INSERT UserBuildingRole(UserId, RoleId, BuildingId)
			SELECT @userId, @HeadPrincipalRoleId, @BuildingId

			INSERT UserBuildingRole(UserId, RoleId, BuildingId)
			SELECT @userId, @SchoolAdminRoleId, @BuildingId

			-- add one school admin with no other role
			INSERT [User](UserName, FirstName, LastName, OTPW, LoginName, EmailAddress, ProfileImageUrl) 
			SELECT  'School Admin' + ' ' + @SchoolName,'School Admin' ,@SchoolName ,'','noop@noop.com', 'noop@noop.com' , ''
			SELECT @userId = @@IDENTITY
			INSERT UserBuildingRole(UserId, RoleId, BuildingId)
			SELECT @userId, @SchoolAdminRoleId, @BuildingId
		end
	end
end

CREATE TABLE #role(Id BIGINT IDENTITY(1,1), RoleName VARCHAR(50))
INSERT #role(RoleName) VALUES ('District Admin')
INSERT #role(RoleName) VALUES ('District Viewer')
INSERT #role(RoleName) VALUES ('District Assignment Manager')
INSERT #role(RoleName) VALUES ('District Evaluator')
INSERT #role(RoleName) VALUES ('District-wide Teacher Evaluator')

SELECT @nextBuildingId = min( id ) FROM [Building] WHERE IsSchool=0
WHILE @nextBuildingId is not null
BEGIN
    SELECT @BuildingId=Id, @DistrictName=DistrictName FROM [Building] l WHERE Id = @nextBuildingId
    SELECT @nextBuildingId = min( id ) FROM [Building] WHERE Id > @BuildingId AND IsSchool=0

	SELECT @nextRoleId = min( id ) FROM #role
	WHILE @nextRoleId is not null
	BEGIN
		SELECT @roleId=Id, @RoleName=RoleName FROM #role r WHERE Id = @nextRoleId
		SELECT @nextRoleId = min( id ) FROM #role WHERE Id > @roleId

		INSERT [User](UserName, FirstName, LastName, OTPW, LoginName, EmailAddress, ProfileImageUrl) 
		SELECT  @RoleName + ' ' + @DistrictName,@RoleName ,@DistrictName ,'', 'noop@noop.com', 'noop@noop.com', ''
		INSERT UserBuildingRole(UserId, RoleId, BuildingId)
		SELECT @@IDENTITY, (Select Id From [Role] WHERE DisplayName=@RoleName), @BuildingId
	end
end

-- drop table #cmd
-- SELECT * FROM #cmd
-- delete #cmd WHERE id < 9
CREATE TABLE #cmd(
    sqlcmd VARCHAR(2000) ,
    id BIGINT IDENTITY(1, 1)
);

INSERT #cmd(sqlcmd)
SELECT  'exec dbo.loadframeworkcontext ' + '@pDistrictCode = '''
        + DistrictCode + ''',@pFrameworkContextPrototypeID = '
        + CONVERT(VARCHAR(10), FrameworkContextID)
 FROM    ProtoFrameworkContextsToLoad


DECLARE @idx BIGINT ,
    @cmd VARCHAR(2000);
SELECT  @idx = MIN(id)
FROM    #cmd;
WHILE @idx IS NOT NULL
    BEGIN
        SELECT  @cmd = sqlcmd
        FROM    #cmd
        WHERE   id = @idx;
        EXEC (@cmd);
        SELECT  @idx = MIN(id)
        FROM    #cmd
        WHERE   id > @idx;
    END;

-- consulting teacher for seattle
select @userId= Id from [User] where firstname='Principal A' and lastname='DAN SPS SD School 2'
select @BuildingId = Id from [Building] where SchoolName='DAN SPS SD School 2' and IsSchool=1
select @roleId = Id from [Role] where displayName='Consulting Teacher'
INSERT UserBuildingRole(UserId, RoleId, BuildingId) VALUES(@userId, @roleId, @BuildingId)


-- create some special cases so that we have users in more than one district for testing

-- da in two districts with different frameworks
SELECT @userId = Id from [User] where firstname='District Admin' and lastname='MAR 2 SD'
select @roleId = Id from [Role] where displayName='District Admin'
select @BuildingId = Id from [Building] where DistrictName='CEL 2 SD' and IsSchool=0
INSERT UserBuildingRole(UserId, RoleId, BuildingId) VALUES(@userId, @roleId, @BuildingId)

-- teacher in two districts
select @userId = Id from [User] where firstname='Teacher B' and lastname='MAR 2 SD School 2'
select @BuildingId = Id from [Building] where SchoolName='CEL 2 SD School 2' and IsSchool=1
select @roleId = Id from [Role] where displayName='Teacher'
INSERT UserBuildingRole(UserId, RoleId, BuildingId) VALUES(@userId, @roleId, @BuildingId)

-- principal in two schools
select @userId= Id from [User] where firstname='Principal B' and lastname='MAR 2 SD School 2'
select @BuildingId = Id from [Building] where SchoolName='CEL 2 SD School 2' and IsSchool=1
select @roleId = Id from [Role] where displayName='Principal'
INSERT UserBuildingRole(UserId, RoleId, BuildingId) VALUES(@userId, @roleId, @BuildingId)


/*
	SELECT fc.id, fc.evaluationType, fc.name,
			u.id, u.firstname, u.lastname,
			l.id, l.districtName, l.schoolName,
			wa.tagName
	FROM [User] u
	join UserBuildingRole ulr on u.id=ulr.UserId
	join [Building] l on ulr.BuildingId=l.id
	join WorkArea wa on ulr.RoleId=wa.RoleId
	join FrameworkContext fc on fc.districtCode=l.districtCode 
   WHERE fc.EvaluationType=wa.EvaluationType
    order by tagname
*/

UPDATE  Evaluation
SET     EvaluateePlanType = 1;

	/*************************************************************/
	
	--assign evaluatees to evaluators...
	-- all teachers get principals as evaluators
    UPDATE  Evaluation
    SET     EvaluatorID = torULR.UserId

    FROM    Evaluation se
            JOIN [User] teeU ON teeU.Id = se.EvaluateeID
            JOIN UserBuildingRole teeULR ON teeULR.UserId = se.EvaluateeID
			JOIN [Role] teeR ON teeULR.RoleID=teeR.Id
			JOIN [Building] teeL on teeULR.BuildingId=teeL.Id
            JOIN UserBuildingRole torULR ON torULR.BuildingId = teeULR.BuildingId
			JOIN [Building] torL on torULR.BuildingId=torL.Id
            JOIN dbo.[User] torU ON torU.Id = torULR.UserId
    WHERE   teeR.EDSName = 'SESchoolTeacher'
            AND torU.Firstname = 'Principal A'
			AND torL.SchoolCode=teeL.SchoolCode

	--all principals get head principals as evaluators
	-- note the hack here; even head principals get themselves as evaluators;
	-- we rely on the last step to correct this
    UPDATE  Evaluation
    SET     EvaluatorID = torULR.UserId

	FROM    Evaluation se
        JOIN [User] teeU ON teeU.Id = se.EvaluateeID
        JOIN UserBuildingRole teeULR ON teeULR.UserId = se.EvaluateeID
		JOIN [Role] teeR ON teeULR.RoleID=teeR.Id
		JOIN [Building] teeL on teeULR.BuildingId=teeL.Id
        JOIN UserBuildingRole torULR ON torULR.BuildingId = teeULR.BuildingId
		JOIN [Building] torL on torULR.BuildingId=torL.Id
		JOIN [User] torU on torULR.UserId=torU.Id
		JOIN [Role] torR ON torULR.RoleID=torR.Id
	WHERE   teeR.EDSName = 'SESchoolPrincipal'
        AND torR.EDSName = 'SESchoolHeadPrincipal'
		AND torU.FirstName not like '%Head%' 
		AND torL.SchoolCode=teeL.SchoolCode



	-- all head principals get evaluated by the district evaluator
    UPDATE  Evaluation
    SET     EvaluatorID = torULR.UserId

	FROM    Evaluation se
        JOIN [User] teeU ON teeU.Id = se.EvaluateeID
        JOIN UserBuildingRole teeULR ON teeULR.UserId = se.EvaluateeID
		JOIN [Role] teeR ON teeULR.RoleID=teeR.Id
		JOIN [Building] teeL on teeULR.BuildingId=teeL.Id
		JOIN [Building] torL on torL.DistrictCode=teeL.DistrictCode
        JOIN UserBuildingRole torULR ON torULR.BuildingId = torL.Id
		JOIN [User] torU on torULR.UserId=torU.Id
		JOIN [Role] torR ON torULR.RoleID=torR.Id
	WHERE   teeR.EDSName = 'SESchoolHeadPrincipal'
        AND torR.EDSName = 'SEDistrictEvaluator'
		AND torL.DistrictCode=teeL.DistrictCode
		and teeL.IsSchool=1
		and torL.IsSchool=0



	INSERT WorkAreaContext(FrameworkContextId, UserId, BuildingId, WorkAreaId)
	SELECT fc.id,
			u.id,
			l.id,
			wa.id
	FROM [User] u
	join UserBuildingRole ulr on u.id=ulr.UserId
	join [Building] l on ulr.BuildingId=l.id
	join WorkArea wa on ulr.RoleId=wa.RoleId
	join FrameworkContext fc on fc.districtCode=l.districtCode 
   WHERE fc.EvaluationType=wa.EvaluationType

-- select u.firstname, u.lastname, wa.tagname, r.displayname, fc.districtcode from workareacontext wac
--   join workarea wa on wac.WorkAreaId=wa.id
--   join frameworkcontext fc on wac.FrameworkContextId=fc.id
--   join [role] r on wa.roleId=r.id
--   join [User] u on wac.UserId=u.id

--select l.DistrictName, l.SchoolName, r.DisplayName from UserBuildingRole ulr
--  join [User] u on ulr.UserId=u.id
--  join [Building] l on ulr.BuildingId=l.id
--  join [role] r on ulr.roleid=r.id
--  where u.firstname='district admin' and u.lastname = 'Conway/Othello SD'


