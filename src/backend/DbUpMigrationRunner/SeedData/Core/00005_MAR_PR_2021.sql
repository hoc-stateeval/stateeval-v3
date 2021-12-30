
	DECLARE @StateFrameworkID BIGINT, @FrameworkNodeID BIGINT, @InstructionalFrameworkID BIGINT, @RubricRowID BIGINT
	DECLARE @INode BIGINT, @IINode BIGINT, @IIINode BIGINT, @IVNode BIGINT, @VNode BIGINT
	DECLARE @C1Node Bigint, @C2Node BIGINT, @C3Node BIGINT, @C4Node BIGINT, @C5Node BIGINT, @C6Node BIGINT, @C7Node BIGINT, @C8Node BIGINT
	DECLARE @EvaluateeRoleID BIGINT
	
	SELECT @EvaluateeRoleID = Id FROM [Role] WHERE EDSName='SESchoolPrincipal'

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('Marzano State', 2021, 'MAR-PR')
	SELECT @StateFrameworkID = SCOPE_IDENTITY()

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('Marzano Instructional', 2021, 'MAR-PR')
	SELECT @InstructionalFrameworkID = SCOPE_IDENTITY()

	INSERT FrameworkContextPrototype(FrameworkTagName, Name, EvaluateeRoleID, SchoolYear, EvaluationType, StateFrameworkID, InstructionalFrameworkID)
	values('MAR-PR', 'Marzano School Leadership Evaluation Model', @EvaluateeRoleID, 2021, 1, @StateFrameworkID, @InstructionalFrameworkID)


	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Creating a school culture that promotes the ongoing improvement of learning and teaching for students and staff.', 'C1', 1, 0, 2021, 'MAR-PR')
	select @C1Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Providing for school safety.', 'C2', 2, 0, 2021, 'MAR-PR')
	select @C2Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Leading development, implementation and evaluation of a data-driven plan for increasing student achievement, including the use of multiple student data elements.', 'C3', 3, 1, 2021, 'MAR-PR')
	select @C3Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Assisting instructional staff with alignment of curriculum, instruction and assessment with state and local district learning goals.', 'C4', 4, 0, 2021, 'MAR-PR')
	select @C4Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Monitoring, assisting and evaluating effective instruction and assessment practices.', 'C5', 5, 1, 2021, 'MAR-PR')
	select @C5Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Managing both staff and fiscal resources to support student achievement and legal responsibilities.', 'C6', 6, 0, 2021, 'MAR-PR')
	select @C6Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Partnering with the school community to promote student learning.', 'C7', 7, 0, 2021, 'MAR-PR')
	select @C7Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Demonstrating commitment to closing the achievement gap.', 'C8', 8, 1, 2021, 'MAR-PR')
	select @C8Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain I: A Data-Driven Focus on Student Achievement', 'I', 1, 0, 2021, 'MAR-PR')
	select @INode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain II: Continuous Improvement of Instruction', 'II', 2, 0, 2021, 'MAR-PR')
	select @IINode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain III: A Guaranteed and Viable Curriculum', 'III', 3, 0, 2021, 'MAR-PR')
	select @IIINode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain IV: Cooperation and Collaboration', 'IV', 4, 0, 2021, 'MAR-PR')
	select @IVNode = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain V: School Climate', 'V', 5, 0, 2021, 'MAR-PR')
	select @VNode = SCOPE_IDENTITY()

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures clear and measureable goals are established and focused on critical needs regarding improving overall student achievement at the school level.', '', 'The school leader attempts to ensure clear, measurable goals with specific timelines focused on critical needs regarding improving student achievement are established at the school level but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures clear, measurable goals with specific timelines focused on critical needs regarding improving student achievement are established at the school level.', 'The school leader ensures clear, measurable goals with specific timelines focused on critical needs regarding improving student achievement are established at the school level AND regularly monitors that everyone has understanding of the goals.', 'The school leader ensures adjustments are made or new methods are utilized so that all stakeholders sufficiently understand the goals.', 0,'I (1)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @INode, 1)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures clear and measureable goals are established and focused on critical needs regarding improving achievement of individual students within the school.', '', 'The school leader attempts to ensure that written achievement goals that are clear, measureable, and focused, are established for each student, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures each student has written achievement goals that are clear, measurable and focused on appropriate needs.', 'The school leader ensures each student has written achievement goals that are clear, measurable, and focused on appropriate needs AND regularly monitors teachers’ and their students’ understanding of individual student goals.', 'The school leader ensures adjustments are made or new methods are utilized so that all faculty and students sufficiently understand the goals.', 0,'I (2)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @INode, 2)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that data are analyzed, interpreted, and used to regularly monitor progress toward school achievement goals.', '', 'The school leader attempts to ensure that data are available for tracking overall student achievement, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader regularly ensures that data are available for tracking overall student achievement.', 'The school leader ensures that data are available for tracking overall student achievement AND monitors the extent to which student data are used to track progress toward goal.', 'The school leader ensures that data are analyzed in a variety of ways to provide the most useful information and refines achievement goals or the tracking process as achievement data accrue.', 0,'I (3)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @INode, 3)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 1)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that data are analyzed, interpreted, and used to regularly monitor progress toward achievement goals for individual students.', '', 'The school leader attempts to ensure that data are available for individual student achievement, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that data are available for individual student achievement.', 'The school leader ensures that data are available for individual student achievement AND monitors the extent to which data are used to t rack progress toward individual student goals.', 'The school leader ensures that data are analyzed in a variety of ways to provide the most useful information and refines individual achievement goals or the tracking process as achievement data accrue.', 0,'I (4)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @INode, 4)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that appropriate school-level and classroom-level programs and practices are in place to help all students meet individual achievement goals when data indicate interventions are needed.', '', 'The school leader attempts to ensure that programs and practices are in place for individual students who are not making adequate progress, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that programs and practices are in place for individual students who are not making adequate progress.', 'The school leader ensures that programs and practices are in place for individual students who are not making adequate progress AND monitors whether students are successfully completing those programs.', 'The school leader continually examines and expands the options for individual students to make adequate progress.', 0,'I (5)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @INode, 5)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 3)


	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader provides a clear vision as to how instruction should be addressed in the school.', '', 'The school leader attempts to ensure that a school-wide language or model of instruction is in place, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that a school-wide language or model of instruction is in place.', 'The school leader ensures that a school-wide language or model of instruction is in place AND monitors the extent to which the faculty and staff understands the instructional model.', 'The school leader continually examines and makes adjustments so that all faculty and staff understand the nuances of the instructional model and integrates new instructional initiatives into the school instructional model.', 0,'II (1)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IINode, 1)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader effectively supports and retains teachers who continually enhance their pedagogical skills through reflection and professional growth plans.', '', 'The school leader attempts to ensure that teachers establish growth goals regarding their pedagogical skills and track their individual progress, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that teachers establish growth goals regarding their pedagogical skills and track their individual progress.', 'The school leader ensures that teachers establish growth goals regarding their pedagogical skills and track their individual progress, AND monitors the extent to which teachers achieve their growth goals.', 'The school leader regularly intervenes with and supports teachers who are not meeting their growth goals or adequately enhancing the achievement of their students.', 0,'II (2)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IINode, 2)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader is aware of predominant instructional practices throughout the school.', '', 'The school leader attempts to ensure that information about predominant instructional strategies in the school is collected and regularly interacts with teachers about the effectiveness of these strategies, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that information about predominant instructional strategies in the school is collected and regularly interacts with teachers about the effectiveness of these strategies.', 'The school leader ensures that information about predominant instructional strategies in the school is collected, regularly interacts with teachers about the effectiveness of these strategies, AND monitors the extent to which the information is used to identify effective and ineffective practices.', 'The school leader regularly intervenes to ensure that ineffective instructional practices are corrected and effective instructional practices are proliferating.', 0,'II (3)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IINode, 3)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that teachers are provided with clear, ongoing evaluations of their pedagogical strengths and weaknesses that are based on multiple sources of data and are consistent with student achievement data.', '', 'The school leader attempts to ensure that specific evaluation data are collected on each teacher regarding their pedagogical strengths and weaknesses and that these data are gathered from multiple sources, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that specific evaluation data are collected on each teacher regarding their pedagogical strengths and weaknesses and that these data are gathered from multiple sources.', 'The school leader ensures that specific evaluation data are collected on each teacher regarding their pedagogical strengths and weaknesses and that these data are gathered from multiple sources AND monitors the extent to which teacher evaluations are consistent with student achievement data.', 'The school leader ensures that teacher evaluation processes are updated regularly to ensure the results are consistent with student achievement data.', 0,'II (4)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IINode, 4)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 3)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that teachers are provided with job-embedded professional development that is directly related to their instructional growth goals.', '', 'The school leader attempts to ensure that job-embedded professional development is provided to teachers that is directly related to their instructional growth goals, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that job-embedded professional development that is directly related to their instructional growth goals is provided to teachers.', 'The school leader ensures that job-embedded professional development is provided to teachers that is directly related to their instructional growth goals AND monitors the extent to which teachers improve their instructional practices.', 'The school leader continually re-evaluates the professional development program to ensure that it remains job-embedded and focused on instructional growth goals and intervenes with teachers who are not making sufficient progress toward achieving growth goals.', 0,'II (5)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IINode, 5)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 1)


	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that the school curriculum and accompanying assessments adhere to state and district standards.', '', 'The school leader attempts to ensure that both the written curriculum and accompanying assessments adhere to state and district standards, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that both the written curriculum and accompanying assessments adhere to state and district standards.', 'The school leader ensures that both the written curriculum and accompanying assessments adhere to state and district standards AND monitors the extent to which the curriculum is delivered and the assessments properly administered.', 'The school leader ensures that the assessment and reporting system focuses on state and district standards and the leader intervenes with teachers who do not follow the state and district standards.', 0,'III (1)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IIINode, 1)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 1)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that the school curriculum is focused enough that it can be adequately addressed in the time available to teachers.', '', 'The school leader attempts to ensure that the written curriculum has been unpacked in such a manner that essential elements have been identified, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that the written curriculum has been unpacked in such a manner that essential elements have been identified.', 'The school leader ensures that the written curriculum has been unpacked in such a manner that essential elements have been identified AND monitors the extent to which the essential elements are few enough to allow adequate time for students to learn them.', 'The school leader ensures that essential elements of the curriculum are regularly examined and revised with an eye toward making instruction more focused and efficient.', 0,'III (2)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IIINode, 2)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that all students have the opportunity to learn the critical content of the curriculum.', '', 'The school leader attempts to ensure that all students have access to the courses and classes that directly address the essential elements of the curriculum, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that all students have access to the courses and classes that directly address the essential elements of the curriculum.', 'The school leader ensures that all students have access to the courses and classes that directly address the essential elements of the curriculum AND monitors the extent to which those courses and classes utilize instructional strategies that most strongly increase their chances of learning the essential elements.', 'The school leader intervenes with teachers whose students do not have adequate access to essential elements and instructional strategies that most strongly increase their chances of learning the essential elements.', 0,'III (3)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IIINode, 3)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 3)


	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that teachers have opportunities to observe and discuss effective teaching.', '', 'The school leader attempts to ensure that teachers have regular opportunities to interact regarding effective instructional practices and observe specific examples of effective teaching virtually or in-person, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that teachers have regular opportunities to interact regarding effective instructional practices and observe specific examples of effective teaching virtually or in-person.', 'The school leader ensures that teachers have regular opportunities to interact regarding effective instructional practices and observe specific examples of effective teaching virtually or in-person AND monitors the extent to which teachers actively participate in those opportunities.', 'The school leader intervenes and supports teachers who do not actively participate in opportunities to interact regarding effective instructional practices.', 0,'IV (1)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IVNode, 1)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 4)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that teachers have formal roles in the decision-making process regarding school initiatives.', '', 'The school leader attempts to ensure that formal processes are in place to collect data from all teachers regarding their preferences on specific decisions, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'For specific types of decisions, the school leader ensures that formal processes are in place to collect data from all teachers regarding their preferences.', 'For specific types of decisions, the school leader ensures that formal processes are in place to collect data from all teachers regarding their preferences AND monitors the extent to which those data are used to make decisions and the transparency of those decisions.', 'The school leader continually seeks new venues for teacher input regarding important decisions.', 0,'IV (2)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IVNode, 2)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that teacher teams and collaborative groups regularly interact to address common issues regarding curriculum, assessment, instruction, and the achievement of all students.', '', 'The school leader attempts to ensure that formal teams or collaborative groups of teachers and other relevant staff meet regularly and have specific goals relative to curriculum, assessment, and instruction, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that formal teams or collaborative groups of teachers and other relevant staff meet regularly and have specific goals relative to curriculum, assessment, and instruction.', 'The school leader ensures that formal teams or collaborative groups of teachers and other relevant staff meet regularly and have specific goals relative to curriculum, assessment, and instruction AND monitors the extent to which these goals are designed to enhance the achievement of all students.', 'The school leader ensures that group goals relative to curriculum, assessment, and instruction are regularly revised to reflect the changes in student achievement data and intervenes and supports teacher teams whose goals do not adequately address the achievement of all students.', 0,'IV (3)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IVNode, 3)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 4)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that teachers and staff have formal ways to provide input regarding the optimal functioning of the school and delegates responsibilities appropriately.', '', 'The school leader attempts to ensure that input is regularly collected from teachers and staff and appropriately delegates responsibilities, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that input is regularly collected from teachers and staff and appropriately delegates responsibilities.', 'The school leader ensures that input is regularly collected from teachers and staff, appropriately delegates responsibilities, AND monitors the extent to which the inputs and delegations are contributing to the optimal function of the school.', 'The school leader intervenes and provides support when delegation of authority and teacher input is not working to optimize the function of the school.', 0,'IV (4)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IVNode, 4)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that students, parents, and community have formal ways to provide input regarding the optimal functioning of the school.', '', 'The school leader attempts to ensure that input is regularly collected from students, parents, and community, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that input is regularly collected from students, parents, and community.', 'The school leader ensures that input is regularly collected from students, parents, and community AND monitors the extent to which the inputs are contributing to the optimal function of the school.', 'The school leader intervenes and provides support when students, parents, and community input is not working to optimize the function of the school.', 0,'IV (5)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @IVNode, 5)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 1)



	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school administrator is recognized as the leader of the school who continually improves his or her professional practice.', '', 'The school leader attempts to engage in activities to improve his or her professional practices, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader continually engages in activities to improve his or her professional practices.', 'The school leader continually engages in activities to improve his or her professional practices AND monitors the extent to which these activities enhance personal leadership skills and the staff’s confidence about his or her ability to lead.', 'The school leader actively seeks expertise/mentors for validation and feedback to confirm or improve leadership skills.', 0,'V (1)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @VNode, 1)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader has the trust of the faculty and staff that his or her actions are guided by what is best for all student populations.', '', 'The school leader attempts to perform with integrity and the best interest of all students, but does so sporadically or inconsistently OR the school leader does not attempt to do so.', 'The school leader performs with integrity and the best interest of all students.', 'The school leader performs with integrity and the best interest of all students AND monitors the extent to which faculty and staff perceive him or her as an individual who will follow through with initiatives and whose actions are guided by the desire to help all students learn.', 'The school leader actively seeks expertise/mentors for validation and feedback to confirm or improve how he or she performs or is perceived.', 0,'V (2)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @VNode, 2)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 5)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that faculty and staff perceive the school environment as safe and orderly.', '', 'The school leader attempts to ensure that well-defined routines and procedures are in place that lead to orderly conduct, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader ensures that well-defined routines and procedures are in place that lead to orderly conduct.', 'The school leader ensures that well-defined routines and procedures are in place that lead to safe and orderly conduct AND monitors the extent to which faculty and staff share the perception that the school environment is safe and orderly.', 'The school leader ensures that rules and procedures are reviewed and updated as necessary to ensure a safe and orderly school environment and the perception of such by school faculty and staff.', 0,'V (3)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @VNode, 3)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader ensures that students, parents, and the community perceive the school environment as safe and orderly.', '', 'The school leader ensures that rules and procedures are reviewed and updated as necessary to ensure a safe and orderly school environment and the perception of such by students, parents, and the community.', 'The school leader ensures that well-defined routines and procedures are in place that lead to orderly conduct.', 'The school leader ensures that well-defined routines and procedures are in place that lead to orderly conduct AND monitors the extent to which students, parents, and the community share the perception that the school environment is safe and orderly.', 'The school leader ensures that rules and procedures are reviewed and updated as necessary to ensure a safe and orderly school environment and the perception of such by students, parents, and the community.', 0,'V (4)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @VNode, 4)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader manages the fiscal, operational, and technological resources of the school in a way that focuses on effective instruction and the achievement of all students.', '', 'The school leader attempts to manage the fiscal, operational, and technological resources necessary to support effective teaching, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader manages the fiscal, operational, and technological resources necessary to support effective teaching.', 'The school leader manages the fiscal, operational, and technological resources necessary to support effective teaching AND monitors the extent to which the resources and efficiencies enhance instruction and the achievement of all students.', 'The school leader actively seeks and procures extra resources to enhance instruction and the achievement of all students.', 0,'V (5)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @VNode, 5)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('The school leader acknowledges the success of the whole school, as well as individuals within the school.', '', 'The school leader attempts to acknowledge and celebrate the accomplishments of the school as a whole and the accomplishments of individuals within the school, but does not complete the task or does so partially OR the school leader does not attempt to do so.', 'The school leader at the appropriate time acknowledges and celebrates the accomplishments of the school as a whole and the accomplishments of individuals within the school.', 'The school leader at the appropriate time acknowledges and celebrates the accomplishments of the school as a whole and the accomplishments of individuals within the school AND monitors the extent to which people feel honored for their contributions.', 'The school leader actively seeks a variety of methods for acknowledging individual and school-wide success that meet the unique needs of faculty and staff.', 0,'V (6)', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @VNode, 6)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 6)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides evidence of student growth that results from the school improvement planning process', '', 
	'School improvement planning process results in no improvement in student academic growth', 
	'School improvement planning process results in minimal improvement in student academic growth', 
	'School improvement planning process results in measurable improvement in student academic growth', 
	'School improvement planning process results in significant improvement in student academic growth', 
	1, 'SG 3', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides evidence of student growth of selected teachers', '', 
	'Multiple measures of student achievement of selected teachers show no academic growth', 
	'Multiple measures of student achievement of selected teachers show minimal academic growth', 
	'Multiple measures of student achievement of selected teachers show measurable academic growth', 
	'Multiple measures of student achievement of selected teachers show significant academic growth', 
	1, 'SG 5', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides evidence of growth in student learning', '', 
	'Achievement data from multiple sources or data points show no evidence of student growth toward the district’s learning goals; there are growing achievement gaps between student subgroups', 
	'Achievement data from multiple sources or data points shows minimum evidence of student growth toward the district’s learning goals for identified subgroups of students', 
	'Achievement data from multiple sources or data points show evidence of improving student growth toward the district’s learning goals; the average achievement of the student population improved as does the achievement of each subgroup of students identified as needing improvement', 
	'Achievement data from multiple sources or data points show evidence of consistent growth toward the district’s learning goals; there is consistent record of improved student achievement, on multiple indicators, with identified subgroups of students', 
	1, 'SG 8', 2021, 'MAR-PR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 10)


