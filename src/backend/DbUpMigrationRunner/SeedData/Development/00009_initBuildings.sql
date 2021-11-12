-- extracted from the stateeval_proto.dbo.CdS_Latest

--districts
--select 
--	'insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values(' +
--	'''' + CONVERT(VARCHAR,DistrictSchoolName) + '''' + ',' +
--	'''' + CONVERT(VARCHAR,DistrictCode) + '''' + ',' +	
--	'''' + '' + '''' + ',' +
--	'''' + '' + '''' + ',' +
--	'0' + 
--	')', * from stateeval_proto.dbo.CdS_Latest 
--	where DistrictCode in ('01147', '34003', '29317', '21302') 
--	  and SchoolCode=''

insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('DAN SD','10000','','',0)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('CEL SD','20000','','',0)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('MAR SD','30000','','',0)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('DAN SPS SD','17001','','',0)

insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('CEL 2 SD','40000','','',0)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('MAR 2 SD','50000','','',0)

--schools
--select 
--	'insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values(' +
--	'''' + CONVERT(VARCHAR,district.DistrictSchoolName) + '''' + ',' +
--	'''' + CONVERT(VARCHAR,district.DistrictCode) + '''' + ',' +	
--	'''' + CONVERT(VARCHAR,school.DistrictSchoolName) + '''' + ',' +
--	'''' + CONVERT(VARCHAR,school.SchoolCode) + '''' + ',' +	
--	'1' + 
--	')', * from stateeval_proto.dbo.CdS_Latest school
--	       join stateeval_proto.dbo.CdS_Latest district on school.districtCode=district.districtCode
--	where DistrictCode in ('01147', '34003', '29317', '21302') 
--	  and school.SchoolCode<>'' 
--	  and district.schoolCode=''
--	  and school.SchoolCode<>'0001'

insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('DAN SD','10000','DAN SD School 1','10001',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('DAN SD','10000','DAN SD School 2','10002',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('CEL SD','20000','CEL SD School 1','20001',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('CEL SD','20000','CEL SD School 2','20002',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('MAR SD','30000','MAR SD School 1','30001',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('MAR SD','30000','MAR SD School 2','30002',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('DAN SPS SD','17001','DAN SPS SD School 1','17001',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('DAN SPS SD','17001','DAN SPS SD School 2','17002',1)

insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('CEL 2 SD','40000','CEL 2 SD School 1','40001',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('CEL 2 SD','40000','CEL 2 SD School 2','40002',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('MAR 2 SD','50000','MAR 2 SD School 1','50001',1)
insert dbo.[building](DistrictName, DistrictCode, SchoolName, SchoolCode, IsSchool) values('MAR 2 SD','50000','MAR 2 SD School 2','50002',1)
