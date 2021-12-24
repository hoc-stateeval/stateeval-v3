
	declare @TRRoleID bigint, @PRRoleID bigint, @HEADPRRoleID bigint
	select @TRRoleID = Id from dbo.Role r where EDSName='SESchoolTeacher'
	select @PRRoleID = Id from dbo.Role r where EDSName='SESchoolPrincipal'
	select @HEADPRRoleID = Id from dbo.Role r where EDSName='SESchoolHeadPrincipal'

	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DA_TR', 1, 0, 0, 0, 0, 'Admin Teacher Evaluations',2, @TRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictAdmin'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DA_PR', 1, 0, 0, 0, 2, 'Admin Principal Evaluations',1, @PRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictAdmin'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DA_CT_SPS', 1, 0, 0, 0, 3, 'Admin Teacher Eval (CT)',4, @TRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictAdmin'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DTE', 0, 0, 1, 0, 4, 'Evaluate Teachers (DTE)',2, @TRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictWideTeacherEvaluator'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DE', 0, 0, 1, 0, 5, 'Evaluate Principals (District Evaluator)',1, @HEADPRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictEvaluator'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DV_PR_TR', 0, 0, 0, 0, 6, 'View Principal', 2, @TRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictViewer'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DV_DTE', 0, 0, 0, 0, 6, 'View DTE', 2, @TRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictViewer'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DV_PR_PR', 0, 0, 0, 0, 6, 'View Head Principal', 1, @PRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictViewer'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DV_DE_PR', 0, 0, 0, 0, 6, 'View District Evaluator', 1, @PRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictViewer'

	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DAM_TR', 0, 0, 0, 0, 7, 'District Assignment Manager (Teacher)', 2, @TRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictAssignmentManager'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'DAM_PR', 0, 0, 0, 0, 8, 'District Assignment Manager (Principal)', 1, @PRRoleID, r.Id from dbo.Role r where EDSName='SEDistrictAssignmentManager'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId)
	select 'PR_TR', 0, 0, 1, 0, 9, 'Evaluate Teachers',2, @TRRoleID, r.Id from dbo.Role r where EDSName='SESchoolPrincipal'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'PR_PR', 0, 0, 1, 0, 10, 'Evaluate Principals',1, @PRRoleID, r.Id from dbo.Role r where EDSName='SESchoolHeadPrincipal'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'TR_ME', 0, 0, 0, 1, 11, 'Prepare for My Evaluation (Teacher)',2, @TRRoleID, r.Id from dbo.Role r where EDSName='SESchoolTeacher'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'PR_ME', 0, 0, 0, 1, 12, 'Prepare for My Evaluation (Principal)', 1, @PRRoleID, r.Id from dbo.Role r where EDSName='SESchoolPrincipal'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'CT_SPS', 0, 0, 1, 0, 13, 'Evaluate Teachers (CT)',4, @TRRoleID, r.Id from dbo.Role r where EDSName='SESPSConsultingTeacher'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'SA_TR', 0, 1, 0, 0, 14, 'Admin Teacher Evaluations',2, @TRRoleID, r.Id from dbo.Role r where EDSName='SESchoolAdmin'
	insert WorkArea(TagName, IsDistrictAdmin, IsSchoolAdmin, IsEvaluator, IsEvaluatee, Priority, Title, EvaluationType, EvaluateeRoleId, RoleId) 
	select 'SA_PR', 0, 1, 0, 0, 15, 'Admin Principal Evaluations',1, @PRRoleID, r.Id from dbo.Role r where EDSName='SESchoolAdmin'
