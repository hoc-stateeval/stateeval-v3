

	DECLARE @StateFrameworkID BIGINT, @FrameworkNodeID BIGINT, @InstructionalFrameworkID BIGINT, @RubricRowID BIGINT
	DECLARE @PNode BIGINT, @SENode BIGINT, @CPNode BIGINT, @ANode BIGINT, @CECNode BIGINT, @PCCNode BIGINT
	DECLARE @C1Node Bigint, @C2Node BIGINT, @C3Node BIGINT, @C4Node BIGINT, @C5Node BIGINT, @C6Node BIGINT, @C7Node BIGINT, @C8Node BIGINT

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('CEL State', 2021, 'CEL')
	SELECT @StateFrameworkID = SCOPE_IDENTITY()

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('CEL Instructional', 2021, 'CEL')
	SELECT @InstructionalFrameworkID = SCOPE_IDENTITY()


	INSERT FrameworkContextPrototype(FrameworkTagName, Name, SchoolYear, EvaluationType, StateFrameworkID, InstructionalFrameworkID)
	values('CEL', 'CEL 5D+ Teacher Evaluation Rubric 3.0', 2021, 2, @StateFrameworkID, @InstructionalFrameworkID)


	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Centering instruction on high expectations for student achievement.', 'C1', 1, 0, 2021, 'CEL')
	select @C1Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Demonstrating effective teaching practices.', 'C2', 2, 0, 2021, 'CEL')
	select @C2Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Recognizing individual student learning needs and developing strategies to address those needs.', 'C3', 3, 1, 2021, 'CEL')
	select @C3Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Providing clear and intentional focus on subject matter content and curriculum.', 'C4', 4, 0, 2021, 'CEL')
	select @C4Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Fostering and managing a safe, positive learning environment.', 'C5', 5, 0, 2021, 'CEL')
	select @C5Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Using multiple student data elements to modify instruction and improve student learning.', 'C6', 6, 1, 2021, 'CEL')
	select @C6Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Communicating and collaborating with parents and the school community.', 'C7', 7, 0, 2021, 'CEL')
	select @C7Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Exhibiting collaborative and collegial practices focused on improving instructional practice and student learning.', 'C8', 8, 1, 2021, 'CEL')
	select @C8Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Purpose', 'P', 1, 0, 2021, 'CEL')
	select @PNode=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Student Engagement', 'SE', 2, 0, 2021, 'CEL')
	select @SENode = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Curriculum & Pedagogy', 'CP', 3, 0, 2021, 'CEL')
	select @CPNode = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Assessment for Student Learning', 'A', 4, 0, 2021, 'CEL')
	select @ANode = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Classroom Environment & Culture', 'CEC', 5, 0, 2021, 'CEL')
	select @CECNode = SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@InstructionalFrameworkID, 'Professional Collaboration & Communication', 'PCC', 6, 0, 2021, 'CEL')
	select @PCCNode = SCOPE_IDENTITY()


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Learning target(s) connected to standards', '', 
	'Lessons are not based on grade level standards or there are no learning targets aligned to the standard or the targets do not change daily.',
	'Lessons are based on grade level standards. The daily learning target(s) align to the standard.',
	'Lessons are based on grade level standards. The daily learning target(s) align to the standard. Students can rephrase the learning target(s) in their own words.',
	'Lessons are based on grade level standards. The daily learning target(s) align to the standard. Students can rephrase the learning target(s) in their own words. Students can explain why the learning target(s) are important.', 
	0,'P1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PNode, 1)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Lessons connected to previous and future lessons, broader purpose and transferable skill', '',
	'Lessons are rarely linked to previous and future lessons.',
	'Lessons are clearly linked to previous and future lessons.',
	'Lessons are clearly linked to previous and future lessons. Lessons link to a broader purpose or a transferable skill.',
	'Lessons are clearly linked to previous and future lessons. Lessons link to a broader purpose or a transferable skill. Students can explain how lessons build on each other in a logical progression.',
	 0,'P2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PNode,2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Design of performance task', '',
	'Performance tasks do not require a demonstration of thinking connected to the learning target.',
	'Performance tasks require a demonstration of thinking connected to the learning target.',
	'Performance tasks require a demonstration of thinking connected to the learning target. Performance tasks require application of discipline-specific concepts or skills.',
	'Performance tasks require a demonstration of thinking connected to the learning target. Performance tasks require application of discipline-specific concepts or skills. Students are able to use prior learnings/understandings to engage in new performance tasks.',
	 0,'P3', 2021, 'CEL')
	select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PNode, 3)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 5)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Communication of learning target(s)', '',
	'Teacher rarely states or communicates with students about the learning target(s).',
	'Teacher states the learning target(s) once during the lesson and checks for student understanding of the learning target(s).',
	'Teacher communicates the learning target(s) through verbal and visual strategies and checks for student understanding of the learning target(s).',
	'Teacher communicates the learning target(s) through verbal and visual strategies, checks for student understanding of the learning target(s), and references the target(s) throughout instruction.',
	0,'P4', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PNode, 4)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Success criteria', '',
	'The success criteria for the learning target(s) are nonexistent or vague.',
	'Success criteria are present but may lack alignment to the learning target(s) and/or may not be used by students for learning.',
	'Success criteria are present and align to the learning target(s). With prompting from the teacher, students use the success criteria to communicate what they are learning.',
	'Success criteria are present and align to the learning target(s). Students use the success criteria to communicate what they are learning.',
	 0,'P5', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PNode, 5)
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Quality of questioning', '',
	'Teacher does not ask questions to probe and deepen student understanding or uncover misconceptions.',
	'Teacher asks questions to probe and deepen student understanding or uncover misconceptions.',
	'Teacher asks questions to probe and deepen student understanding or uncover misconceptions. Teacher assists students in clarifying their thinking with one another.',
	'Teacher asks questions to probe and deepen student understanding or uncover misconceptions. Teacher assists students in clarifying and assessing their thinking with one another. Students question one another to probe for deeper thinking.',
	 0,'SE1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @SENode, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Ownership of learning', '',
	'Teacher rarely provides opportunities and strategies for students to take ownership of their learning.',
	'Teacher provides opportunities and strategies for students to take ownership of their learning. Most locus of control is with teacher.',
	'Teacher provides opportunities and strategies for students to take ownership of their learning. Some locus of control is with students in ways that support student learning.',
	'Teacher provides opportunities and strategies for students to take ownership of their learning. Most locus of control is with students in ways that support student learning.',
	 0,'SE2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @SENode, 2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Capitalizing on students'' strengths', '',
	'Teacher has little knowledge of how students'' strengths (academic background, life experiences and culture/language) could be used as an asset for student learning. ', 
	'Teacher has knowledge of students'' strengths (academic background, life experiences and culture/language) and applies this knowledge in limited ways not connected to the unit goals.',
	'Teacher capitalizes on students'' strengths (academic background, life experiences and culture/language) and applies this knowledge in limited ways connected to the unit goals.',
	'Teacher capitalizes on students'' strengths (academic background, life experiences and culture/language) and applies this knowledge in a variety of ways connected to the unit goals.',
	0,'SE3', 2021, 'CEL')
	select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @SENode, 3)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Opportunity and support for participation and meaning making', '',
	'Teacher does not use engagement strategies and structures that facilitate participation and meaning making by students. Few students have the opportunity to engage in discipline-specific meaning making.',
	'Teacher uses engagement strategies and structures that facilitate participation and meaning making by students. Some students have the opportunity to engage in discipline-specific meaning making.',
	'Teacher sets expectations and provides support for engagement strategies and structures that facilitate participation and meaning making by students. Most students have the opportunity to engage in discipline-specific meaning making.',
	'Teacher sets expectations and provides support for engagement strategies and structures that facilitate participation and meaning making by students. All students have the opportunity to engage in discipline-specific meaning making. Meaning making is often student-led.',
	 0,'SE4', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @SENode, 4)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Student talk', '',
	'Talk is dominated by the teacher and/or student talk is unrelated to the discipline.',
	'Student talk is directed to the teacher. Talk reflects discipline-specific knowledge. Students do not provide evidence for their thinking.',
	'Student talk is a mix of teacher-student and student-to-student. Talk reflects discipline-specific knowledge and ways of thinking. Students provide evidence to support their thinking.',
	'Student talk is predominantly student-to-student. Talk reflects discipline-specific knowledge and ways of thinking. Students provide evidence to support their thinking. Students press on thinking to expand ideas for themselves and others.',
	 0,'SE5', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @SENode, 5)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Alignment of instructional materials and tasks', '',
	'Instructional materials and tasks do not align with the purpose of the unit and lesson.',
	'Instructional materials and tasks align with the purpose of the unit and lesson.',
	'Instructional materials and tasks align with the purpose of the unit and lesson. Teacher makes intentional decisions about materials to support student learning of content and transferable skills.',
	'Instructional materials and tasks align with the purpose of the unit and lesson. Teacher makes intentional decisions about materials to support student learning of content and transferable skills. Materials and tasks align with students? levels of challenge.',
	 0,'CP1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CPNode, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Teacher knowledge of content', '',
	'Teacher demonstrates a lack of knowledge of discipline-based concepts and habits of thinking by making content errors.',
	'Teacher demonstrates an understanding of how discipline-based concepts and habits of thinking relate to one another or build upon one another within a unit.',
	'Teacher demonstrates an understanding of how discipline-based concepts and habits of thinking relate to one another or build upon one another over the course of an academic year.',
	'Teacher demonstrates an understanding of how discipline-based concepts and habits of thinking relate to one another or build upon one another over the course of an academic year as well as in previous and future years.',
	 0,'CP2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CPNode, 2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Discipline-specific teaching approaches', '',
	'Teacher rarely uses discipline-specific teaching approaches and strategies that develop students? conceptual understanding and discipline-specific habits of thinking.',
	'Teacher uses discipline-specific teaching approaches and strategies that develop students? conceptual understanding and discipline-specific habits of thinking at one or two points within a unit.',
	'Teacher uses discipline-specific teaching approaches and strategies that develop students? conceptual understanding and discipline-specific habits of thinking throughout the unit, but not daily.',
	'Teacher uses discipline-specific teaching approaches and strategies that develop students? conceptual understanding and discipline-specific habits of thinking on a daily basis.',
	0,'CP3', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CPNode, 3)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Differentiated instruction for students', '',
	'Teacher does not use strategies that differentiate for individual learning strengths and needs.',
	'Teacher uses one strategy - such as time, space, structure or materials ? to differentiate for individual learning strengths and needs.',
	'Teacher uses multiple strategies - such as time, space, structure and materials ? to differentiate for individual learning strengths and needs.',
	'Teacher uses multiple strategies - such as time, space, structure and materials ? to differentiate for individual learning strengths and needs. Teacher provides targeted and flexible supports within the strategies.',
	 0,'CP4', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CPNode, 4)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node,3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Use of scaffolds', '',
	'Teacher does not provide scaffolds that are related to or support the development of the targeted concepts and/or skills. If teacher uses scaffolds, he or she does not release responsibility to students.',
	'Teacher provides scaffolds that are clearly related to and support the development of the targeted concepts and/or skills. Using scaffolds, the teacher gradually releases responsibility to students to promote learning and independence. ',
	'Teacher provides scaffolds that are clearly related to and support the development of the targeted concepts and/or skills. Using scaffolds, the teacher gradually releases responsibility to students to promote learning and independence. Students expect to be self-reliant.',
	'Teacher provides scaffolds that are clearly related to and support the development of the targeted concepts and/or skills. Using scaffolds, the teacher gradually releases responsibility to students to promote learning and independence. Students expect to be self-reliant. Students use scaffolds across tasks with similar demands.',
	 0,'CP5', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CPNode, 5)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 4)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Student self-assessment', '',
	'Teacher does not provide an opportunity for students to assess their own learning in relation to the success criteria for the learning target(s).',
	'Teacher provides an opportunity for students to assess their own learning in relation to the success criteria for the learning target(s) in ways that may not deepen student understanding of progress toward the target(s).',
	'Teacher provides an opportunity for students to assess their own learning in relation to the success criteria for the learning target(s) in ways that deepen student understanding of progress toward the target(s).',
	'Teacher provides an opportunity for students to assess their own learning in relation to the success criteria for the learning target(s) in ways that deepen student understanding of progress toward the target(s). Students use success criteria for improvement.',
	 0,'A1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @ANode, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Student use of formative assessments over time', '',
	'Students do not use formative assessments to assess their own learning.',
	'Students use formative assessments at least two to three times per year course to assess their own learning, determine learning goals, and monitor progress over time.',
	'Students use formative assessments at least two to three times per year/course and use formative assessments within a unit or two to assess their own learning, determine learning goals, and monitor progress over time.',
	'Students use formative assessments at least two to three times per year/course and use formative assessments within each unit to assess their own learning, determine learning goals, and monitor progress over time.',
	 0,'A2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @ANode, 2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Quality of formative assessment methods', '',
	'Assessment tasks are not aligned with the learning target(s).',
	'Assessment tasks allow students to demonstrate learning. The quality of the assessment methods provides no information about student thinking and needs.',
	'Assessment tasks allow students to demonstrate learning. The quality of the assessment methods provides limited information about student thinking and needs.',
	'Assessment tasks allow students to demonstrate learning. The quality of the assessment methods provides comprehensive information about student thinking and needs.',
	 0,'A3', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @ANode, 3)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Teacher use of formative assessments', '',
	'Teacher does not use formative assessments to modify future lessons, make instructional adjustments, or give feedback to students.',
	'Teacher uses formative assessments to modify future lessons or makes in-the-moment instructional adjustments based on completion of task(s).',
	'Teacher uses formative assessments to modify future lessons, makes in-the-moment instructional adjustments based on student understanding, and gives general feedback aligned with the learning target(s).',
	'Teacher uses formative assessments to modify future lessons, makes in-the-moment instructional adjustments based on student understanding, and gives targeted feedback aligned with the learning target(s) to individual students.',
	 0,'A4', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @ANode, 4)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Collection systems for formative assessment data', '',
	'Teacher does not have routines for recording formative assessment data.',
	'Teacher has an observable system and routines for recording formative assessment data but does not use the system to inform instructional practice.',
	'Teacher has an observable system and routines for recording formative assessment data and periodically uses the system to inform instructional practice.',
	'Teacher has an observable system and routines for recording formative assessment data and uses the system to inform day-to-day instructional practice.', 
	0,'A5', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @ANode, 5)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Classroom arrangement and resources','',
	'Physical environment of the classroom is unsafe or resources are not accessible to all students to support their learning during the lesson.',
	'The physical environment is safe. The resources, materials and technology in the classroom relate to the content or current unit and are accessible to all students.',
	'The physical environment is safe. The resources, materials and technology in the classroom relate to the content or current unit and are accessible to all students. The arrangement of the room supports and scaffolds student learning and the purpose of the lesson.',
	'The physical environment is safe. The resources, materials and technology in the classroom relate to the content or current unit and are accessible to all students. The arrangement of the room supports and scaffolds student learning and the purpose of the lesson. Students use resources and the arrangement of the room for learning.',
	 0,'CEC1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CECNode, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Learning routines','',
	'Learning routines for discussion and collaborative work are absent.',
	'Learning routines for discussion and collaborative work are present but may not result in effective discourse. Students are held accountable for completing their work but not for learning.',
	'Learning routines for discussion and collaborative work are present, and result in effective discourse. Students are held accountable for completing their work and for learning.',
	'Learning routines for discussion and collaborative work are present, and result in effective discourse. Students independently use the routines during the lesson. Students are held accountable for completing their work and for learning. Students support the learning of others.',
	 0,'CEC2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CECNode, 2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Use of learning time','',
	'Instructional time is frequently disrupted.',
	'Some instructional time is lost through inefficient transitions or management routines. Teacher responds to student misbehavior with uneven results.',
	'Instructional time is maximized in service of learning through efficient transitions, management routines and positive student discipline. Student misbehavior is rare.',
	'Instructional time is maximized in service of learning through efficient transitions, management routines and positive student discipline. Students manage themselves, assist each other in managing behavior, or exhibit no misbehavior.',
	 0,'CEC3', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CECNode, 3)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Student status', '',
	'Teacher does not develop positive teacher-student relationships that attend to students? well-being. Patterns of interaction or lack of interaction promote rivalry and/or unhealthy competition among students or some students are relegated to low status positions.',
	'Teacher demonstrates positive teacher-student relationships that foster students? well-being. Patterns of interaction between teacher and students and among students may send messages that some students? contributions are more valuable than others.',
	'Teacher and students demonstrate positive teacher-student and student-student relationships that foster students? well-being and develop their identity as learners. Patterns of interaction between teacher and students and among students indicate that all are valued for their contributions.',
	'Teacher and students demonstrate positive teacher-student and student-student relationships that foster students? well-being and develop their identity as learners. Patterns of interaction between teacher and students and among students indicate that all are valued for their contributions. Teacher creates opportunities for student status to be elevated.',
	 0,'CEC4',2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CECNode, 4)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Norms for learning','',
	'Classroom norms are not evident and/or do not address risk-taking, collaboration, respect for divergent thinking or students'' cultures.',
	'Classroom norms are evident but result in uneven patterns of interaction that do not encourage risk-taking, collaboration, respect for divergent thinking and students'' cultures.',
	'Classroom norms are evident and result in patterns of interaction that encourage risk-taking, collaboration, respect for divergent thinking and students'' cultures.',
	'Classroom norms are evident and result in patterns of interaction that encourage risk-taking, collaboration, respect for divergent thinking and students'' cultures. Students self-monitor or remind one another of the norms.',
	 0,'CEC5', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @CECNode, 5)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 4)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Collaboration with peers and administrators to improve student learning', '',
	'Teacher rarely collaborates with peers or engages in inquiry for the purpose of improving instructional practice or student learning.',
	'Teacher collaborates and engages in inquiry with peers and administrators for the purpose of improving instructional practice and student learning. Teacher provides minimal contributions.',
	'Teacher collaborates and engages in inquiry with peers and administrators for the purpose of improving instructional practice and student learning. Teacher contributes to collaborative work.',
	'Teacher collaborates and engages in inquiry with peers and administrators for the purpose of improving instructional practice, and student and teacher learning. Teacher occasionally leads collaborative work and/or teacher serves as a mentor for others? growth and development.',
	 0,'PCC1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PCCNode, 1)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Communication and collaboration with parents and guardians', '',
	'Teacher rarely communicates in any manner with parents and guardians about student progress.',
	'Teacher communicates with all parents and guardians about goals of instruction and student progress, but usually relies on one method for communication or requires support or reminders.',
	'Teacher communicates with all parents and guardians about goals of instruction and student progress using multiple tools to communicate in a timely and positive manner. Teacher considers the language needs of parents and guardians.',
	'Teacher communicates with all parents and guardians about goals of instruction and student progress using multiple tools to communicate in a timely and positive manner. Teacher considers the language needs of parents and guardians. Teacher effectively engages in two-way forms of communication and is responsive to parent and guardian insights.',
	 0,'PCC2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PCCNode, 2)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Communication within the school community about student progress', '',
	'Teacher maintains student records. Teacher rarely communicates student progress information to relevant individuals within the school community.',
	'Teacher maintains student records. Teacher communicates student progress information to relevant individuals within the school community; however, performance data may have minor flaws or be narrowly defined (e.g., test scores only).',
	'Teacher maintains accurate and systematic student records. Teacher communicates student progress information ? including both successes and challenges ? to relevant individuals within the school community in a timely, accurate and organized manner.',
	'Teacher maintains accurate and systematic student records. Teacher communicates student progress information ? including both successes and challenges ? to relevant individuals within the school community in a timely, accurate and organized manner. Teacher and student communicate accurately and positively about student successes and challenges.',
	 0,'PCC3', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PCCNode, 3)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Support of school, district and state curricula, policies and initiatives', '',
	'Teacher is unaware of or does not support school, district or state initiatives. Teacher violates a district policy or rarely follows district curricula/pacing guide.',
	'Teacher supports and has an understanding of school, district and state initiatives. Teacher follows district policies and implements district curricula/pacing guide.',
	'Teacher supports and has an understanding of school, district and state initiatives. Teacher follows district policies and implements district curricula/pacing guide. Teacher makes pacing adjustments as appropriate to meet whole-group needs without compromising an aligned curriculum.',
	'Teacher supports and looks for opportunities to take on leadership roles in developing and implementing school, district and state initiatives. Teacher follows district policies and implements district curricula/pacing guide. Teacher makes pacing adjustments as appropriate to meet whole-group and individual needs without compromising an aligned curriculum.', 
	0,'PCC4', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PCCNode, 4)
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Ethics and advocacy', '',
	'Teacher''s professional role toward adults and students is unfriendly or demeaning, crosses ethical boundaries, or is unprofessional.',
	'Teacher''s professional role toward adults and students is friendly, ethical and professional and supports learning for all students, including the historically underserved.',
	'Teacher''s professional role toward adults and students is friendly, ethical and professional and supports learning for all students, including the historically underserved. Teacher advocates for fair and equitable practices for all students.',
	'Teacher''s professional role toward adults and students is friendly, ethical and professional and supports learning for all students, including the historically underserved. Teacher advocates for fair and equitable practices for all students. Teacher challenges adult attitudes and practices that may be harmful or demeaning to students.',
	 0,'PCC5', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @PCCNode, 5)
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Establish Student Growth Goal(s)', '',
	'<p>Does not establish student growth goal(s) or establishes inappropriate goal(s) for subgroups of students not reaching full learning potential. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full learning potential. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full learning potential. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full potential in collaboration with students, parents, and other school staff. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	 1, 'SG 3.1', 2021, 'CEL')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Achievement of Student Growth Goal(s)', '',
	'<p>Growth or achievement data from at least two points in time shows no evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show some evidence of growth for some students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show clear evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show evidence of high growth for all or nearly all students.</p>', 
	1, 'SG 3.2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 11)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Establish Student Growth Goal(s)', '',
	'<p>Does not establish student growth goal(s) or establishes inappropriate goal(s) for whole classroom. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for whole classroom. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for whole classroom. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	'<p>Establishes appropriate student growth goal(s) for students in collaboration with students and parents. These whole classroom goals align to school goal(s). Goals identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>',
	1, 'SG 6.1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Achievement of Student Growth Goal(s)', '',
	'<p>Growth or achievement data from at least two points in time shows no evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show some evidence of growth for some students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show clear evidence of growth for most students.</p>',
	'<p>Multiple sources of growth or achievement data from at least two points in time show evidence of high growth for all or nearly all students.</p>',
	1, 'SG 6.2', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 11)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Establish Team Student Growth Goal(s)', '',
	'<p>Does not collaborate or reluctantly collaborates with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	'<p>Does not consistently collaborate with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	'<p>Consistently and actively collaborates with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	'<p>Leads other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>',
	1, 'SG 8.1', 2021, 'CEL')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 10)

	