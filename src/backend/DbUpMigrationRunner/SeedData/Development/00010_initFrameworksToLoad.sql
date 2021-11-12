	
	CREATE TABLE [dbo].[ProtoFrameworkContextsToLoad](
	[FrameworkContextID] [bigint] NOT NULL,
	[DistrictCode] [varchar](20) NOT NULL,
	[nTeachers] [smallint] NOT NULL,
	[PlaceName] [varchar](200) NOT NULL
	) ON [PRIMARY]

/*	select * from frameworkcontextprototype
1	The AWSP Leadership Framework
2	Charlotte Danielson's Framework for Teaching (2011)
3	Charlotte Danielson's Framework for Teaching (2011)
4	Marzano?s Teacher Evaluation Model
5	CEL 5D+ Teacher Evaluation Rubric 3.0
6	Marzano School Leadership Evaluation Model
*/

	-- Teacher Frameworks
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(2, '10000', 'DAN', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(2, '17001', 'DAN SPS', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(3, '17001', 'DAN CT SPS', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(4, '30000', 'MAR TR', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(5, '20000', 'CEL TR', 4)

	-- extra for testing users in multiple districts
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(4, '50000', 'MAR TR 2', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(5, '40000', 'CEL TR 2', 4)

	-- Principal Frameworks
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(1, '10000', 'AWSP', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(1, '17001', 'AWSP', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(6, '30000', 'MAR PR', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(1, '20000', 'CEL PR', 4)

	-- extra for testing users in multiple districts
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(6, '50000', 'MAR PR 2', 4)
	insert ProtoFrameworkContextsToLoad(FrameworkContextID, DistrictCode, PlaceName, nTeachers) values(1, '40000', 'CEL PR 2', 4)