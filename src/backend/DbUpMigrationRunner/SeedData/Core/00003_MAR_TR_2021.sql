

	DECLARE @StateFrameworkID BIGINT, @FrameworkNodeID BIGINT, @InstructionalFrameworkID BIGINT, @RubricRowID BIGINT
	DECLARE @D1RNode BIGINT, @D1CNode BIGINT, @D1ENode BIGINT, @D2Node BIGINT, @D3Node BIGINT, @D4Node BIGINT
	DECLARE @C1Node Bigint, @C2Node BIGINT, @C3Node BIGINT, @C4Node BIGINT, @C5Node BIGINT, @C6Node BIGINT, @C7Node BIGINT, @C8Node BIGINT

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('Marzano State', 2021, 'MAR-TR')
	SELECT @StateFrameworkID = SCOPE_IDENTITY()

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('Marzano Instructional', 2021, 'MAR-TR')
	SELECT @InstructionalFrameworkID = SCOPE_IDENTITY()

	INSERT FrameworkContextPrototype(FrameworkTagName, Name, SchoolYear, EvaluationType, StateFrameworkID, InstructionalFrameworkID)
	values('MAR-TR', 'Marzano''s Teacher Evaluation Model', 2021, 2, @StateFrameworkID, @InstructionalFrameworkID)


	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Centering instruction on high expectations for student achievement.', 'C1', 1, 0, 2021, 'MAR-TR')
	select @C1Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Demonstrating effective teaching practices.', 'C2', 2, 0, 2021, 'MAR-TR')
	select @C2Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Recognizing individual student learning needs and developing strategies to address those needs.', 'C3', 3, 1, 2021, 'MAR-TR')
	select @C3Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Providing clear and intentional focus on subject matter content and curriculum.', 'C4', 4, 0, 2021, 'MAR-TR')
	select @C4Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Fostering and managing a safe, positive learning environment.', 'C5', 5, 0, 2021, 'MAR-TR')
	select @C5Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Using multiple student data elements to modify instruction and improve student learning.', 'C6', 6, 1, 2021, 'MAR-TR')
	select @C6Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Communicating and collaborating with parents and the school community.', 'C7', 7, 0, 2021, 'MAR-TR')
	select @C7Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Exhibiting collaborative and collegial practices focused on improving instructional practice and student learning.', 'C8', 8, 1, 2021, 'MAR-TR')
	select @C8Node=SCOPE_IDENTITY()


	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain 1: Routine', 'D1-R', 1, 0, 2021, 'MAR-TR')
	select @D1RNode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain 1: Content', 'D1-C', 2, 0, 2021, 'MAR-TR')
	select @D1CNode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain 1: Enacted on the Spot', 'D1-E', 3, 0, 2021, 'MAR-TR')
	select @D1ENode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain 2: Planning and Preparing', 'D2', 4, 0, 2021, 'MAR-TR')
	select @D2Node = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain 3: Reflecting on Teaching', 'D3', 5, 0, 2021, 'MAR-TR')
	select @D3Node = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Domain 4: Collegiality and Professionalism', 'D4', 6, 0, 2021, 'MAR-TR')
	select @D4Node = SCOPE_IDENTITY()

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Providing Clear Learning Goals and Scales (Rubrics)', '', 'When the strategy is called for the teacher does not use it or the teacher uses the strategy incorrectly or with parts missing.', 'The teacher provides a stated learning target (daily) and/or learning goal (longer term) but the learning goal is not accompanied by a scale or rubric that describes levels of performance.', 'The teacher provides a clearly stated learning target (daily) and/or learning goal (longer term). The learning goal is accompanied by a scale or rubric that describes levels of performance. Additionally, the teacher monitors students’ understanding of the learning target/goal and the levels of performance.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'1.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1RNode, 1)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Celebrating Success', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher provides students with recognition of their current status but not their knowledge gain relative to the learning goal.', 'The teacher provides students with recognition of their current status and their knowledge gain relative to the learning goal and monitors the extent to which students are motivated to enhance their status.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'1.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1RNode, 2)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Organizing the Physical Layout of the Classroom', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher organizes the physical layout of the classroom to ensure safety, facilitate movement, and focus on learning but the classroom layout addresses only minimal aspects of these issues.', 'The teacher organizes the physical layout of the classroom to ensure safety, facilitate movement, and focus on learning and monitors the extent to which these activities enhance student learning.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'5.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1RNode, 3)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Reviewing Expectations to Rules and Procedures', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher establishes and reviews expectations regarding rules and procedures.', 'The teacher establishes and reviews expectations regarding rules and procedures and monitors the extent to which students understand the rules and procedures.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'5.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1RNode, 4)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Tracking Student Progress', '', 'When the strategy is called for the teacher does not use it or the teacher uses the strategy incorrectly or with parts missing.', 'The teacher facilitates tracking of student progress using a formative approach to assessment but does not monitor the extent to which this process enhances student learning.', 'The teacher facilitates tracking of student progress using a formative approach to assessment and monitors the extent to which this process enhances student learning.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'6.3', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1RNode, 5)
		insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 3)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Interacting with New Knowledge', '', 'The teacher does not employ strategies designed to preview and introduce new knowledge in digestible chunks OR does so with significant errors or omissions.', 'The teacher employs strategies designed to preview and introduce new knowledge in digestible chunks BUT does not monitor the extent to which strategies have their desired effect.', 'The teacher employs strategies designed to preview and introduce new knowledge in digestible chunks AND monitors the extent to which strategies have their desired effect, which includes: elaborating on critical information and summarizing it in linguistic and nonlinguistic ways.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1CNode, 1)
		 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Organizing Students to Practice and Deepen Knowledge', '', 'The teacher does not employ strategies designed to practice skills and processes and critically analyze information OR does so with significant errors or omissions.', 'The teacher employs strategies designed to practice skills and processes and critically analyze information BUT does not monitor the extent to which strategies have their desired effect.', 'The teacher employs strategies designed to practice skills and processes and critically analyze information AND monitors the extent to which strategies have their desired effect, which includes: developing fluency with skills and processes, determining similarities and differences between important information, and determining the validity and structure of important information.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1CNode, 2)
		  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Organizing Students for Cognitively Complex Tasks', '', 'When the strategy is called for the teacher does not use it or the teacher uses the strategy incorrectly or with parts missing.', 'The teacher organizes students and acts as a guide and resource provider but students primarily engage in low level tasks.', 'The teacher organizes students and acts as a guide and resource provider as students engage in cognitively complex tasks and monitors the level to which students apply and transfer the new knowledge.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.3', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1CNode, 3)
		  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Using and Applying Academic Vocabulary', '', 'The teacher does not identify important academic vocabulary specific to the lesson or does so in a manner that does not reflect the critical content.', 'The teacher identifies important academic vocabulary specific to the lesson and makes students aware of the meaning of these terms BUT does not monitor the extent to which students have internalized the meaning of these terms using their own background knowledge.', 'The teacher identifies important academic vocabulary specific to the lesson and makes students aware of the meaning of these terms. Additionally, the teacher monitors the extent to which students have internalized the meaning of these terms using their own background knowledge.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.7', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1CNode, 4)
		  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 7)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Understanding Students’ Interests and Backgrounds', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher minimally uses students’ interests and background during interactions with students.', 'The teacher uses students’ interests and background during interactions with students and monitors the sense of community in the classroom.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'1.3', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Demonstrating Value and Respect for Typically Underserved Students', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher minimally uses verbal and nonverbal behaviors that indicate value and respect for students, with particular attention to those typically underserved.', 'The teacher uses verbal and nonverbal behaviors that indicate value and respect for students, with particular attention to those typically underserved, and monitors the quality of relationships in the classroom.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'1.4', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 2)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Asking Questions of Typically Underserved Students', '', 'When the strategy is called for the teacher does not use it or the teacher uses the strategy incorrectly or with parts missing.', 'The teacher asks questions of all students with the same frequency and depth but does not monitor the quality of participation.', 'The teacher asks questions of all students with the same frequency and depth and monitors the quality of participation.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.4', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 3)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 4)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Probing Incorrect Answers with Typically Underserved Students', '', 'When the strategy is called for the teacher does not use it or the teacher uses the strategy incorrectly or with parts missing.', 'The teacher is not consistent in probing all students’ incorrect answers.', 'The teacher probes all students’ incorrect answers and monitors the level and quality of the responses.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.5', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 4)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 5)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Noticing When Students Are Not Engaged', '', 'The teacher does not monitor student engagement and apply re-engagement strategies as necessary OR does so with significant errors or omissions.', 'The teacher monitors student engagement and applies re-engagement strategies as necessary BUT does not monitor the extent to which strategies have their desired effect.', 'The teacher monitors student engagement and applies re-engagement strategies as necessary AND monitors the extent to which strategies have their desired effect, which includes: enhanced energy and engagement and enhanced student participation in questioning activities and activities designed to analyze and review information.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'2.6', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 5)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 6)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Demonstrating “Withitness”', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher demonstrates awareness of classroom environment.', 'The teacher demonstrates awareness of classroom environment and monitors the effect on students’ behavior.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'5.3', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 6)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 3)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Applying Consequences for Lack of Adherence to Rules and Procedures', '', 'The teacher does not apply consequences for not following rules and procedures.', 'The teacher applies consequences for not following rules and procedures but does not do so in a consistent and fair manner.', 'The teacher applies consequences for not following rules and procedures in a consistent and fair manner and monitors the extent to which rules and procedures are followed.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'5.4', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 7)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 4)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Acknowledging Adherence to Rules and Procedures', '', 'The teacher does not acknowledge adherence to rules and procedures.', 'The teacher acknowledges adherence to rules and procedures but does not do so a consistent and fair manner.', 'The teacher acknowledges adherence to rules and procedures in a consistent and fair manner and monitors the extent to which new actions affect students’ behavior.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'5.5', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 8)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 5)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Displaying Objectivity and Control', '', 'When the strategy is called for the teacher does not use it, or the teacher uses strategy incorrectly or with parts missing.', 'The teacher behaves in an objective and controlled manner.', 'The teacher behaves in an objective and controlled manner and monitors the effect on the classroom climate.', 'The teacher adapts or creates new strategies to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'5.6', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D1ENode, 9)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 6)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Effective Scaffolding of Information Within a Lesson', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher organizes lessons within a unit so that students move from surface to deeper understanding of content, but does not require students to apply the content in authentic ways.', 'The teacher organizes content in such a way that each new piece of information clearly builds on the previous piece, and students move from understanding to applying the content through authentic tasks.', 'The teacher is a recognized leader in helping others scaffold lessons and units that progress toward a deep understanding and transfer of content.', 0,'3.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D2Node, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Planning and Preparing for the Needs of All Students', '', 'The teacher does not know or understand the intervention system or does not use the intervention system to address student needs.', 'The teacher identifies interventions that meet the needs of specific sub-populations (e.g., ELL, special education, and students who come from environments that offer little support for learning), but does not ensure that all identified students are adequately served by the interventions.', 'The teacher identifies and effectively employs interventions that meet the needs of specific sub-populations (e.g., ELL, special education, and students who come from environments that offer little support for learning).', 'The teacher is a recognized leader in helping others employ interventions that meet the needs of specific sub-populations (e.g., ELL, special education, and students who come from environments that offer little support for learning).', 0,'3.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D2Node, 2)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Attention to Established Content Standards', '', 'The teacher does not demonstrate adequate knowledge of the subject and/or the standards for the subject.', 'The teacher demonstrates an acceptable but incomplete knowledge of the subject and/or the standards for the subject.', 'The teacher demonstrates a comprehensive knowledge of the subject and the standards for the subject.', 'The teacher is a recognized leader in helping others understand the subject and/or the standards for the subject.', 0,'4.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D2Node, 3)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Use of Available Resources and Technology', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher identifies the available materials that can enhance student understanding but does not clearly identify or describe the manner in which they will be used.', 'The teacher identifies the available materials that can enhance student understanding and the manner in which they will be used.', 'The teacher is a recognized leader in helping others plan and prepare for the use of available materials, including technology.', 0,'4.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D2Node, 4)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Designing Instruction Aligned to Assessment', '', 'The teacher does not design instruction with clear alignment to learning targets (daily) and/or learning goals (longer term).', 'The teacher designs instruction with assessments aligned to learning target (daily) and/or learning goal (longer term) but does not adapt those assessments to meet student learning needs.', 'The teacher designs instruction with assessments aligned to clearly stated learning target (daily) and/or learning goal (longer term). Those assessments are adapted to meet student learning needs.', 'The teacher adapts or creates new strategies designed to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'6.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D2Node, 5)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Using Multiple Data Elements', '', 'The teacher does not examine multiple data points with the intent of modifying instruction and assessment or does so with significant errors or omissions.', 'The teacher examines a few data points and makes minimal adjustments to instruction and assessment based on the information.', 'The teacher examines multiple data points and makes changes to instruction and assessment based on the information. Additionally the teacher monitors the extent to which the changes result in enhanced student learning.', 'The teacher adapts or creates new strategies designed to meet the specific needs of students for whom the typical application of strategies does not produce the desired effect.', 0,'6.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D2Node, 6)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 2)


	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Evaluating Effectiveness of Individual Lessons and Units', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher identifies specific strategies and behaviors on which to improve but does not select the strategies and behaviors that are most useful for his or her development.', 'The teacher determines how effective a lesson or unit was in terms of enhancing student achievement and identifies causes of success or failure.', 'The teacher is a recognized leader in helping others identify areas of pedagogical strength and weakness.', 0,'2.8', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D3Node, 1)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 8)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Monitoring Progress Relative to the Professional Growth and Development Plan', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher develops a written professional growth and development plan but does not articulate clear goals and timelines. The teacher charts his or her progress on the professional growth and development plan using established goals and timelines but does not make adaptations as needed.', 'The teacher develops a written professional growth and development plan with goals and timelines, charts his or her progress, and makes adaptations as needed.', 'The teacher is a recognized leader in helping others develop professional growth and development plans.', 0,'8.4', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D3Node, 2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 4)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Promoting Positive Interactions about Students and Parents – Courses, Programs and School Events', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher attempts to communicate and collaborate with parents/guardians and school/community regarding courses, programs and school events relevant to the students’, but does not necessarily do so in a timely or clear manner.', 'The teacher communicates and collaborates with parents/guardians and school/community regarding courses, programs and school events relevant to the students’ in a timely and professional manner.', 'The teacher is a recognized leader in helping others communicate and collaborate with parents/guardians and school/community regarding courses, programs and school events relevant to the students’.', 0,'7.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D4Node, 1)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Promoting Positive Interactions about Students and Parents – Timeliness and Professionalism', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher communicates individual students’ progress to parents/guardians, but does not necessarily do so in a timely or clear manner.', 'The teacher communicates individual students’ progress to parents/guardians in a timely and professional manner.', 'The teacher is a recognized leader in helping others communicate individual student progress to parents/guardians in a timely and professional manner.', 0,'7.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D4Node, 2)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Seeking Mentorship for Areas of Need or Interest', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher seeks help and mentorship from colleagues regarding specific classroom strategies and/or mentors other teachers, but does not necessarily do so in a manner that enhances pedagogical skill.', 'The teacher seeks help and mentorship from colleagues regarding specific classroom strategies and/or mentors other teachers in such a manner as to enhance pedagogical skill.', 'The teacher is a recognized leader in mentoring others in such a way as to enhance their pedagogical skill.', 0,'8.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D4Node, 3)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Promoting Positive Interactions with Colleagues', '', 'The teacher makes little or no attempt to follow established norms or collective commitments. The teacher’s behavior may be obstructing the functioning of the team/group.', 'The teacher attempts to follow established norms or commitments but does not comply with all norms and collective commitments.', 'The teacher follows established norms and collective commitments, contributing to the overall effectiveness of the team.', 'The teacher consistently models established norms and collective commitments. The teacher is a recognized leader in facilitating the team/group in resolving conflict for effective functioning.', 0,'8.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D4Node, 4)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 2)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Participating in District and School Initiatives', '', 'The teacher makes no attempt to perform this activity, or the teacher attempts to perform this activity but does not actually complete or follow through with these attempts.', 'The teacher is aware of the district and school initiatives, but does not participate at a level consistent with his or her talents and availability.', 'The teacher participates in district and school initiatives at a level consistent with his or her talents and availability.', 'The teacher is a recognized leader in helping others be aware of and participate in district and school initiatives.', 0,'8.3', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @D4Node, 5)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 3)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Establish Student Growth Goal(s)', '',
	'<p>Does not establish student growth goal(s) or establishes inappropriate goal(s) for subgroups of students not reaching full learning potential. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full learning potential. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full learning potential. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full potential in collaboration with students, parents, and other school staff. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	 1, 'SG 3.1', 2021, 'MAR-TR')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Achievement of Student Growth Goal(s)', '',
	'<p>Growth or achievement data from at least two points in time shows no evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show some evidence of growth for some students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show clear evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show evidence of high growth for all or nearly all students.</p>', 
	1, 'SG 3.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 11)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Establish Student Growth Goal(s)', '',
	'<p>Does not establish student growth goal(s) or establishes inappropriate goal(s) for whole classroom. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for whole classroom. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for whole classroom. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for students in collaboration with students and parents. These whole classroom goals align to school goal(s). Goals identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	1, 'SG 6.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Achievement of Student Growth Goal(s)', '',
	'<p>Growth or achievement data from at least two points in time shows no evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show some evidence of growth for some students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show clear evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show evidence of high growth for all or nearly all students.</p>',
	1, 'SG 6.2', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 11)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Establish Team Student Growth Goal(s)', '',
	'<p>Does not collaborate or reluctantly collaborates with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	'<p>Does not consistently collaborate with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	'<p>Consistently and actively collaborates with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	'<p>Leads other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	1, 'SG 8.1', 2021, 'MAR-TR')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 10)

