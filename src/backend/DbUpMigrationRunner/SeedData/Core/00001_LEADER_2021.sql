

	DECLARE @StateFrameworkID BIGINT, @FrameworkNodeID BIGINT, @InstructionalFrameworkID BIGINT, @RubricRowID BIGINT
	DECLARE @INode BIGINT, @IINode BIGINT, @IIINode BIGINT, @IVNode BIGINT, @VNode BIGINT
	DECLARE @C1Node Bigint, @C2Node BIGINT, @C3Node BIGINT, @C4Node BIGINT, @C5Node BIGINT, @C6Node BIGINT, @C7Node BIGINT, @C8Node BIGINT

	insert Framework(Name, SchoolYear, FrameworkTagName)
	values('Leadership', 2021, 'LEADERSHIP')
	SELECT @StateFrameworkID = SCOPE_IDENTITY()

	INSERT FrameworkContextPrototype(FrameworkTagName, Name, SchoolYear, EvaluationType, StateFrameworkID, InstructionalFrameworkID)
	values('LEADERSHIP', 'The AWSP Leadership Framework', 2021, 1, @StateFrameworkID, @InstructionalFrameworkID)

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Creating a Culture', 'C1',1, 0, 2021, 'LEADERSHIP')
	select @C1Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Ensuring School Safety', 'C2', 2, 0, 2021, 'LEADERSHIP')
	select @C2Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Planning with Data', 'C3', 3, 1, 2021, 'LEADERSHIP')
	select @C3Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Aligning Curriculum', 'C4', 4, 0, 2021, 'LEADERSHIP')
	select @C4Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Improving Instruction', 'C5', 5, 1, 2021, 'LEADERSHIP')
	select @C5Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Managing Resources', 'C6', 6, 0, 2021, 'LEADERSHIP')
	select @C6Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Engaging Families & Communities', 'C7', 7, 0, 2021, 'LEADERSHIP')
	select @C7Node=SCOPE_IDENTITY()

	insert Frameworknode(FrameworkID, Title, ShortName, Sequence, IsStudentGrowthAligned, SchoolYear, FrameworkTagName)
	values(@StateFrameworkID, 'Closing the Gap', 'C8', 8, 1, 2021, 'LEADERSHIP')
	select @C8Node=SCOPE_IDENTITY()

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Develops and sustains focus on a shared mission and clear vision for improvement of teaching and learning', '', 
	'<p>Does not believe a common mission or vision is needed for the improvement of teaching and learning.</p><p>Tolerates behaviors and activities not aligned with the school’s mission and vision.</p>', 
	'<p>Recognizes the connection between a common mission and vision in the improvement of teaching and learning but has not identified how to directly influence these in the work of the school.</p><p>Inconsistently connects the school’s mission and vision with school behaviors and activities.</p>', 
	'<p>Communicates a mission and vision of ongoing improvement in teaching and learning such that students and staff understand what the school is working to achieve.</p><p>Consistently encourages and supports behaviors and activities that explicitly align with the school’s mission and vision.</p>', 
	'<p>Most or all of the stakeholders own the mission and vision, such that they independently advocate for and seek to achieve the mission and vision and communicate these to others.</p><p>Students and staff develop and implement behaviors and activities that consistently align with the mission and vision of the school.</p>', 
	0, '1.1', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Engages in essential conversations for ongoing improvement of the school', '', 
	'<p>Conversations with students, staff, and stakeholders are off topic, shallow or confusing.</p><p>Communication with students, staff, and stakeholders is top-down and discourages feedback.</p><p>Creates or employs barriers to effective communication about ongoing improvement of the school.</p>', 
	'<p>Conversations with students, staff, and stakeholders rarely focus on high impact issues and topics.</p><p>Input from students, staff, and stakeholders is solicited, but not acted upon.</p><p>Infrequently identifies or addresses barriers to effective communication about ongoing improvement of the school.</p>', 
	'<p>Conversations with students, staff, and stakeholders routinely focus on high-impact issues and topics.</p><p>Creates and sustains productive two-way communication systems with students, staff, and stakeholders.</p><p>Provides leadership such that the effective communication about ongoing improvement of the school takes place barrier free.</p>',
	'<p>Establishes and implements communication systems that focus student, staff, and stakeholder conversations on high impact issues and topics.</p><p>Creates systemic, two-way feedback loops used within student, staff, and stakeholder groups.</p><p>Staff and students identify and reduce barriers to effective communication about ongoing improvement of the school.</p>',
	0, '1.2', 2021, 'LEADERSHIP')
	   select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Facilitates collaborative processes leading toward continuous improvement of teaching and learning', '', 
	'<p>Demonstrates no understanding of the value of collaboration and trust—does not model, promote, or facilitate collaboration among staff for teaching and learning.</p><p>Tolerates behaviors (competition, unhealthy interactions) that impede collaboration among staff for teaching and learning.</p>', 
	'<p>Demonstrates some understanding of the value of collaboration and trust—occasionally models, promotes, and facilitates collaboration among staff for teaching and learning.</p><p>Displays emerging consensus-building and negotiation skills among staff for teaching and learning.</p>', 
	'<p>Assumes responsibility for modeling, teaching, and promoting collaboration among staff for teaching and learning.</p><p>Actively supports and facilitates collaborative processes among staff for teaching and learning.</p>',
	'<p>Has created a culture in which staff willingly and autonomously model, promote, and facilitate collaboration for teaching and learning.</p><p>Successfully creates systems that build the capacity of staff to collaborate across grade levels and subject areas for teaching and learning.</p>',
	0, '1.3', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Promotes and distributes leadership', '', 
	'<p>Offers no model or opportunity for distributed leadership among staff.</p><p>Makes decisions unilaterally.</p><p>Takes no responsibility for developing the leadership skills of others.</p>', 
	'<p>Offers differing or limited opportunities for staff to serve in appropriate leadership roles.</p><p>Decision-making is limited to selected individuals or groups.</p><p>Takes limited responsibility for developing the leadership skills of others.</p>', 
	'<p>Provides opportunities and invitations for a range of staff to serve in appropriate leadership roles.</p><p>Those impacted by a decision have input before a decision is finalized.</p><p>Routinely develops the leadership skills of building leaders and other staff.</p>',
	'<p>Develops and depends upon structures that rely on many staff serving in appropriate leadership roles.</p><p>Builds a sense of efficacy and empowerment that results in staff ownership for final decisions.</p><p>Key staff develop the leadership skills of others by routinely teaching effective leadership skills to students and staff.</p>',
	0, '1.4', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Creates and sustains a school culture that values and responds to the characteristics and needs of each learner', '', 
	'<p>Does not address the common need for others to feel welcome, safe, capable, and known.</p><p>No effort made to address the unique economic, cultural, or societal influences on individual learners.</p><p>Does not communicate high expectations for students and staff regarding school improvement.</p>', 
	'<p>Makes attempts to meet common needs, but the attempts do not contribute to an improved building culture.</p><p>Very little and/or ineffective effort is made to adjust school culture and programs to better meet the unique economic, cultural, or societal influences on individual learners.</p><p>Conversations about school improvement infrequently express high expectations for students and staff.</p>', 
	'<p>Implements programs which create a building culture that meets the common needs for others to feel welcome, safe, capable, and known.</p><p>All influences are considered by administrator when planning for and responding to the unique economic, cultural, or societal influences on individual learners.</p><p>Conversations about school improvement regularly express high expectations for students and staff.</p>',
	'<p>Leads the community to initiate programs that lead to measurable improvement in building culture.</p><p>All staff are knowledgeable, sensitive and effectively responsive to the unique economic, cultural, and societal influences on individual learners.</p><p>Students and staff consistently communicate high expectations for their ability to improve the school.</p>',
	0, '1.5', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C1Node, 5)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides for physical safety', '', 
	'<p>Neglects to consider the physical safety of students and staff.</p><p>Does not maintain or implement a current school safety plan.</p><p>No safety drills for earthquake, fire, and intruder/ lock-down take place.</p>', 
	'<p>Physically unsafe problems may be identified but are not always resolved in a timely manner.</p><p>A school safety plan exists but needs updating and/or is not widely known.</p><p>Safety drills for earthquake, fire, and intruder/lock-down are sporadic or are not taken seriously.</p>', 
	'<p>Physically unsafe problems are identified and the administrator is persistent in resolving them.</p><p>Maintains and implements a school safety plan, proactively monitors and updates the plan in response to new threats and changing circumstances.</p><p>Required drills are performed and students and staff follow the building procedures.</p>',
	'<p>Considers potentially unsafe physical concerns and implements preventive programs which result in a reduction of harm.</p><p>In consultation with staff, students, and outside experts, updates and shares a school safety plan.</p><p>After required drills are conducted, students and staff are part of a feedback cycle to identify and address areas for improvement.</p>',
	0, '2.1', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides for social, emotional and intellectual safety', '', 
	'<p>Allows staff to devalue or remain ignorant of the authentic, lived culture of students while at school. Neglects the social safety of students and staff.</p><p>Does not acknowledge the diversity of ideas and opinions of students and staff. Students are unwilling to admit mistakes or to ask for help.</p><p>Does not have an anti-bullying policy or plan in place that promotes emotional safety.</p>', 
	'<p>Vocalizes the need to understand the level of social safety experienced by students and staff but does not have effective routines to gain or address this information.</p><p>Demonstrates limited acceptance for diversity of ideas and opinions of students and staff. Students rarely admit their mistakes or ask for help.</p><p>Anti-bullying policy and plan exists to promote emotional safety but is not fully effective.</p>', 
	'<p>Develops, implements, and monitors systems, curricula, and programs that effectively create social safety for students and staff.</p><p>Ensures a school culture in which the diversity of ideas and opinions of students and staff are acknowledged and valued. Students feel safe in the classroom admitting mistakes and asking for help.</p><p>Anti-bullying policy and plan to promote emotional safety is known and followed by students and staff.</p>',
	'<p>Staff and students support systems, curricula, and programs which make social safety a top priority for staff and students.</p><p>Students and staff advocate for a diversity of ideas and opinions, respecting perspectives that arise and promote the open exchange of ideas. Classrooms promote mistakes and requests for help as an essential element of learning.</p><p>Unprompted, students and staff address bullying behaviors using tools universally taught and respected.</p>',
	0, '2.2', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Creates and protects identity safety', '', 
	'<p>Is unaware or disinterested in identifying areas of discrimination within the school community.</p><p>Does not differentiate responses or proactively address disproportionate results of behavioral consequences based on an individual’s race, culture, or social status.</p>', 
	'<p>Recognizes the limiting impact of discrimination on student learning and social safety but does not systematically implement an effective response.</p><p>May be somewhat aware of disproportionate responses based on race, culture, or social status but is not addressing it as a priority.</p>', 
	'<p>The school addresses discrimination and includes positive and inclusive representations of diversity. Students display a sense of belonging and feel they can be successful within the context of the classroom and school.</p><p>Identifies and responds effectively to eliminate disproportionate responses based on an individual’s race, culture, or social status.</p>',
	'<p>Students and staff take a leadership role in identifying and addressing discrimination. There is ongoing, highly-transparent work to identify and address emerging areas of discrimination.</p><p>Creates a school in which adults address the disproportionate application of responses based on an individual’s race, culture, or social status.</p>',
	0, '2.3', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C2Node, 3)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Recognizes and seeks out multiple data sources', '', 
	'<p>Does not access appropriate data to inform leadership decisions.</p>', 
	'<p>Accesses standard data, which is easily obtained to inform leadership decisions.</p>', 
	'<p>Accesses easily obtained data and creates systems to obtain additional data to inform leadership decisions.</p>',
	'<p>Shows evidence that data collection systems are linked to the school improvement plan.</p>',
	 0, '3.1', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Analyzes and interprets multiple data sources to inform school-level improvement efforts', '', 
	'<p>Fails to analyze data, does so only at a cursory level, or interprets data incorrectly.</p><p>Does not share key data with students, staff, and/or stakeholders.</p>', 
	'<p>Data is analyzed but does not contribute to the understanding of overall progress toward building goals.</p><p>Informs students, staff, and/or stakeholders of school-wide data.</p>', 
	'<p>Analyzes multiple sources of data from multiple vantage points, often using staff to help draw conclusions which creates monitoring systems for the School Improvement Plan.</p><p>Creatively conveys data in ways that increase an understanding of it by students, staff, and/or stakeholders.</p>',
	'<p>Leads staff to independently analyze their own data to inform their own improvement plans.d</p><p>Leads students, staff, and/or stakeholders to convey their own data so as to inform professional practice in the school.</p>',
	0, '3.2', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Creates data-driven plans for improved teaching and learning', '', 
	'<p>Fails to create a School Improvement Plan, or it is not based on data aligned with the needs of the school or connected to the District Improvement Plan.</p><p>Fails to develop short-range plans to support the School Improvement Plan, or plans for school improvements unrelated to the School Improvement Plan.</p><p>Ignores those charged with implementing plans in the development of them.</p>', 
	'<p>Develops a School Improvement Plan based on standard data sources targeting specific goals, which are informed by and support the District Improvement and/or Strategic Plan.</p><p>Creates some additional plans that are developed in response to the unique needs of the school or support the School Improvement Plan.</p><p>Makes an effort to involve stakeholders who might be involved in its implementation.</p>', 
	'<p>Creates a comprehensive School Improvement Plan, with measurable goals and achievable timelines, and supports the District Improvement and/or Strategic Plan.</p><p>Creates short-range plans that support the School Improvement Plan, and other plans that are developed in response to analyzed data and are designed to accomplish specific goals.</p><p>Engages key stakeholders in the development of the plans to which they will be contributing.</p>',
	'<p>Creates a comprehensive and challenging School Improvement Plan in a way that causes the staff to own the plan and feel a sense of urgency to accomplish its goals.</p><p>Leads in a way that links teachers’ individual professional growth plans to the school’s improvement plans.</p><p>Leads in a way that key stakeholders involved in implementing the plans own them because of their involvement.</p>',
	0, '3.3', 2021, 'LEADERSHIP')
	   select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Implements data-informed improvement plans', '', 
	'<p>Fails to provide leadership to implement the plan successfully.</p><p>Monitors the plan in a sporadic and ineffective way.</p><p>Makes no effort to revise action steps of the plan in the face of marginal progress along the way.</p>', 
	'<p>Implements the plan to get it off the ground.</p><p>Monitors progress on the plan at key times during the duration of the plan and conveys the results to those involved.</p><p>Revises some action steps when necessary but might ignore a need to revise, or revises too often.</p>', 
	'<p>Implements the plan in a way that creates excitement for accomplishing the goals of the plan.</p><p>Monitors plans regularly with staff. Displays data and celebrates progress.</p><p>Revises action steps in the plan when needed to keep the plan fresh and dynamic.</p>',
	'<p>Implements the plan in a way that encourages key staff members to take the lead on its implementation.</p><p>Leads in a way that key staff members regularly monitor short and long term goals including the School Improvement Plan. The celebration of progress is pervasive.</p><p>Leads in a way that staff regularly consider revisions to their action steps in order to succeed with the plan.</p>',
	0, '3.4', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 4)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Assists staff in aligning curriculum to state and local district learning goals', '', 
	'<p>Has incomplete or insufficient knowledge of state standards and district learning goals.</p><p>Does not facilitate curriculum alignment activities with staff to determine and assure essential standards are taught across grade levels and content areas.</p>', 
	'<p>Has emerging knowledge of state standards and district learning goals.</p><p>Facilitates some curriculum alignment activities with staff to determine and assure essential standards are taught across grade levels and content areas.</p>', 
	'<p>Has strong knowledge of state standards and district learning goals.</p><p>Systematically facilitates curriculum alignment activities with staff to determine and assure essential standards are taught across grade levels and content areas.</p>',
	'<p>Provides leadership and support such that staff have strong knowledge of state standards and district learning goals.</p><p>Provides leadership and support such that staff ownership of curriculum alignment and implementation of identified essential standards positively impacts opportunities to learn.</p>',
	0, '4.1', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Assists staff in aligning instructional practices to state standards and district learning goals', '', 
	'<p>Has incomplete or insufficient knowledge of instructional practices to address state standards and district learning goals.</p><p>Does not facilitate alignment of best practices for underperforming and above-proficient students across grade levels or content areas.</p>', 
	'<p>Has sufficient knowledge of instructional practices to address state standards and district learning goals.</p><p>Facilitates some alignment of best practices for underperforming and above-proficient students across grade levels or content areas.</p>', 
	'<p>Has strong knowledge of instructional practices to address state standards and district learning goals.</p><p>Systematically facilitates alignment of best instructional practices for underperforming and above-proficient students across grade levels or content areas.</p>',
	'<p>Provides leadership and support such that staff have strong knowledge of instructional practices to address state standards and district learning goals.</p><p>Provides leadership and support such that staff assist each other in the alignment of best instructional practice for underperforming and above-proficient students.</p>',
	 0, '4.2', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Assists staff in aligning assessment practices to state standards and district learning goals', '', 
	'<p>Has incomplete or insufficient knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Does not lead the staff in the alignment of balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>', 
	'<p>Has emerging knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Leads staff in limited aspects of aligning balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>', 
	'<p>Has strong knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Systemically leads staff in aligning balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>',
	'<p>Provides leadership and support such that staff have strong knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Provides leadership and support such that staff take ownership for alignment of balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>',
	0, '4.3', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C4Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Uses adopted instructional framework to monitor and support effective instruction and assessment practices', '', 
	'<p>Does not effectively monitor instruction and assessment practices of staff and/or does not provide sufficient support for staff to improve teaching and learning.</p><p>Feedback to staff demonstrates lack of/or insufficient knowledge of adopted instructional framework or its use in improving instruction and assessment practices resulting in little or no growth in teacher efficacy.</p>', 
	'<p>Develops and uses minimal systems and routines to monitor instruction and assessment practices of staff which result in consistent but limited support for staff to improve teaching and learning.</p><p>Feedback to staff demonstrates emerging knowledge of adopted instructional framework and its use in improving instruction and assessment practices resulting in some growth in teacher efficacy.</p>', 
	'<p>Develops and uses observable systems and routines to regularly monitor instruction and assessment of staff both formally and informally which result in consistent and differentiated support to staff in their efforts to improve teaching and learning.</p><p>Feedback to staff demonstrates strong knowledge of adopted instructional framework and its use in improving instruction and assessment practices resulting in evident growth in teacher efficacy.</p>',
	'<p>Provides leadership and support such that staff participate in collaborative and peer-based systems and routines for monitoring instruction and assessment to support their efforts to improve teaching and learning.</p><p>Feedback to staff demonstrates expert knowledge of adopted instructional framework and it’s use in improving instruction and assessment practices resulting in growth in teacher efficacy for most teachers, demonstrated by staff effectively using the framework to independently and collaboratively reflect, monitor, and adjust instruction and assessment practices.</p>',
	0, '5.1', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Uses adopted instructional framework to evaluate instruction and assessment', '', 
	'<p>Evaluations do not meet minimum district expectations and/or lack adequate or accurate evidence from the adopted instructional framework to substantiate claims about staff performance yielding unreliable staff ratings.</p>', 
	'<p>Evaluations meet minimum district expectations but provide inconsistent evidence from the adopted instructional framework to substantiate claims about staff performance yielding some unreliable staff ratings.</p>', 
	'<p>Evaluations meet minimum district expectations and provide adequate and accurate evidence from the adopted instructional framework to substantiate claims about staff performance yielding valid and reliable staff ratings.</p>',
	'<p>Evaluations exceed district expectations by differentiating needed support for individual teachers to provide consistent evidence from the adopted instructional framework to substantiate claims about staff performance yielding valid and reliable staff ratings.</p>',
	0, '5.2', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Assists staff in developing required student growth plans and identifying valid, reliable sources of evidence of effectiveness', '', 
	'<p>Does not assist staff in the use of multiple types of data for the identification of performance indicators and/or identified performance indicators are insufficient to identify gap-closing student growth goals.</p><p>Does not meet with staff to develop, review, and modify student growth goals (individual or group goals).</p>', 
	'<p>Occasionally assists staff to use multiple types of data in the identification of performance indicators resulting in unreliable gap-closing student growth goals.</p><p>Meets minimum district requirements to develop, review, and modify student growth goals (individual or group goals) but are scheduled to limit the ability to make midcourse corrections to improve teacher practice.</p>', 
	'<p>Regularly assists staff to use multiple types of data in the identification of performance indicators resulting in reliable gap-closing student growth goals.</p><p>Meets minimum district requirements to develop, review, and modify student growth goals (individual or group goals) and are effectively scheduled to allow timely feedback to make midcourse corrections and improve teacher practice.</p>',
	'<p>Consistently provides leadership and support such that staff take ownership for and use multiple types of data to consistently identify effective performance indicators in developing reliable gap-closing student growth goals.</p><p>Consistently provides leadership and support such that staff understand and take ownership to develop, review, and modify student growth goals (individual or group goals) and make midcourse corrections and improve teacher practice.</p>',
	0, '5.3', 2021, 'LEADERSHIP')
	   select @RubricRowID = SCOPE_IDENTITY()
	   insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 3)


	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Managing self', '', 
	'<p>Fails to prioritize time causing missed deadlines and a reputation of unreliability.</p>', 
	'<p>Creates time-management strategies, but struggles occasionally implementing them successfully.</p>', 
	'<p>Creates strategies and systems to regularly meet obligations.</p>',
	'<p>Engages office staff as a partner in developing and implementing personal management strategies.</p>',
	0, '6.1', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Recruiting and hiring', '', 
	'<p>Fails to sell the value of teaching at their school.</p><p>Disregards established hiring processes to ensure a quality staff.</p>', 
	'<p>Limits hiring process to those who apply.</p><p>Follows laws, policies, and district processes in the hiring process. Reference checks are perfunctory.</p>', 
	'<p>Actively recruits skilled and talented teachers and other staff. Considers the need of diversifying the workforce when recruiting.</p><p>Creates a strong hiring process beyond the minimum required. Ensures that thorough background and reference checks are completed in a timely and professional manner.</p>',
	'<p>Engages staff in the recruitment of prospective teachers and other staff.</p><p>Employs a rigorous process of hiring. Goes beyond candidate-supplied references to thoroughly vet applicants.</p>',
	0, '6.2', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Assigning staff', '', 
	'<p>Places teachers’ wishes above student needs in assigning staff.</p>', 
	'<p>Considers both student needs and staff members’ desires in assigning staff.</p>', 
	'<p>Takes a holistic view in assigning staff, but never compromises student needs when deciding on staff assignments.</p>',
	'<p>Creates a culture whereby teacher contributions to staffing assignments put students first.</p>',
	0, '6.3', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Managing fiscal resources', '', 
	'<p>Ignores regulations connected to fiscal management.</p><p>Provides little or no evidence of effectively managing financial resources.</p>', 
	'<p>Usually manages financial decisions in compliance with regulations.</p><p>Often connects spending to improved learning.</p>', 
	'<p>Creates systems to ensure that all compliance requirements are met.</p><p>Strategically manages fiscal resources to improve student learning.</p>',
	'<p>Involves key staff in making or contributing to spending decisions which put student learning first.</p><p>Seeks outside and/or innovative sources of revenue to enhance existing budget.</p>',
	0, '6.4', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C6Node, 4)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Partners with families to promote student learning', '', 
	'<p>Demonstrates no effort to engage families in school activities that promote student learning.</p><p>Fails to share the vision of hope and opportunity that results from healthy family/school partnerships.</p><p>Has lost the trust of parents by allowing confidential information to be inappropriately shared.</p><p>Excludes families from decision making at the school to improve student learning.</p>', 
	'<p>Encourages and supports involvement of families in some school activities that promote student learning.</p><p>Encourages pockets of families within the school community to see an improved future for their children by partnering with the school.</p><p>Practices personal discretion when in possession of personal information about students.</p><p>Limits family participation in some school decision- making processes to improve student learning.</p>', 
	'<p>Encourages and supports consistent and ongoing family engagement in school activities that promote student learning.</p><p>Shares the vision for improving learning and future opportunities for all students through wide-ranging, inclusive family partnerships.</p><p>Assures that all staff practice discretion with personal information about students.</p><p>Consistently implements effective channels for families to participate in school decision making to improve student learning.</p>',
	'<p>Engaged families support student learning, led by staff who value and encourage these partnerships.</p><p>Family members and staff display a strong belief in the power of family/school partnerships to positively impact the futures of children.</p><p>Creates a culture within the school and larger community in which private student, staff, and family information is actively protected and respected by all.</p><p>Participation and engagement by families in school-based decision-making displays widely shared ownership for the student learning.</p>',
	0, '7.1', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Incorporates strategies that engage all families, particularly those that historically have been underserved', '', 
	'<p>Treats parent community as mono-cultural. Makes little or no adjustment to meet needs and interests of under-involved groups within parent community to promote student learning.</p><p>Communication with families is mono-lingual and mono-cultural. As such, some families are less capable of supporting student growth.</p>', 
	'<p>Gives some attention to underserved groups within the parent community, yet these efforts are ineffective and/or unequal in nature in promoting student learning.</p><p>Has not established channels of communication accessible to all families with the aim of supporting student growth.</p>', 
	'<p>Recognizes and reaches out to underserved groups within the parent community to promote student learning.</p><p>Uses multiple communication channels appropriate for cultural and language differences that exist in the community with the aim of supporting student growth.</p>',
	'<p>Students and staff take a leadership role in ensuring every student’s family is engaged with the school to promote student learning.</p><p>Families and staff establish and utilize culturally-inclusive communication systems which support student growth.</p>',
	0, '7.2', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Engages with communities to promote learning', '', 
	'<p>Communication with community designed to promote student learning is sparse or non-existent.</p><p>Is frequently absent from the community; is not perceived as an advocate for students and schools.</p><p>Does not identify and utilize community resources in support of improved student learning.</p>', 
	'<p>Communication with the community to promote student learning is regular, yet is mainly informational.</p><p>Is a member but not necessarily an influential leader in the community’s shared mission to support student learning.</p><p>Identifies and utilizes some community talent and resources in support of improved student learning.</p>', 
	'<p>Builds effective and authentic communication systems between the community and school to promote student learning that are interactive and regularly used.</p><p>Works in partnership with community organizations and informally throughout the community to promote student learning.</p><p>Makes full use of community resources in support of improved teaching and learning.</p>',
	'<p>Staff, parents, and students develop effective and inclusive communication between the school and community in support of student learning.</p><p>Is recognized outside of school for developing and implementing programs in partnership with the greater community that focus on student learning.</p><p>Businesses, community organizations, government entities, and higher education institutions seek to partner with the school to improve student learning.</p>',
	0, '7.3', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C7Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Assesses data and identifies barriers', '', 
	'<p>Does not analyze data by group.</p><p>Does not identify barriers to shrinking gaps.</p>', 
	'<p>Analyzes limited sources of data which are disaggregated at the group level.</p><p>Identifies some barriers which prevent the shrinking of gaps.</p>', 
	'<p>Analyzes multiple sources of data which are disaggregated at the group level.</p><p>Identifies key barriers to close gaps.</p>',
	'<p>Leads in a manner such that teachers regularly create and assess data which are disaggregated at the group level to inform their own practice.</p><p>Leads in a manner such that teachers regularly identify barriers which prevent the shrinking of gaps.</p>',
	0, '8.1', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 1)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Creates plans to dismantle barriers and increase achievements', '', 
	'<p>Fails to create plans to shrink opportunity and achievement gaps.</p>', 
	'<p>Creates plans to shrink opportunity and achievement gaps that are ineffective or difficult to implement.</p>', 
	'<p>Creates plans with staff to shrink opportunity and achievement gaps that are effective and manageable.</p>',
	'<p>Leads in a manner that staff possess the skills to develop the plans and have a personal sense of ownership of the plans.</p>',
	0, '8.2', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 2)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Implements and monitors plans to shrink achievement gaps', '', 
	'<p>Fails to implement plans to shrink opportunity and achievement gaps.</p><p>Fails to monitor and adjust plans to shrink opportunity and achievement gaps.</p>', 
	'<p>Inconsistently implements plans to shrink opportunity and achievement gaps.</p><p>Inconsistently monitors and adjusts plans to shrink opportunity and achievement gaps.</p>', 
	'<p>Implements plans with fidelity to shrink opportunity and achievement gaps.</p><p>Implements a system for monitoring and adjusting plans to shrink opportunity and achievement gaps.</p>',
	'<p>Leads in a manner that staff independently implement plans with fidelity to shrink opportunity and achievement gaps.</p><p>Leads in a manner that staff independently monitor and adjust plans with fidelity to shrink opportunity and achievement gaps.</p>',
	0, '8.3', 2021, 'LEADERSHIP')
	  select @RubricRowID = SCOPE_IDENTITY()
	  insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 3)

	insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides evidence of student growth that results from the school improvement planning process', '', 
	'School improvement planning process results in no improvement in student academic growth.', 
	'School improvement planning process results in minimal improvement in student academic growth.', 
	'School improvement planning process results in measurable improvement in student academic growth.', 
	'School improvement planning process results in significant improvement in student academic growth.', 
	1, 'SG 3.5', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C3Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides evidence of student growth of selected teachers', '', 
	'Multiple measures of student achievement of selected teachers show no academic growth.', 
	'Multiple measures of student achievement of selected teachers show minimal academic growth.', 
	'Multiple measures of student achievement of selected teachers show measurable academic growth.', 
	'Multiple measures of student achievement of selected teachers show significant academic growth.', 
	1, 'SG 5.4', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C5Node, 10)

	 insert RubricRow(Title, Description, PL1Descriptor, PL2Descriptor, PL3Descriptor, PL4Descriptor, IsStudentGrowthAligned,
							ShortName, SchoolYear, FrameworkTagName)
	values('Provides evidence of growth in student learning', '', 
	'Achievement data from multiple sources or data points show no evidence of student growth toward narrowing gaps of targeted student groups.', 
	'Achievement data from multiple sources or data points show minimum evidence of student growth toward narrowing gaps of targeted student groups.', 
	'Achievement data from multiple sources or data points show measurable evidence of student growth toward narrowing gaps of targeted student groups.', 
	'Achievement data from multiple sources or data points show consistent evidence of student growth toward narrowing gaps of targeted student groups.', 
	1, 'SG 8.4', 2021, 'LEADERSHIP')
	 select @RubricRowID = SCOPE_IDENTITY()
	 insert FrameworkNodeRubricRow(RubricRowID, FrameworkNodeID, Sequence) values(@RubricRowID, @C8Node, 10)

