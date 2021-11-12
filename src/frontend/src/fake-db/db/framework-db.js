import mock from "../mock";

const frameworksDB = {
  frameworks: [
    {
      id: 2,
      name: "Danielson State",
      frameworkNodes: [
        {
          id: 9,
          frameworkId: 2,
          shortName: "C1",
          title:
            "Centering instruction on high expectations for student achievement.",
          isStudentGrowthAligned: false,
          sequence: 1,
          rubricRows: [
            {
              id: 39,
              shortName: "2b",
              title: "Establishing a Culture for Learning",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The classroom culture is characterized by a lack of teacher or student commitment to learning and/or little or no investment of student energy into the task at hand. Hard work is not expected or valued.</p><p>Medium or low expectations for student achievement are the norm, with high expectations for learning reserved for only one or two students.</p>",
              pL2Descriptor:
                "<p>The classroom culture is characterized by little commitment to learning by teacher or students.</p><p>The teacher appears to be only going through the motions, and students indicate that they are interested in completion of a task, rather than quality.</p><p>The teacher conveys that student success is the result of natural ability rather than hard work; high expectations for learning are reserved for those students thought to have a natural aptitude for the subject.</p>",
              pL3Descriptor:
                "<p>The classroom culture is a cognitively busy place where learning is valued by all, with high expectations for learning being the norm for most students.</p><p>The teacher conveys that with hard work students can be successful.</p><p>Students understand their role as learners and consistently expend effort to learn.</p><p>Classroom interactions support learning and hard work.</p>",
              pL4Descriptor:
                "<p>The classroom culture is a cognitively vibrant place, characterized by a shared belief in the importance of learning.</p><p>The teacher conveys high expectations for learning by all students and insists on hard work.</p><p>Students assume responsibility for high quality by initiating improvements, making revisions, adding detail, and/or helping peers.</p>",
              lookFor1:
                " <p>The teacher conveys that the reasons for the work are external or trivializes the learning goals and assignments.</p><p>The teacher conveys to at least some students that the work is too challenging for them.</p><p>Students exhibit little or no pride in their work.</p><p>Class time is devoted more to socializing than to learning.</p>",
              lookFor2:
                '<p> Teacher\'s energy for the work is neutral: indicating neither a high level of commitment nor "blowing it off."</p><p>The teacher conveys high expectations for only some students.</p><p>Students comply with the teacher\'s expectations for learning, but don?t indicate commitment on their own initiative for the work.</p><p>Many students indicate that they are looking for an "easy path."</p> ',
              lookFor3:
                "<p>The teacher communicates the importance of learning, and that with hard work all students can be successful in it.</p><p> The teacher demonstrates a high regard for student abilities.</p><p>Teacher conveys an expectation of high levels of student effort.</p><p>Students expend good effort to complete work of high quality.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher communicates a genuine passion for the subject.</p><p>Students indicate that they are not satisfied unless they have complete understanding.</p><p>Student questions and comments indicate a desire to understand the content, rather than, for example, simply learning a procedure for getting the correct answer.</p><p>Students recognize the efforts of their classmates.</p><p>Students take initiative in improving the quality of their work.</p> ',
            },
            {
              id: 43,
              shortName: "3a",
              title: "Communicating with Students",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The instructional purpose of the lesson is unclear to students, and the directions and procedures are confusing.</p><p>The teacher?s explanation of the content contains major errors.</p><p>The teacher?s spoken or written language contains errors of grammar or syntax.</p><p>The teacher?s vocabulary is inappropriate, vague, or used incorrectly, leaving students confused.</p>",
              pL2Descriptor:
                "<p>The teacher?s attempt to explain the instructional purpose has only limited success, and/or directions and procedures must be clarified after initial student confusion.</p><p>The teacher?s explanation of the content may contain minor errors; some portions are clear; other portions are difficult to follow.</p><p>The teacher?s explanation consists of a monologue, with no invitation to the students for intellectual engagement.</p><p>Teacher?s spoken language is correct; how- ever, his or her vocabulary is limited, or not fully appropriate to the students? ages or backgrounds.</p>",
              pL3Descriptor:
                "<p>The teacher clearly communicates instructional purpose of the lesson, including where it is situated within broader learning, and explains procedures and directions clearly.</p><p>Teacher?s explanation of content is well scaffolded, clear and accurate, and connects with students? knowledge and experience.</p><p>During the explanation of content, the teacher invites student intellectual engagement.</p><p>Teacher?s spoken and written language is clear and correct and uses vocabulary appropriate to the students? ages and interests.</p>",
              pL4Descriptor:
                "<p>The teacher links the instructional purpose of the lesson to student interests; the directions and procedures are clear and anticipate possible student misunderstanding.</p><p>The teacher?s explanation of content is thorough and clear, developing conceptual understanding through artful scaffolding and connecting with students? interests.</p><p>Students contribute to extending the content and help explain concepts to their classmates.</p><p>The teacher?s spoken and written language is expressive, and the teacher finds opportunities to extend students? vocabularies.</p>",
              lookFor1:
                "<p> At no time during the lesson does the teacher convey to the students what they will be learning.</p><p> Students indicate through their questions that they are confused as to the learning task.</p><p> The teacher makes a serious content error that will affect students? understanding of the lesson.</p><p>Students indicate through body language or questions that they don?t understand the content being presented.</p><p> Teacher's communications include errors of vocabulary or usage.</p><p>Vocabulary is inappropriate to the age or culture of the students.</p> ",
              lookFor2:
                " <p> The teacher refers in passing to what the students will be learning, or it is written on the board with no elaboration or explanation.</p><p>Teacher must clarify the learning task so students can complete it.</p><p>The teacher makes no serious content errors, although may make a minor error.</p><p> The teacher's explanation of the content consists of a monologue or is purely procedural with minimal participation by students.</p><p>Vocabulary and usage are correct but unimaginative.</p><p>Vocabulary is too advanced or juvenile for the students.</p> ",
              lookFor3:
                "<p> The teacher states clearly, at some point during the lesson, what the students will be learning. ? If appropriate, the teacher models the process to be followed in the task.</p><p> Students engage with the learning task, indicating that they understand what they are to do.</p><p>The teacher makes no content errors.</p><p>Teacher's explanation of content is clear, and invites student participation and thinking.</p><p>Vocabulary and usage are correct and completely suited to the lesson.</p><p>Vocabulary is appropriate to the students' ages and levels of development.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher points out possible areas for misunderstanding.</p><p> Teacher explains content clearly and imaginatively, using metaphors and analogies to bring content to life.</p><p>All students seem to understand the presentation.</p><p>The teacher invites students to explain the content to the class, or to classmates.</p><p>Teacher uses rich language, offering brief vocabulary lessons where appropriate.</p> ',
            },
            {
              id: 45,
              shortName: "3c",
              title: "Engaging Students in Learning",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The learning tasks and activities, materials, resources, instructional groups and technology are poorly aligned with the instructional outcomes or require only rote responses.</p><p>The pace of the lesson is too slow or too rushed.</p><p>Few students are intellectually engaged or interested.</p>",
              pL2Descriptor:
                "<p>The learning tasks and activities are partially aligned with the instructional out- comes but require only minimal thinking by students, allowing most to be passive or merely compliant.</p><p>The pacing of the lesson may not provide students the time needed to be intellectually engaged.</p>",
              pL3Descriptor:
                "<p>The learning tasks and activities are aligned with the instructional outcomes and designed to challenge student thinking, the result being that most students display active intellectual engagement with important and challenging content and are supported in that engagement by teacher scaffolding.</p><p>The pacing of the lesson is appropriate, providing most students the time needed to be intellectually engaged.</p>",
              pL4Descriptor:
                "<p>Virtually all students are intellectually engaged in challenging content through well-designed learning tasks and suitable scaffolding by the teacher and fully aligned with the instructional outcomes.</p><p>In addition, there is evidence of some student initiation of inquiry and of student contribution to the exploration of important content.</p><p>The pacing of the lesson provides students the time needed to intellectually engage with and reflect upon their learning and to consolidate their understanding.</p><p>Students may have some choice in how they complete tasks and may serve as resources for one another.</p>",
              lookFor1:
                " <p>Few students are intellectually engaged in the lesson.</p><p> Learning tasks require only recall or have a single correct response or method.</p><p>The materials used ask students only to perform rote tasks.</p><p> Only one type of instructional group is used (whole group, small groups) when variety would better serve the instructional purpose.</p><p> Instructional materials used are unsuitable to the lesson and/or the students.</p><p>The lesson drags, or is rushed.</p> ",
              lookFor2:
                "<p> Some students are intellectually engaged in the lesson.</p><p> Learning tasks are a mix of those requiring thinking and recall.</p><p> Student engagement with the content is largely passive, learning primarily facts or procedures.</p><p> Students have no choice in how they complete tasks.</p><p> The teacher uses different instructional groupings; these are partially successful in achieving the lesson objectives.</p><p>The materials and resources are partially aligned to the lesson objectives, only some of them demanding student thinking.</p><p> The pacing of the lesson is uneven; suitable in parts, but rushed or dragging in others.</p> ",
              lookFor3:
                " <p>Most students are intellectually engaged in the lesson.</p><p>Learning tasks have multiple correct responses or approaches and/or demand higher-order thinking.</p><p> Students have some choice in how they complete learning tasks.</p><p>There is a mix of different types of groupings, suitable to the lesson objectives.</p><p>Materials and resources support the learning goals and require intellectual engagement, as appropriate.</p><p> The pacing of the lesson provides students the time needed to be intellectually engaged.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Virtually all students are highly engaged in the lesson.</p><p> Students take initiative to modify a learning task to make it more meaningful or relevant to their needs.</p><p>Students suggest modifications to the grouping patterns used.</p><p>Students have extensive choice in how they complete tasks.</p><p>Students suggest modifications or additions to the materials being used.</p><p>Students have an opportunity for reflection and closure on the lesson to consolidate their understanding.</p> ',
            },
          ],
        },
        {
          id: 10,
          frameworkId: 2,
          shortName: "C2",
          title: "Demonstrating effective teaching practices.",
          isStudentGrowthAligned: false,
          sequence: 2,
          rubricRows: [
            {
              id: 44,
              shortName: "3b",
              title: "Using Questions and Discussion Techniques",
              frameworkNodeShortName: "C2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher?s questions are of low cognitive challenge, require single correct responses, and are asked in rapid succession.</p><p>Interaction between teacher and students is predominantly recitation style, with the teacher mediating all questions and answers.</p><p>A few students dominate the discussion.</p>",
              pL2Descriptor:
                "<p>Teacher?s questions lead students through a single path of inquiry, with answers seemingly determined in advance.</p><p>Alternatively, the teacher attempts to frame some questions designed to promote student thinking and understanding, but only a few students are involved.</p><p>Teacher attempts to engage all students in the discussion and to encourage them to respond to one another, but with uneven results.</p>",
              pL3Descriptor:
                "<p>Although the teacher may use some low-level questions, he or she asks the students questions designed to promote thinking and understanding.</p><p>Teacher creates a genuine discussion among students, providing adequate time for students to respond and stepping aside when appropriate.</p><p>Teacher successfully engages most students in the discussion, employing a range of strategies to ensure that most students are heard.</p>",
              pL4Descriptor:
                "<p>Teacher uses a variety or series of questions or prompts to challenge students cognitively, advance high-level thinking and discourse, and promote metacognition.</p><p>Students formulate many questions, initiate topics, and make unsolicited contributions.</p><p>Students themselves ensure that all voices are heard in the discussion.</p>",
              lookFor1:
                "<p>Questions are rapid-fire, and convergent, with a single correct answer.</p><p>Questions do not invite student thinking.</p><p>All discussion is between teacher and students; students are not invited to speak directly to one another.</p><p>A few students dominate the discussion.</p> ",
              lookFor2:
                "<p>Teacher frames some questions designed to promote student thinking, but only a few students are involved.</p><p>The teacher invites students to respond directly to one another's ideas, but few students respond.</p><p>Teacher calls on many students, but only a small number actually participate in the discussion.</p> ",
              lookFor3:
                "<p>Teacher uses open-ended questions, inviting students to think and/or have multiple possible answers.</p><p>The teacher makes effective use of wait time.</p><p>The teacher builds on uses student responses to questions effectively.</p><p>Discussions enable students to talk to one another, without ongoing mediation by the teacher.</p><p>The teacher calls on most students, even those who don?t initially volunteer.</p><p>Many students actively engage in the discussion.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Students initiate higher-order questions.</p><p>Students extend the discussion, enriching it.</p><p>Students invite comments from their classmates during a discussion.</p>',
            },
            {
              id: 48,
              shortName: "4a",
              title: "Reflecting on Teaching",
              frameworkNodeShortName: "C2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher does not know whether a lesson was effective or achieved its instructional outcomes, or he/she profoundly misjudges the success of a lesson.</p><p>Teacher has no suggestions for how a lesson could be improved.</p>",
              pL2Descriptor:
                "<p>Teacher has a generally accurate impression of a lesson?s effectiveness and the extent to which instructional outcomes were met.</p><p>Teacher makes general suggestions about how a lesson could be improved.</p>",
              pL3Descriptor:
                "<p>Teacher makes an accurate assessment of a lesson?s effectiveness and the extent to which it achieved its instructional outcomes and can cite general references to support the judgment.</p><p>Teacher makes a few specific suggestions of what could be tried another time the lesson is taught.</p>",
              pL4Descriptor:
                "<p>Teacher makes a thoughtful and accurate assessment of a lesson?s effectiveness and the extent to which it achieved its instructional out- comes, citing many specific examples from the lesson and weighing the relative strengths of each.</p><p>Drawing on an extensive repertoire of skills, teacher offers specific alternative actions, complete with the probable success of different courses of action.</p>",
              lookFor1:
                " <p>The teacher considers the lesson but draws incorrect conclusions about its effectiveness. </p><p>The teacher makes no suggestions for improvement.</p> ",
              lookFor2:
                " <p>The teacher has a general sense of whether or not instructional practices were effective.</p><p>The teacher offers general modifications for future instruction.</p> ",
              lookFor3:
                "<p>The teacher accurately assesses the effectiveness of instructional activities used.</p><p>The teacher identifies specific ways in which a lesson might be improved.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>the teacher?s assessment of the lesson is thoughtful, and includes specific indicators of effectiveness.</p><p>Teacher?s suggestions for improvement draw on an extensive repertoire.</p> ',
            },
          ],
        },
        {
          id: 11,
          frameworkId: 2,
          shortName: "C3",
          title:
            "Recognizing individual student learning needs and developing strategies to address those needs.",
          isStudentGrowthAligned: true,
          sequence: 3,
          rubricRows: [
            {
              id: 33,
              shortName: "1b",
              title: "Demonstrating Knowledge of Students",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher demonstrates little or no understanding of how students learn and little knowledge of students? backgrounds, cultures, skills, language proficiency, interests, and special needs and does not seek such understanding.</p>",
              pL2Descriptor:
                "<p>Teacher indicates the importance of under- standing how students learn and the students? backgrounds, cultures, skills, language proficiency, interests, and special needs, and attains this knowledge about the class as a whole.</p>",
              pL3Descriptor:
                "<p>Teacher understands the active nature of student learning and attains information about levels of development for groups of students.</p><p>The teacher also purposefully seeks knowledge from several sources of students? backgrounds, cultures, skills, language proficiency, interests, and special needs and attains this knowledge about groups of students.</p>",
              pL4Descriptor:
                "<p>Teacher actively seeks knowledge of students? levels of development and their backgrounds, cultures, skills, language proficiency, interests, and special needs from a variety of sources. This information is acquired for individual students.</p>",
              lookFor1:
                "<p>Teacher does not understand child development characteristics and has unrealistic expectations for students.</p><p>Teacher does not try to ascertain varied ability levels among students in the class.</p><p>Teacher is not aware of student interests or cultural heritages.</p><p>Teacher takes no responsibility to learn about students' medical or learning disabilities.</p> ",
              lookFor2:
                ' <p>Teacher cites developmental theory, but does not seek to integrate it into lesson planning.</p><p>Teacher is aware of the different ability levels in the class, but tends to teach to the "whole group."</p><p>The teacher recognizes that children have different interests and cultural backgrounds, but rarely draws on their contributions or differentiates materials to accommodate those differences.</p><p>The teacher is aware of medical issues and learning disabilities with some students, but does not seek to understand the implications of that knowledge.</p> ',
              lookFor3:
                '<p>The teacher knows, for groups of students, their levels of cognitive development.</p><p>The teacher is aware of the different cultural groups in the class.</p><p>The teacher has a good idea of the range of interests of students in the class.</p><p>The teacher has identified "high," "medium," and "low" groups of students within the class.</p><p>The teacher is well-informed about students? cultural heritage and incorporates this knowledge in lesson planning.</p><p>The teacher is aware of the special needs represented.</p> ',
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher uses ongoing methods to assess students\' skill levels and designs instruction accordingly.</p><p> The teacher seeks out information about their cultural heritage from all students.</p><p>The teacher maintains a system of updated student records and incorporates medical and/or learning needs into lesson plans.</p>',
            },
            {
              id: 47,
              shortName: "3e",
              title: "Demonstrating Flexibility and Responsiveness",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher adheres to the instruction plan in spite of evidence of poor student understanding or lack of interest.</p><p>Teacher ignores student questions; when students experience difficulty, the teacher blames the students or their home environment.</p>",
              pL2Descriptor:
                "<p>Teacher attempts to modify the lesson when needed and to respond to student questions and interests, with moderate success.</p><p>Teacher accepts responsibility for student success but has only a limited repertoire of strategies to draw upon.</p>",
              pL3Descriptor:
                "<p>Teacher promotes the successful learning of all students, making minor adjustments as needed to instruction plans and accommodating student questions, needs, and interests.</p><p>Drawing on a broad repertoire of strategies, the teacher persists in seeking approaches for students who have difficulty learning.</p>",
              pL4Descriptor:
                "<p>Teacher seizes an opportunity to enhance learning, building on a spontaneous event or student interests, or successfully adjusts and differentiates instruction to address individual student misunderstandings.</p><p>Teacher persists in seeking effective approaches for students who need help, using an extensive repertoire of instructional strategies and soliciting additional resources from the school or community.</p>",
              lookFor1:
                " <p>Teacher ignores indications of student boredom or lack of understanding.</p><p>Teacher brushes aside student questions.</p><p>Teacher makes no attempt to incorporate student interests into the lesson.</p><p>The teacher conveys to students that when they have difficulty learning, it is their fault.</p><p>In reflecting on practice, the teacher does not indicate that it is important to reach all students.</p> ",
              lookFor2:
                "<p>Teacher?s efforts to modify the lesson are only partially successful.</p><p>Teacher makes perfunctory attempts to incorporate student questions and interests into the lesson.</p><p>The teacher conveys to students a level of responsibility for their learning, but uncertainty as to how to assist them.</p><p>In reflecting on practice, the teacher indicates the desire to reach all students, but does not suggest strategies to do so.</p> ",
              lookFor3:
                " <p>Teacher successfully makes a minor modification to the lesson.</p><p>Teacher incorporates students? interests and questions into the heart of the lesson.</p><p>The teacher conveys to students that she has other approaches to try when the students experience difficulty.</p><p>In reflecting on practice, the teacher cites multiple approaches undertaken to reach students having difficulty.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Teacher successfully executes a major lesson readjustment when needed.</p><p>Teacher seizes on a teachable moment to enhance a lesson.</p><p>The teacher conveys to students that he won?t consider a lesson ?finished? until every student understands, and that he has a broad range of approaches to use.</p><p>In reflecting on practice, the teacher can cite others in the school and beyond who she has contacted for assistance in reaching some students.</p> ',
            },
            {
              id: 54,
              shortName: "SG 3.1",
              title: "Establish Student Growth Goal(s)",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not establish student growth goal(s) or establishes inappropriate goal(s) for subgroups of students not reaching full learning potential. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              pL2Descriptor:
                "<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full learning potential. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              pL3Descriptor:
                "<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full learning potential. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              pL4Descriptor:
                "<p>Establishes appropriate student growth goal(s) for subgroups of students not reaching full potential in collaboration with students, parents, and other school staff. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 55,
              shortName: "SG 3.2",
              title: "Achievement of Student Growth Goal(s)",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "<p>Growth or achievement data from at least two points in time shows no evidence of growth for most students.</p>",
              pL2Descriptor:
                "<p>Multiple sources of growth or achievement data from at least two points in time show some evidence of growth for some students.</p>",
              pL3Descriptor:
                "<p>Multiple sources of growth or achievement data from at least two points in time show clear evidence of growth for most students.</p>",
              pL4Descriptor:
                "<p>Multiple sources of growth or achievement data from at least two points in time show evidence of high growth for all or nearly all students.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 12,
          frameworkId: 2,
          shortName: "C4",
          title:
            "Providing clear and intentional focus on subject matter content and curriculum.",
          isStudentGrowthAligned: false,
          sequence: 4,
          rubricRows: [
            {
              id: 32,
              shortName: "1a",
              title: "Demonstrating Knowledge of Content and Pedagogy",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>In planning and practice, teacher makes content errors or does not correct errors made by students.</p><p>Teacher?s plans and practice display little understanding of prerequisite relationships important to student?s learning of the content.</p><p>Teacher displays little or no understanding of the range of pedagogical approaches suitable to student?s learning of the content.</p>",
              pL2Descriptor:
                "<p>Teacher is familiar with the important concepts in the discipline but displays lack of awareness of how these concepts relate to one another.</p><p>Teacher?s plans and practice indicate some awareness of prerequisite relationships, although such knowledge may be inaccurate or incomplete.</p><p>Teacher?s plans and practice reflect a limited range of pedagogical approaches to the discipline or to the students.</p>",
              pL3Descriptor:
                "<p>Teacher displays solid knowledge of the important concepts in the discipline and the ways they relate to one another.</p><p>Teacher?s plans and practice reflect accurate understanding of prerequisite relationships among topics and concepts.</p><p>Teacher?s plans and practice reflect familiarity with a wide range of effective pedagogical approaches in the discipline.</p>",
              pL4Descriptor:
                "<p>Teacher displays extensive knowledge of the important concepts in the discipline and the ways they relate both to one another and to other disciplines.</p><p>Teacher?s plans and practice reflect understanding of prerequisite relationships among topics and concepts and provide a link to necessary cognitive structures needed by students to ensure understanding.</p><p>Teacher?s plans and practice reflect familiarity with a wide range of effective pedagogical approaches in the discipline, anticipating student misconceptions.</p>",
              lookFor1:
                "<p>Teacher makes content errors.</p><p>Teacher does not consider prerequisite relationships when planning.</p><p>Teacher's plans use inappropriate strategies for the discipline.</p>",
              lookFor2:
                "<p>Teacher is familiar with the discipline but does not see conceptual relationships.</p><p>Teacher's knowledge of prerequisite relationships is inaccurate or incomplete.</p><p>Lesson and unit plans use limited instructional strategies and some are not be suitable to the content.</p>",
              lookFor3:
                "<p>The teacher can identify important concepts of the discipline, and their relationships to one another.</p><p> The teacher consistently provides clear explanations of the content.</p><p> The teacher answers student questions accurately and provides feedback that furthers their learning.</p><p>The teacher seeks out contentrelated professional development.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Teacher cites intra- and interdisciplinary content relationships.</p><p>Teacher is proactive in uncovering student misconceptions and addressing them before proceeding.</p>',
            },
            {
              id: 34,
              shortName: "1c",
              title: "Setting Instructional Outcomes",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Outcomes represent low expectations for students and lack of rigor, and not all of them reflect important learning in the discipline.</p><p>Outcomes are stated as activities rather than as student learning.</p><p>Outcomes reflect only one type of learning and only one discipline or strand and are suitable for only some students.</p>",
              pL2Descriptor:
                "<p>Outcomes represent moderately high expectations and rigor.</p><p>Some reflect important learning in the discipline and consist of a combination of outcomes and activities.</p><p>Outcomes reflect several types of learning, but teacher has made no attempt at coordination or integration.</p><p>Most of the outcomes are suitable for most of the students in the class in accordance with global assessments of student learning.</p>",
              pL3Descriptor:
                "<p>Most outcomes represent rigorous and important learning in the discipline.</p><p>All the instructional outcomes are clear, are written in the form of student learning, and suggest viable methods of assessment.</p><p>Outcomes reflect several different types of learning and opportunities for coordination.</p><p>Outcomes take into account the varying needs of groups of students.</p>",
              pL4Descriptor:
                "<p>All outcomes represent rigorous and important learning in the discipline.</p><p>The outcomes are clear, are written in the form of student learning, and permit viable methods of assessment.</p><p>Outcomes reflect several different types of learning and, where appropriate, represent opportunities for both coordination and integration.</p><p>Outcomes take into account the varying needs of individual students.</p>",
              lookFor1:
                "<p> Outcomes lack rigor.</p><p>Outcomes do not represent important learning in the discipline.</p><p>Outcomes are not clear or are stated as activities.</p><p>Outcomes are not suitable for many students in the class.</p>",
              lookFor2:
                "<p>Outcomes represent a mixture of low expectations and rigor.</p><p> Some outcomes reflect important learning in the discipline.</p><p> Outcomes are suitable for most of the class.</p> ",
              lookFor3:
                '<p>Outcomes represent high expectations and rigor. ? Outcomes are related to "big ideas" of the discipline.</p><p>Outcomes are written in terms of what students will learn rather than do.</p><p>Outcomes represent a range of outcomes: factual, conceptual understanding, reasoning, social, management, communication.</p><p>Outcomes are suitable to groups of students in the class, differentiated where necessary.</p> ',
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Teacher plans reference curricular frameworks or blueprints to ensure accurate sequencing.</p><p>Teacher connects outcomes to previous and future learning.</p><p>Outcomes are differentiated to encourage individual students to take educational risks.</p>',
            },
            {
              id: 35,
              shortName: "1d",
              title: "Demonstrating Knowledge of Resources",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher is unaware of school or district resources for classroom use, for the expansion of his or her own knowledge, or for students.</p>",
              pL2Descriptor:
                "<p>Teacher displays basic awareness of school or district resources available for classroom use, for the expansion of his or her own knowledge, and for students, but no knowledge of resources available more broadly.</p>",
              pL3Descriptor:
                "<p>Teacher displays awareness of resources?not only through the school and district but also through sources external to the school and on the Internet?available for classroom use, for the expansion of his or her own knowledge, and for students.</p>",
              pL4Descriptor:
                "<p>Teacher displays extensive knowledge of resources?not only through the school and district but also in the community, through professional organizations and universities, and on the Internet?for classroom use, for the expansion of his or her own knowledge, and for students.</p>",
              lookFor1:
                "<p>The teacher only uses district provided materials, even when more variety would assist some students.</p><p>The teacher does not seek out resources available to expand his/her own skill.</p><p>Although aware of some student needs, the teacher does not inquire about possible resources.</p>",
              lookFor2:
                "<p>The teacher uses materials in the school library, but does not search beyond the school for resources.</p><p>The teacher participates in contentarea workshops offered by the school, but does not pursue other professional development.</p><p>The teacher locates materials and resources for students that are available through the school, but does not pursue any other avenues.</p>",
              lookFor3:
                "<p>Texts are at varied levels.</p><p>Texts are supplemented by guest speakers and field experiences.</p><p>Teacher facilitates Internet resources.</p><p>Resources are multi-disciplinary.</p><p>Teacher expands knowledge with professional learning groups and organizations.</p><p>Teacher pursues options offered by universities.</p><p>Teacher provides lists of resources outside the class for students to draw on.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Texts are matched to student skill level.</p><p>The teacher has ongoing relationship with colleges and universities that support student learning.</p><p>The teacher maintains log of resources for student reference.</p><p>The teacher pursues apprenticeships to increase discipline knowledge.</p><p>The teacher facilitates student contact with resources outside the classroom.</p>',
            },
            {
              id: 36,
              shortName: "1e",
              title: "Designing Coherent Instruction",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The series of learning experiences is poorly aligned with the instructional outcomes and does not represent a coherent structure.</p><p>The activities are not designed to engage students in active intellectual activity and have unrealistic time allocations. Instructional groups do not support the instructional outcomes and offer no variety.</p>",
              pL2Descriptor:
                "<p>Some of the learning activities and materials are suitable to the instructional outcomes and represent a moderate cognitive challenge but with no differentiation for different students. Instructional groups partially support the instructional outcomes, with an effort by the teacher at providing some variety.</p><p>The lesson or unit has a recognizable structure; the progression of activities is uneven, with most time allocations reason- able.</p>",
              pL3Descriptor:
                "<p>Teacher coordinates knowledge of content, of students, and of resources, to design a series of learning experiences aligned to instructional outcomes and suitable to groups of students.</p><p>The learning activities have reasonable time allocations; they represent significant cognitive challenge, with some differentiation for different groups of students.</p><p>The lesson or unit has a clear structure, with appropriate and varied use of instructional groups.</p>",
              pL4Descriptor:
                "<p>Plans represent the coordination of in-depth content knowledge, understanding of different students? needs, and available resources (including technology), resulting in a series of learning activities designed to engage students in high-level cognitive activity.</p><p>Learning activities are differentiated appropriately for individual learners. Instructional groups are varied appropriately with some opportunity for student choice.</p><p>The lesson?s or unit?s structure is clear and allows for different pathways according to diverse student needs.</p>",
              lookFor1:
                "<p>Learning activities are boring and/or not well aligned to the instructional goals.</p><p>Materials are not engaging or do not meet instructional outcomes.</p><p>Instructional groups do not support learning.</p><p>Lesson plans are not structured or sequenced and are unrealistic in their expectations.</p>",
              lookFor2:
                "<p>Learning activities are moderately challenging.</p><p>Learning resources are suitable, but there is limited variety.</p><p>Instructional groups are random or only partially support objectives.</p><p>Lesson structure is uneven or may be unrealistic in terms of time expectations.</p>",
              lookFor3:
                "<p>Learning activities are matched to instructional outcomes.</p><p>Activities provide opportunity for higher-level thinking.</p><p>Teacher provides a variety of appropriately challenging materials and resources</p><p>Instructional student groups are organized thoughtfully to maximize learning and build on student strengths.</p><p>The plan for the lesson or unit is well structured, with reasonable time allocations.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Activities permit student choice.</p><p>Learning experiences connect to other disciplines.</p><p>Teacher provides a variety of appropriately challenging resources that are differentiated for students in the class.</p><p>Lesson plans differentiate for individual student needs.</p>',
            },
          ],
        },
        {
          id: 13,
          frameworkId: 2,
          shortName: "C5",
          title:
            "Fostering and managing a safe, positive learning environment.",
          isStudentGrowthAligned: false,
          sequence: 5,
          rubricRows: [
            {
              id: 38,
              shortName: "2a",
              title: "Creating an Environment of Respect and Rapport",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Patterns of classroom interactions, both between the teacher and students and among students, are mostly negative, inappropriate, or insensitive to students? ages, cultural backgrounds, and developmental levels. Interactions are characterized by sarcasm, put-downs, or conflict.</p><p>Teacher does not deal with disrespectful behavior.</p>",
              pL2Descriptor:
                "<p>Patterns of classroom interactions, both between the teacher and students and among students, are generally appropriate but may reflect occasional inconsistencies, favoritism, and disregard for students? ages, cultures, and developmental levels.</p><p>Students rarely demonstrate disrespect for one another.</p><p>Teacher attempts to respond to disrespectful behavior, with uneven results. The net result of the interactions is neutral, conveying neither warmth nor conflict.</p>",
              pL3Descriptor:
                "<p>Teacher-student interactions are friendly and demonstrate general caring and respect. Such interactions are appropriate to the ages of the students.</p><p>Students exhibit respect for the teacher. Inter- actions among students are generally polite and respectful.</p><p>Teacher responds successfully to disrespectful behavior among students. The net result of the interactions is polite and respectful, but impersonal.</p>",
              pL4Descriptor:
                "<p>Classroom interactions among the teacher and individual students are highly respectful, reflecting genuine warmth and caring and sensitivity to students as individuals.</p><p>Students exhibit respect for the teacher and contribute to high levels of civil interaction between all members of the class. The net result of interactions is that of connections with students as individuals.</p>",
              lookFor1:
                "<p>Teacher uses disrespectful talk towards students. Student body language indicates feelings of hurt or insecurity.</p><p>Students use disrespectful talk towards one another with no response from the teacher.</p><p>Teacher displays no familiarity with or caring about individual students? interests or personalities.</p>",
              lookFor2:
                "<p>The quality of interactions between teacher and students, or among students, is uneven, with occasional disrespect.</p><p>Teacher attempts to respond to disrespectful behavior among students, with uneven results.</p><p>Teacher attempts to make connections with individual students, but student reactions indicate that the efforts are not completely successful or are unusual.</p> ",
              lookFor3:
                " <p>Talk between teacher and students and among students is uniformly respectful.</p><p>Teacher responds to disrespectful behavior among students.</p><p>Teacher makes superficial connections with individual students.</p> ",
              lookFor4:
                "<p>In addition to the characteristics of \"proficient,\"</p><p>Teacher demonstrates knowledge and caring about individual students? lives beyond school.</p><p>When necessary, students correct one another in their conduct towards classmates.</p><p>There is no disrespectful behavior among students.</p><p>The teacher's response to a student's incorrect response respects the student's dignity.</p>",
            },
            {
              id: 40,
              shortName: "2c",
              title: "Managing Classroom Procedures",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Much instructional time is lost through inefficient classroom routines and procedures.</p><p>There is little or no evidence that the teacher is managing instructional groups, transitions, and/or the handling of materials and supplies effectively.</p><p>There is little evidence that students know or follow established routines.</p>",
              pL2Descriptor:
                "<p>Some instructional time is lost through only partially effective classroom routines and procedures.</p><p>The teacher?s management of instructional groups, transitions, and/or the handling of materials and supplies is inconsistent, the result being some disruption of learning.</p><p>With regular guidance and prompting, students follow established routines.</p>",
              pL3Descriptor:
                "<p>There is little loss of instructional time because of effective classroom routines and procedures.</p><p>The teacher?s management of instructional groups and the handling of materials and sup- plies are consistently successful.</p><p>With minimal guidance and prompting, students follow established classroom routines.</p>",
              pL4Descriptor:
                "<p>Instructional time is maximized because of efficient classroom routines and procedures.</p><p>Students contribute to the management of instructional groups, transitions, and the handling of materials and supplies.</p><p>Routines are well understood and may be initiated by students.</p>",
              lookFor1:
                "<p>Students not working with the teacher are disruptive to the class.</p><p>There are no established procedures for distributing and collecting materials.</p><p>Procedures for other activities are confused or chaotic.</p> ",
              lookFor2:
                " <p>Small groups are only partially engaged while not working directly with the teacher.</p><p>Procedures for transitions, and distribution/collection of materials, seem to have been established, but their operation is rough.</p><p>Classroom routines function unevenly.</p> ",
              lookFor3:
                " <p>The students are productively engaged during small group work.</p><p>Transitions between large and small group activities are smooth.</p><p> Routines for distribution and collection of materials and supplies work efficiently.</p><p>Classroom routines function smoothly.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Students take the initiative with their classmates to ensure that their time is used productively.</p><p> Students themselves ensure that transitions and other routines are accomplished smoothly.</p><p>Students take initiative in distributing and collecting materials efficiently.</p> ',
            },
            {
              id: 41,
              shortName: "2d",
              title: "Managing Student Behavior",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>There appear to be no established standards of conduct and little or no teacher monitoring of student behavior.</p><p>Students challenge the standards of conduct.</p><p>Response to students? misbehavior is repressive or disrespectful of student dignity.</p>",
              pL2Descriptor:
                "<p>Standards of conduct appear to have been established, but their implementation is inconsistent.</p><p>Teacher tries, with uneven results, to monitor student behavior and respond to student misbehavior.</p><p>There is inconsistent implementation of the standards of conduct.</p>",
              pL3Descriptor:
                "<p>Student behavior is generally appropriate.</p><p>The teacher monitors student behavior against established standards of conduct.</p><p>Teacher response to student misbehavior is consistent, proportionate, respectful to students, and effective.</p>",
              pL4Descriptor:
                "<p>Student behavior is entirely appropriate.</p><p>Students take an active role in monitoring their own behavior and that of other students against standards of conduct.</p><p>Teachers? monitoring of student behavior is subtle and preventive.</p><p>Teacher?s response to student misbehavior is sensitive to individual student needs and respects students? dignity.</p>",
              lookFor1:
                "<p> The classroom environment is chaotic, with no apparent standards of conduct.</p><p> The teacher does not monitor student behavior.</p><p>Some students violate classroom rules, without apparent teacher awareness.</p><p> When the teacher notices student misbehavior, s/he appears helpless to do anything about it.</p> ",
              lookFor2:
                " <p>Teacher attempts to maintain order in the classroom but with uneven success; standards of conduct, if they exist, are not evident.</p><p> Teacher attempts to keep track of student behavior, but with no apparent system.</p><p>The teacher?s response to student misbehavior is inconsistent: sometimes very harsh; other times lenient.</p> ",
              lookFor3:
                " <p>Standards of conduct appear to have been established.</p><p>Student behavior is generally appropriate.</p><p>The teacher frequently monitors student behavior.</p><p>Teacher?s response to student misbehavior is effective.</p><p> Teacher acknowledges good behavior.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Student behavior is entirely appropriate; no evidence of student misbehavior.</p><p>The teacher monitors student behavior without speaking ? just moving about.</p><p>Students respectfully intervene as appropriate with classmates to ensure compliance with standards of conduct.</p> ',
            },
            {
              id: 42,
              shortName: "2e",
              title: "Organizing Physical Space",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The physical environment is unsafe, or many students don?t have access to learning resources.</p><p>There is poor coordination between the lesson activities and the arrangement of furniture and resources, including computer technology.</p>",
              pL2Descriptor:
                "<p>The classroom is safe, and essential learn- ing is accessible to most students.</p><p>The teacher?s use of physical resources, including computer technology, is moderately effective.</p><p>Teacher makes some attempt to modify the physical arrangement to suit learning activities, with partial success.</p>",
              pL3Descriptor:
                "<p>The classroom is safe, and learning is accessible to all students; teacher ensures that the physical arrangement is appropriate to the learning activities.</p><p>Teacher makes effective use of physical resources, including computer technology.</p>",
              pL4Descriptor:
                "<p>The classroom is safe, and learning is accessible to all students, including those with special needs.</p><p>Teacher makes effective use of physical resources, including computer technology. The teacher ensures that the physical arrangement is appropriate to the learning activities.</p><p>Students contribute to the use or adaptation of the physical environment to advance learning.</p>",
              lookFor1:
                " <p> There are physical hazards in the classroom, endangering student safety.</p><p> Many students can?t see or hear the teacher or the board.</p><p> Available technology is not being used, even if available and its use would enhance the lesson.</p> ",
              lookFor2:
                "<p> The physical environment is safe, and most students can see and hear.</p><p> The physical environment is not an impediment to learning, but does not enhance it.</p><p>The teacher makes limited use of available technology and other resources.</p> ",
              lookFor3:
                " <p>The classroom is safe, and all students are able to see and hear.</p><p>The classroom is arranged to support the instructional goals and learning activities.</p><p>The teacher makes appropriate use of available technology.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Modifications are made to the physical environment to accommodate students with special needs.</p><p>There is total alignment between the goals of the lesson and the physical environment.</p><p>Students take the initiative to adjust the physical environment.</p><p>Teachers and students make extensive and imaginative use of available technology.</p> ',
            },
          ],
        },
        {
          id: 14,
          frameworkId: 2,
          shortName: "C6",
          title:
            "Using multiple student data elements to modify instruction and improve student learning.",
          isStudentGrowthAligned: true,
          sequence: 6,
          rubricRows: [
            {
              id: 37,
              shortName: "1f",
              title: "Designing Student Assessments",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Assessment procedures are not congruent with instructional outcomes; the proposed approach contains no criteria or standards.</p><p>Teacher has no plan to incorporate formative assessment in the lesson or unit nor any plan to use assessment results in designing future instruction.</p>",
              pL2Descriptor:
                "<p>Some of the instructional outcomes are assessed through the proposed approach, but others are not.</p><p>Assessment criteria and standards have been developed, but they are not clear.</p><p>Approach to the use of formative assessment is rudimentary, including only some of the instructional outcomes.</p><p>Teacher intends to use assessment results to plan for future instruction for the class as a whole.</p>",
              pL3Descriptor:
                "<p>Teacher?s plan for student assessment is aligned with the instructional outcomes; assessment methodologies may have been adapted for groups of students.</p><p>Assessment criteria and standards are clear. Teacher has a well-developed strategy for using formative assessment and has designed particular approaches to be used.</p><p>Teacher intends to use assessment results to plan for future instruction for groups of students.</p>",
              pL4Descriptor:
                "<p>Teacher?s plan for student assessment is fully aligned with the instructional outcomes and has clear criteria and standards that show evidence of student contribution to their development.</p><p>Assessment methodologies have been adapted for individual students, as needed.</p><p>The approach to using formative assessment is well designed and includes student as well as teacher use of the assessment information. Teacher intends to use assessment results to plan future instruction for individual students.</p>",
              lookFor1:
                " <p>Assessments do not match instructional outcomes.</p><p>Assessments have no criteria.</p><p>No formative assessments have been designed.</p><p>Assessment results do not affect future plans.</p>",
              lookFor2:
                "<p>Only some of the instructional outcomes are addressed in the planned assessments.</p><p>Assessment criteria are vague.</p><p>Plans refer to the use of formative assessments, but they are not fully developed.</p><p>Assessment results are used to design lesson plans for the whole class, not individual students.</p> ",
              lookFor3:
                "<p>All the learning outcomes have a method for assessment.</p><p>Assessment types match learning expectations.</p><p>Plans indicate modified assessments for some students as needed.</p><p>Assessment criteria are clearly written.</p><p>Plans include formative assessments to use during instruction.</p><p>Lesson plans indicate possible adjustments based on formative assessment data.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Assessments provide opportunities for student choice.</p><p>Students participate in designing assessments for their own work.</p><p>Teacher-designed assessments are authentic with real-world application, as appropriate.</p><p>Students develop rubrics according to teacher-specified learning objectives.</p><p>Students are actively involved in collecting information from formative assessments and provide input.</p>',
            },
            {
              id: 46,
              shortName: "3d",
              title: "Using Assessment in Instruction",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>There is little or no assessment or monitoring of student learning; feedback is absent or of poor quality.</p><p>Students do not appear to be aware of the assessment criteria and do not engage in self-assessment.</p>",
              pL2Descriptor:
                "<p>Assessment is used sporadically by teacher and/or students to support instruction through some monitoring of progress in learning.</p><p>Feedback to students is general, students appear to be only partially aware of the assessment criteria used to evaluate their work, and few assess their own work.</p><p>Questions, prompts, and assessments are rarely used to diagnose evidence of learning.</p>",
              pL3Descriptor:
                "<p>Assessment is used regularly by teacher and/or students during the lesson through monitoring of learning progress and results in accurate, specific feedback that advances learning.</p><p>Students appear to be aware of the assessment criteria; some of them engage in self-assessment.</p><p>Questions, prompts, assessments are used to diagnose evidence of learning.</p>",
              pL4Descriptor:
                "<p>Assessment is fully integrated into instruction through extensive use of formative assessment.</p><p>Students appear to be aware of, and there is some evidence that they have contributed to, the assessment criteria.</p><p>Students self-assess and monitor their progress.</p><p>A variety of feedback, from both their teacher and their peers, is accurate, specific, and advances learning.</p><p>Questions, prompts, assessments are used regularly to diagnose evidence of learning by individual students.</p>",
              lookFor1:
                " <p>The teacher gives no indication of what high quality work looks like.</p><p> The teacher makes no effort to determine whether students understand the lesson.</p><p> Feedback is only global.</p><p> The teacher does not ask students to evaluate their own or classmates? work.</p> ",
              lookFor2:
                " <p> There is little evidence that the students understand how their work will be evaluated.</p><p> Teacher monitors understanding through a single method, or without eliciting evidence of understanding from all students.</p><p> Teacher requests global indications of student understanding.</p><p> Feedback to students is not uniformly specific, not oriented towards future improvement of work.</p><p>The teacher makes only minor attempts to engage students in selfor peer-assessment.</p><p> The teacher?s attempts to adjust the lesson are partially successful.</p> ",
              lookFor3:
                "<p> Students indicate that they clearly understand the characteristics of highquality work.</p><p>The teacher elicits evidence of student understanding during the lesson Students are invited to assess their own work and make improvements.</p><p>Feedback includes specific and timely guidance for at least groups of students.</p><p> The teacher attempts to engage students in self- or peer-assessment.</p><p> When necessary, the teacher makes adjustments to the lesson to enhance understanding by groups of students.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>There is evidence that students have helped establish the evaluation criteria.</p><p>Teacher monitoring of student understanding is sophisticated and continuous: the teacher is constantly ?taking the pulse? of the class.</p><p>Teacher makes frequent use of strategies to elicit information about individual student understanding.</p><p>Feedback to students is specific and timely, and is provided from many sources, including other students.</p><p>Students monitor their own understanding, either on their own initiative or as a result of tasks set by the teacher.</p><p>The teacher?s adjustments to the lesson are designed to assist individual students.</p> ',
            },
            {
              id: 49,
              shortName: "4b",
              title: "Maintaining Accurate Records",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments and student progress in learning is nonexistent or in disarray.</p><p>Teacher?s records for noninstructional activities are in disarray, resulting in errors and confusion.</p>",
              pL2Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments and student progress in learning is rudimentary and only partially effective.</p><p>Teacher?s records for noninstructional activities are adequate but require frequent monitoring to avoid errors.</p>",
              pL3Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments, student progress in learning, and noninstructional records is fully effective.</p>",
              pL4Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments, student progress in learning, and noninstructional records is fully effective.</p><p>Students contribute information and participate in maintaining the records.</p>",
              lookFor1:
                "<p>Absence of a system for either instructional or non-instructional records. </p><p>Record-keeping systems that are in disarray so as to provide incorrect or confusing information. </p>",
              lookFor2:
                "<p>The teacher has a process for recording student work completion. However, it may be out-of-date or does not permit students to access the information. </p><p>The teacher?s process for tracking student progress is cumbersome to use. </p><p>The teacher has a process for tracking some non-instructional information, but not all, or it may contain some errors. </p>",
              lookFor3:
                "<p>The teacher?s process for recording student work completion is efficient and effective; students have access to information about completed and/or missing assignments. </p><p>The teacher has an efficient and effective process for recording student attainment of learning goals; students are able to see how they?re progressing. </p><p>The teacher?s process for recording non-instructional information is both efficient and effective.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Students contribute to and maintain records indicating completed and outstanding work assignments. </p><p>Students contribute to and maintain data files indicating their own progress in learning. </p><p>Students contribute to maintaining non-instructional records for the class.</p>',
            },
            {
              id: 56,
              shortName: "SG 6.1",
              title: "Establish Student Growth Goal(s)",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not establish student growth goal(s) or establishes inappropriate goal(s) for whole classroom. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              pL2Descriptor:
                "<p>Establishes appropriate student growth goal(s) for whole classroom. Goal(s) do not identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              pL3Descriptor:
                "<p>Establishes appropriate student growth goal(s) for whole classroom. Goal(s) identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              pL4Descriptor:
                "<p>Establishes appropriate student growth goal(s) for students in collaboration with students and parents. These whole classroom goals align to school goal(s). Goals identify multiple, high-quality sources of data to monitor, adjust, and evaluate achievement of goal(s).</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 57,
              shortName: "SG 6.2",
              title: "Achievement of Student Growth Goal(s)",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "<p>Growth or achievement data from at least two points in time shows no evidence of growth for most students.</p>",
              pL2Descriptor:
                "<p>Multiple sources of growth or achievement data from at least two points in time show some evidence of growth for some students.</p>",
              pL3Descriptor:
                "<p>Multiple sources of growth or achievement data from at least two points in time show clear evidence of growth for most students.</p>",
              pL4Descriptor:
                "<p>Multiple sources of growth or achievement data from at least two points in time show evidence of high growth for all or nearly all students.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 15,
          frameworkId: 2,
          shortName: "C7",
          title:
            "Communicating and collaborating with parents and the school community.",
          isStudentGrowthAligned: false,
          sequence: 7,
          rubricRows: [
            {
              id: 50,
              shortName: "4c",
              title: "Communicating with Families",
              frameworkNodeShortName: "C7",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher communication with families? about the instructional program, about individual students?is sporadic or culturally inappropriate.</p><p>Teacher makes no attempt to engage families in the instructional program.</p>",
              pL2Descriptor:
                "<p>Teacher makes sporadic attempts to communicate with families about the instructional program and about the progress of individual students but does not attempt to engage families in the instructional program. Communications are one-way and not always appropriate to the cultural norms of those families.</p>",
              pL3Descriptor:
                "<p>Teacher communicates frequently with families about the instructional program and conveys information about individual student progress.</p><p>Teacher makes some attempts to engage families in the instructional program.</p><p>Information to families is conveyed in a culturally appropriate manner.</p>",
              pL4Descriptor:
                "<p>Teacher?s communication with families is frequent and sensitive to cultural traditions, with students contributing to the communication.</p><p>Response to family concerns is handled with professional and cultural sensitivity.</p><p>Teacher?s efforts to engage families in the instructional program are frequent and successful.</p>",
              lookFor1:
                "<p>Little or no information regarding instructional program available to parents. </p><p>Families are unaware of their children?s progress. </p><p>Lack of family engagement activities. </p><p>Culturally inappropriate communication. </p> ",
              lookFor2:
                " <p>School or district-created materials about the instructional program are sent home. </p><p>Infrequent or incomplete information sent home by teachers about the instructional program. </p><p>Teacher maintains school-required grade book but does little else to inform families about student progress. </p><p>Teacher communications are sometimes inappropriate to families? cultural norms. </p> ",
              lookFor3:
                " <p>Information about the instructional program is available on a regular basis. </p><p>The teacher sends information about student progress home on a regular basis. </p><p>Teacher develops activities designed to successfully engage families in their children?s learning, as appropriate.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>On a regular basis, students develop materials to inform their families about the instructional program. </p><p>Students maintain accurate records about their individual learning progress and frequently share this information with families. </p><p>Students contribute to regular and ongoing projects designed to engage families in the learning process. </p> ',
            },
          ],
        },
        {
          id: 16,
          frameworkId: 2,
          shortName: "C8",
          title:
            "Exhibiting collaborative and collegial practices focused on improving instructional practice and student learning.",
          isStudentGrowthAligned: true,
          sequence: 8,
          rubricRows: [
            {
              id: 51,
              shortName: "4d",
              title: "Participating in a Professional Community",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher?s relationships with colleagues are negative or self-serving.</p><p>Teacher avoids participation in a professional culture of inquiry, resisting opportunities to become involved.</p><p>Teacher avoids becoming involved in school events or school and district projects.</p>",
              pL2Descriptor:
                "<p>Teacher maintains cordial relationships with colleagues to fulfill duties that the school or district requires.</p><p>Teacher becomes involved in the school?s culture of professional inquiry when invited to do so.</p><p>Teacher participates in school events and school and district projects when specifically asked to do so.</p>",
              pL3Descriptor:
                "<p>Teacher?s relationships with colleagues are characterized by mutual support and cooperation; teacher actively participates in a culture of professional inquiry.</p><p>Teacher volunteers to participate in school events and in school and district projects, making a substantial contribution.</p>",
              pL4Descriptor:
                "<p>Teacher?s relationships with colleagues are characterized by mutual support and cooperation, with the teacher taking initiative in assuming leadership among the faculty.</p><p>Teacher takes a leadership role in promoting a culture of professional inquiry.</p><p>Teacher volunteers to participate in school events and district projects making a substantial contribution, and assuming a leadership role in at least one aspect of school or district life.</p>",
              lookFor1:
                "<p>The teacher?s relationship with colleagues is characterized by negativity or combativeness. </p><p>The teacher purposefully avoids contributing to activities promoting professional inquiry. </p><p>The teacher avoids involvement in school activities and school district and community projects. </p> ",
              lookFor2:
                " <p>The teacher has pleasant relationship with colleagues. </p><p>When invited, the teacher participates in activities related to professional inquiry. </p><p>When asked, the teacher participates in school activities, and school district and community projects. </p> ",
              lookFor3:
                " <p>The teacher has supportive and collaborative relationships with colleagues. </p><p>The teacher regularly participates in activities related to professional inquiry. </p><p>The teacher frequently volunteers to participate in school events and school district and community projects.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher takes a leadership role in promoting activities related to professional inquiry. </p><p>The teacher regularly contributes to and leads events that positively impact school life. </p><p>The teacher regularly contributes to and leads significant school district and community projects. </p> ',
            },
            {
              id: 52,
              shortName: "4e",
              title: "Growing and Developing Professionally",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher engages in no professional development activities to enhance knowledge or skill.</p><p>Teacher resists feedback on teaching performance from either supervisors or more experienced colleagues.</p><p>Teacher makes no effort to share knowledge with others or to assume professional responsibilities.</p>",
              pL2Descriptor:
                "<p>Teacher participates in professional activities to a limited extent when they are convenient.</p><p>Teacher accepts, with some reluctance, feedback on teaching performance from both supervisors and colleagues.</p><p>Teacher finds limited ways to contribute to the profession.</p>",
              pL3Descriptor:
                "<p>Teacher seeks out opportunities for professional development to enhance content knowledge and pedagogical skill.</p><p>Teacher welcomes feedback from colleagues?either when made by supervisors or when opportunities arise through professional collaboration.</p><p>Teacher participates actively in assisting other educators.</p>",
              pL4Descriptor:
                "<p>Teacher seeks out opportunities for professional development and makes a systematic effort to conduct action research.</p><p>Teacher seeks out feedback on teaching from both supervisors and colleagues.</p><p>Teacher initiates important activities to contribute to the profession.</p>",
              lookFor1:
                " <p>The teacher is not involved in any activity that might enhance knowledge or skill. </p><p>The teacher purposefully resists discussing performance with supervisors or colleagues. </p><p>The teacher ignores invitations to join professional organizations or attending conferences. </p> ",
              lookFor2:
                " <p>The teacher participates in professional activities when required or when provided by the school district. </p><p>The teacher reluctantly accepts feedback from supervisors and colleagues. </p><p>The teacher contributes in a limited fashion to educational professional organizations. </p> ",
              lookFor3:
                " <p>The teacher seeks regular opportunities for continued professional development. </p><p>The teacher welcomes colleagues and supervisors in the classroom for the purposes of gaining insight from their feedback. </p><p>The teacher actively participates in professional organizations designed to contribute to the profession.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher seeks regular opportunities for continued professional development, including initiating action research. </p><p>The teacher actively seeks feedback from supervisors and colleagues. </p><p>The teacher takes an active leadership role in professional organizations in order to contribute to the teaching profession. </p> ',
            },
            {
              id: 53,
              shortName: "4f",
              title: "Showing Professionalism",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher displays dishonesty in interactions with colleagues, students, and the public.</p><p>Teacher is not alert to students? needs and contributes to school practices that result in some students? being ill served by the school.</p><p>Teacher makes decisions and recommendations based on self-serving interests. Teacher does not comply with school and district regulations.</p>",
              pL2Descriptor:
                "<p>Teacher is honest in interactions with col- leagues, students, and the public.</p><p>Teacher attempts, though inconsistently, to serve students. Teacher does not knowingly contribute to some students? being ill served by the school.</p><p>Teacher?s decisions and recommendations are based on limited but genuinely professional considerations.</p><p>Teacher complies minimally with school and district regulations, doing just enough to get by.</p>",
              pL3Descriptor:
                "<p>Teacher displays high standards of honesty, integrity, and confidentiality in interactions with colleagues, students, and the public.</p><p>Teacher is active in serving students, working to ensure that all students receive a fair opportunity to succeed.</p><p>Teacher maintains an open mind in team or departmental decision making.</p><p>Teacher complies fully with school and district regulations.</p>",
              pL4Descriptor:
                "<p>Teacher takes a leadership role with colleagues and can be counted on to hold to the highest standards of honesty, integrity, and confidentiality.</p><p>Teacher is highly proactive in serving students, seeking out resources when needed. Teacher makes a concerted effort to challenge negative attitudes or practices to ensure that all students, particularly those traditionally under- served, are honored in the school.</p><p>Teacher takes a leadership role in team or departmental decision making and helps ensure that such decisions are based on the highest professional standards.</p><p>Teacher complies fully with school and district regulations, taking a leadership role with col- leagues.</p>",
              lookFor1:
                "<p>Teacher is dishonest.</p><p>Teacher does not notice the needs of students. </p><p>The teacher engages in practices that are self-serving. </p><p>The teacher willfully rejects school district regulations. </p> ",
              lookFor2:
                " <p>Teacher is honest. </p><p>Teacher notices the needs of students, but is inconsistent in addressing them. </p><p>Teacher does not notice that some school practices result in poor conditions for students. </p><p>Teacher makes decisions professionally, but on a limited basis. </p><p>Teacher complies with school district regulations. </p> ",
              lookFor3:
                " <p>Teacher is honest and known for having high standards of integrity. </p><p>Teacher actively addresses student needs. </p><p>Teacher actively works to provide opportunities for student success. </p><p>Teacher willingly participates in team and departmental decisionmaking. </p><p>Teacher complies completely with school district regulations. </p> ",
              lookFor4:
                "<p>Teacher is considered a leader in terms of honesty, integrity, and confidentiality. </p><p>Teacher is highly proactive in serving students. </p><p>Teacher makes a concerted effort to ensure opportunities are available for all students to be successful. </p><p>Teacher takes a leadership role in team and departmental decisionmaking. </p><p>Teacher takes a leadership role regarding school district regulations. </p> ",
            },
            {
              id: 58,
              shortName: "SG 8.1",
              title: "Establish Team Student Growth Goal(s)",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not collaborate or reluctantly collaborates with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>",
              pL2Descriptor:
                "<p>Does not consistently collaborate with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>",
              pL3Descriptor:
                "<p>Consistently and actively collaborates with other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>",
              pL4Descriptor:
                "<p>Leads other grade, school, or district team members to establish goal(s), to develop and implement common, high-quality measures, and to monitor growth and achievement during the year.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Danielson Instructional",
      frameworkNodes: [
        {
          id: 17,
          frameworkId: 3,
          shortName: "D1",
          title: "Planning and Preparation",
          isStudentGrowthAligned: false,
          sequence: 1,
          rubricRows: [
            {
              id: 32,
              shortName: "1a",
              title: "Demonstrating Knowledge of Content and Pedagogy",
              frameworkNodeShortName: "D1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>In planning and practice, teacher makes content errors or does not correct errors made by students.</p><p>Teacher?s plans and practice display little understanding of prerequisite relationships important to student?s learning of the content.</p><p>Teacher displays little or no understanding of the range of pedagogical approaches suitable to student?s learning of the content.</p>",
              pL2Descriptor:
                "<p>Teacher is familiar with the important concepts in the discipline but displays lack of awareness of how these concepts relate to one another.</p><p>Teacher?s plans and practice indicate some awareness of prerequisite relationships, although such knowledge may be inaccurate or incomplete.</p><p>Teacher?s plans and practice reflect a limited range of pedagogical approaches to the discipline or to the students.</p>",
              pL3Descriptor:
                "<p>Teacher displays solid knowledge of the important concepts in the discipline and the ways they relate to one another.</p><p>Teacher?s plans and practice reflect accurate understanding of prerequisite relationships among topics and concepts.</p><p>Teacher?s plans and practice reflect familiarity with a wide range of effective pedagogical approaches in the discipline.</p>",
              pL4Descriptor:
                "<p>Teacher displays extensive knowledge of the important concepts in the discipline and the ways they relate both to one another and to other disciplines.</p><p>Teacher?s plans and practice reflect understanding of prerequisite relationships among topics and concepts and provide a link to necessary cognitive structures needed by students to ensure understanding.</p><p>Teacher?s plans and practice reflect familiarity with a wide range of effective pedagogical approaches in the discipline, anticipating student misconceptions.</p>",
              lookFor1:
                "<p>Teacher makes content errors.</p><p>Teacher does not consider prerequisite relationships when planning.</p><p>Teacher's plans use inappropriate strategies for the discipline.</p>",
              lookFor2:
                "<p>Teacher is familiar with the discipline but does not see conceptual relationships.</p><p>Teacher's knowledge of prerequisite relationships is inaccurate or incomplete.</p><p>Lesson and unit plans use limited instructional strategies and some are not be suitable to the content.</p>",
              lookFor3:
                "<p>The teacher can identify important concepts of the discipline, and their relationships to one another.</p><p> The teacher consistently provides clear explanations of the content.</p><p> The teacher answers student questions accurately and provides feedback that furthers their learning.</p><p>The teacher seeks out contentrelated professional development.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Teacher cites intra- and interdisciplinary content relationships.</p><p>Teacher is proactive in uncovering student misconceptions and addressing them before proceeding.</p>',
            },
            {
              id: 33,
              shortName: "1b",
              title: "Demonstrating Knowledge of Students",
              frameworkNodeShortName: "D1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher demonstrates little or no understanding of how students learn and little knowledge of students? backgrounds, cultures, skills, language proficiency, interests, and special needs and does not seek such understanding.</p>",
              pL2Descriptor:
                "<p>Teacher indicates the importance of under- standing how students learn and the students? backgrounds, cultures, skills, language proficiency, interests, and special needs, and attains this knowledge about the class as a whole.</p>",
              pL3Descriptor:
                "<p>Teacher understands the active nature of student learning and attains information about levels of development for groups of students.</p><p>The teacher also purposefully seeks knowledge from several sources of students? backgrounds, cultures, skills, language proficiency, interests, and special needs and attains this knowledge about groups of students.</p>",
              pL4Descriptor:
                "<p>Teacher actively seeks knowledge of students? levels of development and their backgrounds, cultures, skills, language proficiency, interests, and special needs from a variety of sources. This information is acquired for individual students.</p>",
              lookFor1:
                "<p>Teacher does not understand child development characteristics and has unrealistic expectations for students.</p><p>Teacher does not try to ascertain varied ability levels among students in the class.</p><p>Teacher is not aware of student interests or cultural heritages.</p><p>Teacher takes no responsibility to learn about students' medical or learning disabilities.</p> ",
              lookFor2:
                ' <p>Teacher cites developmental theory, but does not seek to integrate it into lesson planning.</p><p>Teacher is aware of the different ability levels in the class, but tends to teach to the "whole group."</p><p>The teacher recognizes that children have different interests and cultural backgrounds, but rarely draws on their contributions or differentiates materials to accommodate those differences.</p><p>The teacher is aware of medical issues and learning disabilities with some students, but does not seek to understand the implications of that knowledge.</p> ',
              lookFor3:
                '<p>The teacher knows, for groups of students, their levels of cognitive development.</p><p>The teacher is aware of the different cultural groups in the class.</p><p>The teacher has a good idea of the range of interests of students in the class.</p><p>The teacher has identified "high," "medium," and "low" groups of students within the class.</p><p>The teacher is well-informed about students? cultural heritage and incorporates this knowledge in lesson planning.</p><p>The teacher is aware of the special needs represented.</p> ',
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher uses ongoing methods to assess students\' skill levels and designs instruction accordingly.</p><p> The teacher seeks out information about their cultural heritage from all students.</p><p>The teacher maintains a system of updated student records and incorporates medical and/or learning needs into lesson plans.</p>',
            },
            {
              id: 34,
              shortName: "1c",
              title: "Setting Instructional Outcomes",
              frameworkNodeShortName: "D1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Outcomes represent low expectations for students and lack of rigor, and not all of them reflect important learning in the discipline.</p><p>Outcomes are stated as activities rather than as student learning.</p><p>Outcomes reflect only one type of learning and only one discipline or strand and are suitable for only some students.</p>",
              pL2Descriptor:
                "<p>Outcomes represent moderately high expectations and rigor.</p><p>Some reflect important learning in the discipline and consist of a combination of outcomes and activities.</p><p>Outcomes reflect several types of learning, but teacher has made no attempt at coordination or integration.</p><p>Most of the outcomes are suitable for most of the students in the class in accordance with global assessments of student learning.</p>",
              pL3Descriptor:
                "<p>Most outcomes represent rigorous and important learning in the discipline.</p><p>All the instructional outcomes are clear, are written in the form of student learning, and suggest viable methods of assessment.</p><p>Outcomes reflect several different types of learning and opportunities for coordination.</p><p>Outcomes take into account the varying needs of groups of students.</p>",
              pL4Descriptor:
                "<p>All outcomes represent rigorous and important learning in the discipline.</p><p>The outcomes are clear, are written in the form of student learning, and permit viable methods of assessment.</p><p>Outcomes reflect several different types of learning and, where appropriate, represent opportunities for both coordination and integration.</p><p>Outcomes take into account the varying needs of individual students.</p>",
              lookFor1:
                "<p> Outcomes lack rigor.</p><p>Outcomes do not represent important learning in the discipline.</p><p>Outcomes are not clear or are stated as activities.</p><p>Outcomes are not suitable for many students in the class.</p>",
              lookFor2:
                "<p>Outcomes represent a mixture of low expectations and rigor.</p><p> Some outcomes reflect important learning in the discipline.</p><p> Outcomes are suitable for most of the class.</p> ",
              lookFor3:
                '<p>Outcomes represent high expectations and rigor. ? Outcomes are related to "big ideas" of the discipline.</p><p>Outcomes are written in terms of what students will learn rather than do.</p><p>Outcomes represent a range of outcomes: factual, conceptual understanding, reasoning, social, management, communication.</p><p>Outcomes are suitable to groups of students in the class, differentiated where necessary.</p> ',
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Teacher plans reference curricular frameworks or blueprints to ensure accurate sequencing.</p><p>Teacher connects outcomes to previous and future learning.</p><p>Outcomes are differentiated to encourage individual students to take educational risks.</p>',
            },
            {
              id: 35,
              shortName: "1d",
              title: "Demonstrating Knowledge of Resources",
              frameworkNodeShortName: "D1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher is unaware of school or district resources for classroom use, for the expansion of his or her own knowledge, or for students.</p>",
              pL2Descriptor:
                "<p>Teacher displays basic awareness of school or district resources available for classroom use, for the expansion of his or her own knowledge, and for students, but no knowledge of resources available more broadly.</p>",
              pL3Descriptor:
                "<p>Teacher displays awareness of resources?not only through the school and district but also through sources external to the school and on the Internet?available for classroom use, for the expansion of his or her own knowledge, and for students.</p>",
              pL4Descriptor:
                "<p>Teacher displays extensive knowledge of resources?not only through the school and district but also in the community, through professional organizations and universities, and on the Internet?for classroom use, for the expansion of his or her own knowledge, and for students.</p>",
              lookFor1:
                "<p>The teacher only uses districtprovided materials, even when more variety would assist some students.</p><p>The teacher does not seek out resources available to expand his/her own skill.</p><p>Although aware of some student needs, the teacher does not inquire about possible resources.</p>",
              lookFor2:
                "<p>The teacher uses materials in the school library, but does not search beyond the school for resources.</p><p>The teacher participates in contentarea workshops offered by the school, but does not pursue other professional development.</p><p>The teacher locates materials and resources for students that are available through the school, but does not pursue any other avenues.</p>",
              lookFor3:
                "<p>Texts are at varied levels.</p><p>Texts are supplemented by guest speakers and field experiences.</p><p>Teacher facilitates Internet resources.</p><p>Resources are multi-disciplinary.</p><p>Teacher expands knowledge with professional learning groups and organizations.</p><p>Teacher pursues options offered by universities.</p><p>Teacher provides lists of resources outside the class for students to draw on.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Texts are matched to student skill level.</p><p>The teacher has ongoing relationship with colleges and universities that support student learning.</p><p>The teacher maintains log of resources for student reference.</p><p>The teacher pursues apprenticeships to increase discipline knowledge.</p><p>The teacher facilitates student contact with resources outside the classroom.</p>',
            },
            {
              id: 36,
              shortName: "1e",
              title: "Designing Coherent Instruction",
              frameworkNodeShortName: "D1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The series of learning experiences is poorly aligned with the instructional outcomes and does not represent a coherent structure.</p><p>The activities are not designed to engage students in active intellectual activity and have unrealistic time allocations. Instructional groups do not support the instructional outcomes and offer no variety.</p>",
              pL2Descriptor:
                "<p>Some of the learning activities and materials are suitable to the instructional outcomes and represent a moderate cognitive challenge but with no differentiation for different students. Instructional groups partially support the instructional outcomes, with an effort by the teacher at providing some variety.</p><p>The lesson or unit has a recognizable structure; the progression of activities is uneven, with most time allocations reason- able.</p>",
              pL3Descriptor:
                "<p>Teacher coordinates knowledge of content, of students, and of resources, to design a series of learning experiences aligned to instructional outcomes and suitable to groups of students.</p><p>The learning activities have reasonable time allocations; they represent significant cognitive challenge, with some differentiation for different groups of students.</p><p>The lesson or unit has a clear structure, with appropriate and varied use of instructional groups.</p>",
              pL4Descriptor:
                "<p>Plans represent the coordination of in-depth content knowledge, understanding of different students? needs, and available resources (including technology), resulting in a series of learning activities designed to engage students in high-level cognitive activity.</p><p>Learning activities are differentiated appropriately for individual learners. Instructional groups are varied appropriately with some opportunity for student choice.</p><p>The lesson?s or unit?s structure is clear and allows for different pathways according to diverse student needs.</p>",
              lookFor1:
                "<p>Learning activities are boring and/or not well aligned to the instructional goals.</p><p>Materials are not engaging or do not meet instructional outcomes.</p><p>Instructional groups do not support learning.</p><p>Lesson plans are not structured or sequenced and are unrealistic in their expectations.</p>",
              lookFor2:
                "<p>Learning activities are moderately challenging.</p><p>Learning resources are suitable, but there is limited variety.</p><p>Instructional groups are random or only partially support objectives.</p><p>Lesson structure is uneven or may be unrealistic in terms of time expectations.</p>",
              lookFor3:
                "<p>Learning activities are matched to instructional outcomes.</p><p>Activities provide opportunity for higher-level thinking.</p><p>Teacher provides a variety of appropriately challenging materials and resources</p><p>Instructional student groups are organized thoughtfully to maximize learning and build on student strengths.</p><p>The plan for the lesson or unit is well structured, with reasonable time allocations.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Activities permit student choice.</p><p>Learning experiences connect to other disciplines.</p><p>Teacher provides a variety of appropriately challenging resources that are differentiated for students in the class.</p><p>Lesson plans differentiate for individual student needs.</p>',
            },
            {
              id: 37,
              shortName: "1f",
              title: "Designing Student Assessments",
              frameworkNodeShortName: "D1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Assessment procedures are not congruent with instructional outcomes; the proposed approach contains no criteria or standards.</p><p>Teacher has no plan to incorporate formative assessment in the lesson or unit nor any plan to use assessment results in designing future instruction.</p>",
              pL2Descriptor:
                "<p>Some of the instructional outcomes are assessed through the proposed approach, but others are not.</p><p>Assessment criteria and standards have been developed, but they are not clear.</p><p>Approach to the use of formative assessment is rudimentary, including only some of the instructional outcomes.</p><p>Teacher intends to use assessment results to plan for future instruction for the class as a whole.</p>",
              pL3Descriptor:
                "<p>Teacher?s plan for student assessment is aligned with the instructional outcomes; assessment methodologies may have been adapted for groups of students.</p><p>Assessment criteria and standards are clear. Teacher has a well-developed strategy for using formative assessment and has designed particular approaches to be used.</p><p>Teacher intends to use assessment results to plan for future instruction for groups of students.</p>",
              pL4Descriptor:
                "<p>Teacher?s plan for student assessment is fully aligned with the instructional outcomes and has clear criteria and standards that show evidence of student contribution to their development.</p><p>Assessment methodologies have been adapted for individual students, as needed.</p><p>The approach to using formative assessment is well designed and includes student as well as teacher use of the assessment information. Teacher intends to use assessment results to plan future instruction for individual students.</p>",
              lookFor1:
                " <p>Assessments do not match instructional outcomes.</p><p>Assessments have no criteria.</p><p>No formative assessments have been designed.</p><p>Assessment results do not affect future plans.</p>",
              lookFor2:
                "<p>Only some of the instructional outcomes are addressed in the planned assessments.</p><p>Assessment criteria are vague.</p><p>Plans refer to the use of formative assessments, but they are not fully developed.</p><p>Assessment results are used to design lesson plans for the whole class, not individual students.</p> ",
              lookFor3:
                "<p>All the learning outcomes have a method for assessment.</p><p>Assessment types match learning expectations.</p><p>Plans indicate modified assessments for some students as needed.</p><p>Assessment criteria are clearly written.</p><p>Plans include formative assessments to use during instruction.</p><p>Lesson plans indicate possible adjustments based on formative assessment data.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Assessments provide opportunities for student choice.</p><p>Students participate in designing assessments for their own work.</p><p>Teacher-designed assessments are authentic with real-world application, as appropriate.</p><p>Students develop rubrics according to teacher-specified learning objectives.</p><p>Students are actively involved in collecting information from formative assessments and provide input.</p>',
            },
          ],
        },
        {
          id: 18,
          frameworkId: 3,
          shortName: "D2",
          title: "The Classroom Environment",
          isStudentGrowthAligned: false,
          sequence: 2,
          rubricRows: [
            {
              id: 38,
              shortName: "2a",
              title: "Creating an Environment of Respect and Rapport",
              frameworkNodeShortName: "D2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Patterns of classroom interactions, both between the teacher and students and among students, are mostly negative, inappropriate, or insensitive to students? ages, cultural backgrounds, and developmental levels. Interactions are characterized by sarcasm, put-downs, or conflict.</p><p>Teacher does not deal with disrespectful behavior.</p>",
              pL2Descriptor:
                "<p>Patterns of classroom interactions, both between the teacher and students and among students, are generally appropriate but may reflect occasional inconsistencies, favoritism, and disregard for students? ages, cultures, and developmental levels.</p><p>Students rarely demonstrate disrespect for one another.</p><p>Teacher attempts to respond to disrespectful behavior, with uneven results. The net result of the interactions is neutral, conveying neither warmth nor conflict.</p>",
              pL3Descriptor:
                "<p>Teacher-student interactions are friendly and demonstrate general caring and respect. Such interactions are appropriate to the ages of the students.</p><p>Students exhibit respect for the teacher. Inter- actions among students are generally polite and respectful.</p><p>Teacher responds successfully to disrespectful behavior among students. The net result of the interactions is polite and respectful, but impersonal.</p>",
              pL4Descriptor:
                "<p>Classroom interactions among the teacher and individual students are highly respectful, reflecting genuine warmth and caring and sensitivity to students as individuals.</p><p>Students exhibit respect for the teacher and contribute to high levels of civil interaction between all members of the class. The net result of interactions is that of connections with students as individuals.</p>",
              lookFor1:
                "<p>Teacher uses disrespectful talk towards students. Student body language indicates feelings of hurt or insecurity.</p><p>Students use disrespectful talk towards one another with no response from the teacher.</p><p>Teacher displays no familiarity with or caring about individual students? interests or personalities.</p>",
              lookFor2:
                "<p>The quality of interactions between teacher and students, or among students, is uneven, with occasional disrespect.</p><p>Teacher attempts to respond to disrespectful behavior among students, with uneven results.</p><p>Teacher attempts to make connections with individual students, but student reactions indicate that the efforts are not completely successful or are unusual.</p> ",
              lookFor3:
                " <p>Talk between teacher and students and among students is uniformly respectful.</p><p>Teacher responds to disrespectful behavior among students.</p><p>Teacher makes superficial connections with individual students.</p> ",
              lookFor4:
                "<p>In addition to the characteristics of \"proficient,\"</p><p>Teacher demonstrates knowledge and caring about individual students? lives beyond school.</p><p>When necessary, students correct one another in their conduct towards classmates.</p><p>There is no disrespectful behavior among students.</p><p>The teacher's response to a student's incorrect response respects the student's dignity.</p>",
            },
            {
              id: 39,
              shortName: "2b",
              title: "Establishing a Culture for Learning",
              frameworkNodeShortName: "D2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The classroom culture is characterized by a lack of teacher or student commitment to learning and/or little or no investment of student energy into the task at hand. Hard work is not expected or valued.</p><p>Medium or low expectations for student achievement are the norm, with high expectations for learning reserved for only one or two students.</p>",
              pL2Descriptor:
                "<p>The classroom culture is characterized by little commitment to learning by teacher or students.</p><p>The teacher appears to be only going through the motions, and students indicate that they are interested in completion of a task, rather than quality.</p><p>The teacher conveys that student success is the result of natural ability rather than hard work; high expectations for learning are reserved for those students thought to have a natural aptitude for the subject.</p>",
              pL3Descriptor:
                "<p>The classroom culture is a cognitively busy place where learning is valued by all, with high expectations for learning being the norm for most students.</p><p>The teacher conveys that with hard work students can be successful.</p><p>Students understand their role as learners and consistently expend effort to learn.</p><p>Classroom interactions support learning and hard work.</p>",
              pL4Descriptor:
                "<p>The classroom culture is a cognitively vibrant place, characterized by a shared belief in the importance of learning.</p><p>The teacher conveys high expectations for learning by all students and insists on hard work.</p><p>Students assume responsibility for high quality by initiating improvements, making revisions, adding detail, and/or helping peers.</p>",
              lookFor1:
                " <p>The teacher conveys that the reasons for the work are external or trivializes the learning goals and assignments.</p><p>The teacher conveys to at least some students that the work is too challenging for them.</p><p>Students exhibit little or no pride in their work.</p><p>Class time is devoted more to socializing than to learning.</p>",
              lookFor2:
                '<p> Teacher\'s energy for the work is neutral: indicating neither a high level of commitment nor "blowing it off."</p><p>The teacher conveys high expectations for only some students.</p><p>Students comply with the teacher\'s expectations for learning, but don?t indicate commitment on their own initiative for the work.</p><p>Many students indicate that they are looking for an "easy path."</p> ',
              lookFor3:
                "<p>The teacher communicates the importance of learning, and that with hard work all students can be successful in it.</p><p> The teacher demonstrates a high regard for student abilities.</p><p>Teacher conveys an expectation of high levels of student effort.</p><p>Students expend good effort to complete work of high quality.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher communicates a genuine passion for the subject.</p><p>Students indicate that they are not satisfied unless they have complete understanding.</p><p>Student questions and comments indicate a desire to understand the content, rather than, for example, simply learning a procedure for getting the correct answer.</p><p>Students recognize the efforts of their classmates.</p><p>Students take initiative in improving the quality of their work.</p> ',
            },
            {
              id: 40,
              shortName: "2c",
              title: "Managing Classroom Procedures",
              frameworkNodeShortName: "D2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Much instructional time is lost through inefficient classroom routines and procedures.</p><p>There is little or no evidence that the teacher is managing instructional groups, transitions, and/or the handling of materials and supplies effectively.</p><p>There is little evidence that students know or follow established routines.</p>",
              pL2Descriptor:
                "<p>Some instructional time is lost through only partially effective classroom routines and procedures.</p><p>The teacher?s management of instructional groups, transitions, and/or the handling of materials and supplies is inconsistent, the result being some disruption of learning.</p><p>With regular guidance and prompting, students follow established routines.</p>",
              pL3Descriptor:
                "<p>There is little loss of instructional time because of effective classroom routines and procedures.</p><p>The teacher?s management of instructional groups and the handling of materials and sup- plies are consistently successful.</p><p>With minimal guidance and prompting, students follow established classroom routines.</p>",
              pL4Descriptor:
                "<p>Instructional time is maximized because of efficient classroom routines and procedures.</p><p>Students contribute to the management of instructional groups, transitions, and the handling of materials and supplies.</p><p>Routines are well understood and may be initiated by students.</p>",
              lookFor1:
                "<p>Students not working with the teacher are disruptive to the class.</p><p>There are no established procedures for distributing and collecting materials.</p><p>Procedures for other activities are confused or chaotic.</p> ",
              lookFor2:
                " <p>Small groups are only partially engaged while not working directly with the teacher.</p><p>Procedures for transitions, and distribution/collection of materials, seem to have been established, but their operation is rough.</p><p>Classroom routines function unevenly.</p> ",
              lookFor3:
                " <p>The students are productively engaged during small group work.</p><p>Transitions between large and small group activities are smooth.</p><p> Routines for distribution and collection of materials and supplies work efficiently.</p><p>Classroom routines function smoothly.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Students take the initiative with their classmates to ensure that their time is used productively.</p><p> Students themselves ensure that transitions and other routines are accomplished smoothly.</p><p>Students take initiative in distributing and collecting materials efficiently.</p> ',
            },
            {
              id: 41,
              shortName: "2d",
              title: "Managing Student Behavior",
              frameworkNodeShortName: "D2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>There appear to be no established standards of conduct and little or no teacher monitoring of student behavior.</p><p>Students challenge the standards of conduct.</p><p>Response to students? misbehavior is repressive or disrespectful of student dignity.</p>",
              pL2Descriptor:
                "<p>Standards of conduct appear to have been established, but their implementation is inconsistent.</p><p>Teacher tries, with uneven results, to monitor student behavior and respond to student misbehavior.</p><p>There is inconsistent implementation of the standards of conduct.</p>",
              pL3Descriptor:
                "<p>Student behavior is generally appropriate.</p><p>The teacher monitors student behavior against established standards of conduct.</p><p>Teacher response to student misbehavior is consistent, proportionate, respectful to students, and effective.</p>",
              pL4Descriptor:
                "<p>Student behavior is entirely appropriate.</p><p>Students take an active role in monitoring their own behavior and that of other students against standards of conduct.</p><p>Teachers? monitoring of student behavior is subtle and preventive.</p><p>Teacher?s response to student misbehavior is sensitive to individual student needs and respects students? dignity.</p>",
              lookFor1:
                "<p> The classroom environment is chaotic, with no apparent standards of conduct.</p><p> The teacher does not monitor student behavior.</p><p>Some students violate classroom rules, without apparent teacher awareness.</p><p> When the teacher notices student misbehavior, s/he appears helpless to do anything about it.</p> ",
              lookFor2:
                " <p>Teacher attempts to maintain order in the classroom but with uneven success; standards of conduct, if they exist, are not evident.</p><p> Teacher attempts to keep track of student behavior, but with no apparent system.</p><p>The teacher?s response to student misbehavior is inconsistent: sometimes very harsh; other times lenient.</p> ",
              lookFor3:
                " <p>Standards of conduct appear to have been established.</p><p>Student behavior is generally appropriate.</p><p>The teacher frequently monitors student behavior.</p><p>Teacher?s response to student misbehavior is effective.</p><p> Teacher acknowledges good behavior.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Student behavior is entirely appropriate; no evidence of student misbehavior.</p><p>The teacher monitors student behavior without speaking ? just moving about.</p><p>Students respectfully intervene as appropriate with classmates to ensure compliance with standards of conduct.</p> ',
            },
            {
              id: 42,
              shortName: "2e",
              title: "Organizing Physical Space",
              frameworkNodeShortName: "D2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The physical environment is unsafe, or many students don?t have access to learning resources.</p><p>There is poor coordination between the lesson activities and the arrangement of furniture and resources, including computer technology.</p>",
              pL2Descriptor:
                "<p>The classroom is safe, and essential learn- ing is accessible to most students.</p><p>The teacher?s use of physical resources, including computer technology, is moderately effective.</p><p>Teacher makes some attempt to modify the physical arrangement to suit learning activities, with partial success.</p>",
              pL3Descriptor:
                "<p>The classroom is safe, and learning is accessible to all students; teacher ensures that the physical arrangement is appropriate to the learning activities.</p><p>Teacher makes effective use of physical resources, including computer technology.</p>",
              pL4Descriptor:
                "<p>The classroom is safe, and learning is accessible to all students, including those with special needs.</p><p>Teacher makes effective use of physical resources, including computer technology. The teacher ensures that the physical arrangement is appropriate to the learning activities.</p><p>Students contribute to the use or adaptation of the physical environment to advance learning.</p>",
              lookFor1:
                " <p> There are physical hazards in the classroom, endangering student safety.</p><p> Many students can?t see or hear the teacher or the board.</p><p> Available technology is not being used, even if available and its use would enhance the lesson.</p> ",
              lookFor2:
                "<p> The physical environment is safe, and most students can see and hear.</p><p> The physical environment is not an impediment to learning, but does not enhance it.</p><p>The teacher makes limited use of available technology and other resources.</p> ",
              lookFor3:
                " <p>The classroom is safe, and all students are able to see and hear.</p><p>The classroom is arranged to support the instructional goals and learning activities.</p><p>The teacher makes appropriate use of available technology.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Modifications are made to the physical environment to accommodate students with special needs.</p><p>There is total alignment between the goals of the lesson and the physical environment.</p><p>Students take the initiative to adjust the physical environment.</p><p>Teachers and students make extensive and imaginative use of available technology.</p> ',
            },
          ],
        },
        {
          id: 19,
          frameworkId: 3,
          shortName: "D3",
          title: "Instruction",
          isStudentGrowthAligned: false,
          sequence: 3,
          rubricRows: [
            {
              id: 43,
              shortName: "3a",
              title: "Communicating with Students",
              frameworkNodeShortName: "D3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The instructional purpose of the lesson is unclear to students, and the directions and procedures are confusing.</p><p>The teacher?s explanation of the content contains major errors.</p><p>The teacher?s spoken or written language contains errors of grammar or syntax.</p><p>The teacher?s vocabulary is inappropriate, vague, or used incorrectly, leaving students confused.</p>",
              pL2Descriptor:
                "<p>The teacher?s attempt to explain the instructional purpose has only limited success, and/or directions and procedures must be clarified after initial student confusion.</p><p>The teacher?s explanation of the content may contain minor errors; some portions are clear; other portions are difficult to follow.</p><p>The teacher?s explanation consists of a monologue, with no invitation to the students for intellectual engagement.</p><p>Teacher?s spoken language is correct; how- ever, his or her vocabulary is limited, or not fully appropriate to the students? ages or backgrounds.</p>",
              pL3Descriptor:
                "<p>The teacher clearly communicates instructional purpose of the lesson, including where it is situated within broader learning, and explains procedures and directions clearly.</p><p>Teacher?s explanation of content is well scaffolded, clear and accurate, and connects with students? knowledge and experience.</p><p>During the explanation of content, the teacher invites student intellectual engagement.</p><p>Teacher?s spoken and written language is clear and correct and uses vocabulary appropriate to the students? ages and interests.</p>",
              pL4Descriptor:
                "<p>The teacher links the instructional purpose of the lesson to student interests; the directions and procedures are clear and anticipate possible student misunderstanding.</p><p>The teacher?s explanation of content is thorough and clear, developing conceptual understanding through artful scaffolding and connecting with students? interests.</p><p>Students contribute to extending the content and help explain concepts to their classmates.</p><p>The teacher?s spoken and written language is expressive, and the teacher finds opportunities to extend students? vocabularies.</p>",
              lookFor1:
                "<p> At no time during the lesson does the teacher convey to the students what they will be learning.</p><p> Students indicate through their questions that they are confused as to the learning task.</p><p> The teacher makes a serious content error that will affect students? understanding of the lesson.</p><p>Students indicate through body language or questions that they don?t understand the content being presented.</p><p> Teacher's communications include errors of vocabulary or usage.</p><p>Vocabulary is inappropriate to the age or culture of the students.</p> ",
              lookFor2:
                " <p> The teacher refers in passing to what the students will be learning, or it is written on the board with no elaboration or explanation.</p><p>Teacher must clarify the learning task so students can complete it.</p><p>The teacher makes no serious content errors, although may make a minor error.</p><p> The teacher's explanation of the content consists of a monologue or is purely procedural with minimal participation by students.</p><p>Vocabulary and usage are correct but unimaginative.</p><p>Vocabulary is too advanced or juvenile for the students.</p> ",
              lookFor3:
                "<p> The teacher states clearly, at some point during the lesson, what the students will be learning. ? If appropriate, the teacher models the process to be followed in the task.</p><p> Students engage with the learning task, indicating that they understand what they are to do.</p><p>The teacher makes no content errors.</p><p>Teacher's explanation of content is clear, and invites student participation and thinking.</p><p>Vocabulary and usage are correct and completely suited to the lesson.</p><p>Vocabulary is appropriate to the students' ages and levels of development.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher points out possible areas for misunderstanding.</p><p> Teacher explains content clearly and imaginatively, using metaphors and analogies to bring content to life.</p><p>All students seem to understand the presentation.</p><p>The teacher invites students to explain the content to the class, or to classmates.</p><p>Teacher uses rich language, offering brief vocabulary lessons where appropriate.</p> ',
            },
            {
              id: 44,
              shortName: "3b",
              title: "Using Questions and Discussion Techniques",
              frameworkNodeShortName: "D3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher?s questions are of low cognitive challenge, require single correct responses, and are asked in rapid succession.</p><p>Interaction between teacher and students is predominantly recitation style, with the teacher mediating all questions and answers.</p><p>A few students dominate the discussion.</p>",
              pL2Descriptor:
                "<p>Teacher?s questions lead students through a single path of inquiry, with answers seemingly determined in advance.</p><p>Alternatively, the teacher attempts to frame some questions designed to promote student thinking and understanding, but only a few students are involved.</p><p>Teacher attempts to engage all students in the discussion and to encourage them to respond to one another, but with uneven results.</p>",
              pL3Descriptor:
                "<p>Although the teacher may use some low-level questions, he or she asks the students questions designed to promote thinking and understanding.</p><p>Teacher creates a genuine discussion among students, providing adequate time for students to respond and stepping aside when appropriate.</p><p>Teacher successfully engages most students in the discussion, employing a range of strategies to ensure that most students are heard.</p>",
              pL4Descriptor:
                "<p>Teacher uses a variety or series of questions or prompts to challenge students cognitively, advance high-level thinking and discourse, and promote metacognition.</p><p>Students formulate many questions, initiate topics, and make unsolicited contributions.</p><p>Students themselves ensure that all voices are heard in the discussion.</p>",
              lookFor1:
                "<p>Questions are rapid-fire, and convergent, with a single correct answer.</p><p>Questions do not invite student thinking.</p><p>All discussion is between teacher and students; students are not invited to speak directly to one another.</p><p>A few students dominate the discussion.</p> ",
              lookFor2:
                "<p>Teacher frames some questions designed to promote student thinking, but only a few students are involved.</p><p>The teacher invites students to respond directly to one another's ideas, but few students respond.</p><p>Teacher calls on many students, but only a small number actually participate in the discussion.</p> ",
              lookFor3:
                "<p>Teacher uses open-ended questions, inviting students to think and/or have multiple possible answers.</p><p>The teacher makes effective use of wait time.</p><p>The teacher builds on uses student responses to questions effectively.</p><p>Discussions enable students to talk to one another, without ongoing mediation by the teacher.</p><p>The teacher calls on most students, even those who don?t initially volunteer.</p><p>Many students actively engage in the discussion.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Students initiate higher-order questions.</p><p>Students extend the discussion, enriching it.</p><p>Students invite comments from their classmates during a discussion.</p>',
            },
            {
              id: 45,
              shortName: "3c",
              title: "Engaging Students in Learning",
              frameworkNodeShortName: "D3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>The learning tasks and activities, materials, resources, instructional groups and technology are poorly aligned with the instructional outcomes or require only rote responses.</p><p>The pace of the lesson is too slow or too rushed.</p><p>Few students are intellectually engaged or interested.</p>",
              pL2Descriptor:
                "<p>The learning tasks and activities are partially aligned with the instructional out- comes but require only minimal thinking by students, allowing most to be passive or merely compliant.</p><p>The pacing of the lesson may not provide students the time needed to be intellectually engaged.</p>",
              pL3Descriptor:
                "<p>The learning tasks and activities are aligned with the instructional outcomes and designed to challenge student thinking, the result being that most students display active intellectual engagement with important and challenging content and are supported in that engagement by teacher scaffolding.</p><p>The pacing of the lesson is appropriate, providing most students the time needed to be intellectually engaged.</p>",
              pL4Descriptor:
                "<p>Virtually all students are intellectually engaged in challenging content through well-designed learning tasks and suitable scaffolding by the teacher and fully aligned with the instructional outcomes.</p><p>In addition, there is evidence of some student initiation of inquiry and of student contribution to the exploration of important content.</p><p>The pacing of the lesson provides students the time needed to intellectually engage with and reflect upon their learning and to consolidate their understanding.</p><p>Students may have some choice in how they complete tasks and may serve as resources for one another.</p>",
              lookFor1:
                " <p>Few students are intellectually engaged in the lesson.</p><p> Learning tasks require only recall or have a single correct response or method.</p><p>The materials used ask students only to perform rote tasks.</p><p> Only one type of instructional group is used (whole group, small groups) when variety would better serve the instructional purpose.</p><p> Instructional materials used are unsuitable to the lesson and/or the students.</p><p>The lesson drags, or is rushed.</p> ",
              lookFor2:
                "<p> Some students are intellectually engaged in the lesson.</p><p> Learning tasks are a mix of those requiring thinking and recall.</p><p> Student engagement with the content is largely passive, learning primarily facts or procedures.</p><p> Students have no choice in how they complete tasks.</p><p> The teacher uses different instructional groupings; these are partially successful in achieving the lesson objectives.</p><p>The materials and resources are partially aligned to the lesson objectives, only some of them demanding student thinking.</p><p> The pacing of the lesson is uneven; suitable in parts, but rushed or dragging in others.</p> ",
              lookFor3:
                " <p>Most students are intellectually engaged in the lesson.</p><p>Learning tasks have multiple correct responses or approaches and/or demand higher-order thinking.</p><p> Students have some choice in how they complete learning tasks.</p><p>There is a mix of different types of groupings, suitable to the lesson objectives.</p><p>Materials and resources support the learning goals and require intellectual engagement, as appropriate.</p><p> The pacing of the lesson provides students the time needed to be intellectually engaged.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Virtually all students are highly engaged in the lesson.</p><p> Students take initiative to modify a learning task to make it more meaningful or relevant to their needs.</p><p>Students suggest modifications to the grouping patterns used.</p><p>Students have extensive choice in how they complete tasks.</p><p>Students suggest modifications or additions to the materials being used.</p><p>Students have an opportunity for reflection and closure on the lesson to consolidate their understanding.</p> ',
            },
            {
              id: 46,
              shortName: "3d",
              title: "Using Assessment in Instruction",
              frameworkNodeShortName: "D3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>There is little or no assessment or monitoring of student learning; feedback is absent or of poor quality.</p><p>Students do not appear to be aware of the assessment criteria and do not engage in self-assessment.</p>",
              pL2Descriptor:
                "<p>Assessment is used sporadically by teacher and/or students to support instruction through some monitoring of progress in learning.</p><p>Feedback to students is general, students appear to be only partially aware of the assessment criteria used to evaluate their work, and few assess their own work.</p><p>Questions, prompts, and assessments are rarely used to diagnose evidence of learning.</p>",
              pL3Descriptor:
                "<p>Assessment is used regularly by teacher and/or students during the lesson through monitoring of learning progress and results in accurate, specific feedback that advances learning.</p><p>Students appear to be aware of the assessment criteria; some of them engage in self-assessment.</p><p>Questions, prompts, assessments are used to diagnose evidence of learning.</p>",
              pL4Descriptor:
                "<p>Assessment is fully integrated into instruction through extensive use of formative assessment.</p><p>Students appear to be aware of, and there is some evidence that they have contributed to, the assessment criteria.</p><p>Students self-assess and monitor their progress.</p><p>A variety of feedback, from both their teacher and their peers, is accurate, specific, and advances learning.</p><p>Questions, prompts, assessments are used regularly to diagnose evidence of learning by individual students.</p>",
              lookFor1:
                " <p>The teacher gives no indication of what high quality work looks like.</p><p> The teacher makes no effort to determine whether students understand the lesson.</p><p> Feedback is only global.</p><p> The teacher does not ask students to evaluate their own or classmates? work.</p> ",
              lookFor2:
                " <p> There is little evidence that the students understand how their work will be evaluated.</p><p> Teacher monitors understanding through a single method, or without eliciting evidence of understanding from all students.</p><p> Teacher requests global indications of student understanding.</p><p> Feedback to students is not uniformly specific, not oriented towards future improvement of work.</p><p>The teacher makes only minor attempts to engage students in selfor peer-assessment.</p><p> The teacher?s attempts to adjust the lesson are partially successful.</p> ",
              lookFor3:
                "<p> Students indicate that they clearly understand the characteristics of highquality work.</p><p>The teacher elicits evidence of student understanding during the lesson Students are invited to assess their own work and make improvements.</p><p>Feedback includes specific and timely guidance for at least groups of students.</p><p> The teacher attempts to engage students in self- or peer-assessment.</p><p> When necessary, the teacher makes adjustments to the lesson to enhance understanding by groups of students.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>There is evidence that students have helped establish the evaluation criteria.</p><p>Teacher monitoring of student understanding is sophisticated and continuous: the teacher is constantly ?taking the pulse? of the class.</p><p>Teacher makes frequent use of strategies to elicit information about individual student understanding.</p><p>Feedback to students is specific and timely, and is provided from many sources, including other students.</p><p>Students monitor their own understanding, either on their own initiative or as a result of tasks set by the teacher.</p><p>The teacher?s adjustments to the lesson are designed to assist individual students.</p> ',
            },
            {
              id: 47,
              shortName: "3e",
              title: "Demonstrating Flexibility and Responsiveness",
              frameworkNodeShortName: "D3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher adheres to the instruction plan in spite of evidence of poor student understanding or lack of interest.</p><p>Teacher ignores student questions; when students experience difficulty, the teacher blames the students or their home environment.</p>",
              pL2Descriptor:
                "<p>Teacher attempts to modify the lesson when needed and to respond to student questions and interests, with moderate success.</p><p>Teacher accepts responsibility for student success but has only a limited repertoire of strategies to draw upon.</p>",
              pL3Descriptor:
                "<p>Teacher promotes the successful learning of all students, making minor adjustments as needed to instruction plans and accommodating student questions, needs, and interests.</p><p>Drawing on a broad repertoire of strategies, the teacher persists in seeking approaches for students who have difficulty learning.</p>",
              pL4Descriptor:
                "<p>Teacher seizes an opportunity to enhance learning, building on a spontaneous event or student interests, or successfully adjusts and differentiates instruction to address individual student misunderstandings.</p><p>Teacher persists in seeking effective approaches for students who need help, using an extensive repertoire of instructional strategies and soliciting additional resources from the school or community.</p>",
              lookFor1:
                " <p>Teacher ignores indications of student boredom or lack of understanding.</p><p>Teacher brushes aside student questions.</p><p>Teacher makes no attempt to incorporate student interests into the lesson.</p><p>The teacher conveys to students that when they have difficulty learning, it is their fault.</p><p>In reflecting on practice, the teacher does not indicate that it is important to reach all students.</p> ",
              lookFor2:
                "<p>Teacher?s efforts to modify the lesson are only partially successful.</p><p>Teacher makes perfunctory attempts to incorporate student questions and interests into the lesson.</p><p>The teacher conveys to students a level of responsibility for their learning, but uncertainty as to how to assist them.</p><p>In reflecting on practice, the teacher indicates the desire to reach all students, but does not suggest strategies to do so.</p> ",
              lookFor3:
                " <p>Teacher successfully makes a minor modification to the lesson.</p><p>Teacher incorporates students? interests and questions into the heart of the lesson.</p><p>The teacher conveys to students that she has other approaches to try when the students experience difficulty.</p><p>In reflecting on practice, the teacher cites multiple approaches undertaken to reach students having difficulty.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Teacher successfully executes a major lesson readjustment when needed.</p><p>Teacher seizes on a teachable moment to enhance a lesson.</p><p>The teacher conveys to students that he won?t consider a lesson ?finished? until every student understands, and that he has a broad range of approaches to use.</p><p>In reflecting on practice, the teacher can cite others in the school and beyond who she has contacted for assistance in reaching some students.</p> ',
            },
          ],
        },
        {
          id: 20,
          frameworkId: 3,
          shortName: "D4",
          title: "Professional Responsibilities",
          isStudentGrowthAligned: false,
          sequence: 4,
          rubricRows: [
            {
              id: 48,
              shortName: "4a",
              title: "Reflecting on Teaching",
              frameworkNodeShortName: "D4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher does not know whether a lesson was effective or achieved its instructional outcomes, or he/she profoundly misjudges the success of a lesson.</p><p>Teacher has no suggestions for how a lesson could be improved.</p>",
              pL2Descriptor:
                "<p>Teacher has a generally accurate impression of a lesson?s effectiveness and the extent to which instructional outcomes were met.</p><p>Teacher makes general suggestions about how a lesson could be improved.</p>",
              pL3Descriptor:
                "<p>Teacher makes an accurate assessment of a lesson?s effectiveness and the extent to which it achieved its instructional outcomes and can cite general references to support the judgment.</p><p>Teacher makes a few specific suggestions of what could be tried another time the lesson is taught.</p>",
              pL4Descriptor:
                "<p>Teacher makes a thoughtful and accurate assessment of a lesson?s effectiveness and the extent to which it achieved its instructional out- comes, citing many specific examples from the lesson and weighing the relative strengths of each.</p><p>Drawing on an extensive repertoire of skills, teacher offers specific alternative actions, complete with the probable success of different courses of action.</p>",
              lookFor1:
                " <p>The teacher considers the lesson but draws incorrect conclusions about its effectiveness. </p><p>The teacher makes no suggestions for improvement.</p> ",
              lookFor2:
                " <p>The teacher has a general sense of whether or not instructional practices were effective.</p><p>The teacher offers general modifications for future instruction.</p> ",
              lookFor3:
                "<p>The teacher accurately assesses the effectiveness of instructional activities used.</p><p>The teacher identifies specific ways in which a lesson might be improved.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>the teacher?s assessment of the lesson is thoughtful, and includes specific indicators of effectiveness.</p><p>Teacher?s suggestions for improvement draw on an extensive repertoire.</p> ',
            },
            {
              id: 49,
              shortName: "4b",
              title: "Maintaining Accurate Records",
              frameworkNodeShortName: "D4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments and student progress in learning is nonexistent or in disarray.</p><p>Teacher?s records for noninstructional activities are in disarray, resulting in errors and confusion.</p>",
              pL2Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments and student progress in learning is rudimentary and only partially effective.</p><p>Teacher?s records for noninstructional activities are adequate but require frequent monitoring to avoid errors.</p>",
              pL3Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments, student progress in learning, and noninstructional records is fully effective.</p>",
              pL4Descriptor:
                "<p>Teacher?s system for maintaining information on student completion of assignments, student progress in learning, and noninstructional records is fully effective.</p><p>Students contribute information and participate in maintaining the records.</p>",
              lookFor1:
                "<p>Absence of a system for either instructional or non-instructional records. </p><p>Record-keeping systems that are in disarray so as to provide incorrect or confusing information. </p>",
              lookFor2:
                "<p>The teacher has a process for recording student work completion. However, it may be out-of-date or does not permit students to access the information. </p><p>The teacher?s process for tracking student progress is cumbersome to use. </p><p>The teacher has a process for tracking some non-instructional information, but not all, or it may contain some errors. </p>",
              lookFor3:
                "<p>The teacher?s process for recording student work completion is efficient and effective; students have access to information about completed and/or missing assignments. </p><p>The teacher has an efficient and effective process for recording student attainment of learning goals; students are able to see how they?re progressing. </p><p>The teacher?s process for recording non-instructional information is both efficient and effective.</p>",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>Students contribute to and maintain records indicating completed and outstanding work assignments. </p><p>Students contribute to and maintain data files indicating their own progress in learning. </p><p>Students contribute to maintaining non-instructional records for the class.</p>',
            },
            {
              id: 50,
              shortName: "4c",
              title: "Communicating with Families",
              frameworkNodeShortName: "D4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher communication with families? about the instructional program, about individual students?is sporadic or culturally inappropriate.</p><p>Teacher makes no attempt to engage families in the instructional program.</p>",
              pL2Descriptor:
                "<p>Teacher makes sporadic attempts to communicate with families about the instructional program and about the progress of individual students but does not attempt to engage families in the instructional program. Communications are one-way and not always appropriate to the cultural norms of those families.</p>",
              pL3Descriptor:
                "<p>Teacher communicates frequently with families about the instructional program and conveys information about individual student progress.</p><p>Teacher makes some attempts to engage families in the instructional program.</p><p>Information to families is conveyed in a culturally appropriate manner.</p>",
              pL4Descriptor:
                "<p>Teacher?s communication with families is frequent and sensitive to cultural traditions, with students contributing to the communication.</p><p>Response to family concerns is handled with professional and cultural sensitivity.</p><p>Teacher?s efforts to engage families in the instructional program are frequent and successful.</p>",
              lookFor1:
                "<p>Little or no information regarding instructional program available to parents. </p><p>Families are unaware of their children?s progress. </p><p>Lack of family engagement activities. </p><p>Culturally inappropriate communication. </p> ",
              lookFor2:
                " <p>School or district-created materials about the instructional program are sent home. </p><p>Infrequent or incomplete information sent home by teachers about the instructional program. </p><p>Teacher maintains school-required grade book but does little else to inform families about student progress. </p><p>Teacher communications are sometimes inappropriate to families? cultural norms. </p> ",
              lookFor3:
                " <p>Information about the instructional program is available on a regular basis. </p><p>The teacher sends information about student progress home on a regular basis. </p><p>Teacher develops activities designed to successfully engage families in their children?s learning, as appropriate.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>On a regular basis, students develop materials to inform their families about the instructional program. </p><p>Students maintain accurate records about their individual learning progress and frequently share this information with families. </p><p>Students contribute to regular and ongoing projects designed to engage families in the learning process. </p> ',
            },
            {
              id: 51,
              shortName: "4d",
              title: "Participating in a Professional Community",
              frameworkNodeShortName: "D4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher?s relationships with colleagues are negative or self-serving.</p><p>Teacher avoids participation in a professional culture of inquiry, resisting opportunities to become involved.</p><p>Teacher avoids becoming involved in school events or school and district projects.</p>",
              pL2Descriptor:
                "<p>Teacher maintains cordial relationships with colleagues to fulfill duties that the school or district requires.</p><p>Teacher becomes involved in the school?s culture of professional inquiry when invited to do so.</p><p>Teacher participates in school events and school and district projects when specifically asked to do so.</p>",
              pL3Descriptor:
                "<p>Teacher?s relationships with colleagues are characterized by mutual support and cooperation; teacher actively participates in a culture of professional inquiry.</p><p>Teacher volunteers to participate in school events and in school and district projects, making a substantial contribution.</p>",
              pL4Descriptor:
                "<p>Teacher?s relationships with colleagues are characterized by mutual support and cooperation, with the teacher taking initiative in assuming leadership among the faculty.</p><p>Teacher takes a leadership role in promoting a culture of professional inquiry.</p><p>Teacher volunteers to participate in school events and district projects making a substantial contribution, and assuming a leadership role in at least one aspect of school or district life.</p>",
              lookFor1:
                "<p>The teacher?s relationship with colleagues is characterized by negativity or combativeness. </p><p>The teacher purposefully avoids contributing to activities promoting professional inquiry. </p><p>The teacher avoids involvement in school activities and school district and community projects. </p> ",
              lookFor2:
                " <p>The teacher has pleasant relationship with colleagues. </p><p>When invited, the teacher participates in activities related to professional inquiry. </p><p>When asked, the teacher participates in school activities, and school district and community projects. </p> ",
              lookFor3:
                " <p>The teacher has supportive and collaborative relationships with colleagues. </p><p>The teacher regularly participates in activities related to professional inquiry. </p><p>The teacher frequently volunteers to participate in school events and school district and community projects.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher takes a leadership role in promoting activities related to professional inquiry. </p><p>The teacher regularly contributes to and leads events that positively impact school life. </p><p>The teacher regularly contributes to and leads significant school district and community projects. </p> ',
            },
            {
              id: 52,
              shortName: "4e",
              title: "Growing and Developing Professionally",
              frameworkNodeShortName: "D4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher engages in no professional development activities to enhance knowledge or skill.</p><p>Teacher resists feedback on teaching performance from either supervisors or more experienced colleagues.</p><p>Teacher makes no effort to share knowledge with others or to assume professional responsibilities.</p>",
              pL2Descriptor:
                "<p>Teacher participates in professional activities to a limited extent when they are convenient.</p><p>Teacher accepts, with some reluctance, feedback on teaching performance from both supervisors and colleagues.</p><p>Teacher finds limited ways to contribute to the profession.</p>",
              pL3Descriptor:
                "<p>Teacher seeks out opportunities for professional development to enhance content knowledge and pedagogical skill.</p><p>Teacher welcomes feedback from colleagues?either when made by supervisors or when opportunities arise through professional collaboration.</p><p>Teacher participates actively in assisting other educators.</p>",
              pL4Descriptor:
                "<p>Teacher seeks out opportunities for professional development and makes a systematic effort to conduct action research.</p><p>Teacher seeks out feedback on teaching from both supervisors and colleagues.</p><p>Teacher initiates important activities to contribute to the profession.</p>",
              lookFor1:
                " <p>The teacher is not involved in any activity that might enhance knowledge or skill. </p><p>The teacher purposefully resists discussing performance with supervisors or colleagues. </p><p>The teacher ignores invitations to join professional organizations or attending conferences. </p> ",
              lookFor2:
                " <p>The teacher participates in professional activities when required or when provided by the school district. </p><p>The teacher reluctantly accepts feedback from supervisors and colleagues. </p><p>The teacher contributes in a limited fashion to educational professional organizations. </p> ",
              lookFor3:
                " <p>The teacher seeks regular opportunities for continued professional development. </p><p>The teacher welcomes colleagues and supervisors in the classroom for the purposes of gaining insight from their feedback. </p><p>The teacher actively participates in professional organizations designed to contribute to the profession.</p> ",
              lookFor4:
                '<p>In addition to the characteristics of "proficient,"</p><p>The teacher seeks regular opportunities for continued professional development, including initiating action research. </p><p>The teacher actively seeks feedback from supervisors and colleagues. </p><p>The teacher takes an active leadership role in professional organizations in order to contribute to the teaching profession. </p> ',
            },
            {
              id: 53,
              shortName: "4f",
              title: "Showing Professionalism",
              frameworkNodeShortName: "D4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Teacher displays dishonesty in interactions with colleagues, students, and the public.</p><p>Teacher is not alert to students? needs and contributes to school practices that result in some students? being ill served by the school.</p><p>Teacher makes decisions and recommendations based on self-serving interests. Teacher does not comply with school and district regulations.</p>",
              pL2Descriptor:
                "<p>Teacher is honest in interactions with col- leagues, students, and the public.</p><p>Teacher attempts, though inconsistently, to serve students. Teacher does not knowingly contribute to some students? being ill served by the school.</p><p>Teacher?s decisions and recommendations are based on limited but genuinely professional considerations.</p><p>Teacher complies minimally with school and district regulations, doing just enough to get by.</p>",
              pL3Descriptor:
                "<p>Teacher displays high standards of honesty, integrity, and confidentiality in interactions with colleagues, students, and the public.</p><p>Teacher is active in serving students, working to ensure that all students receive a fair opportunity to succeed.</p><p>Teacher maintains an open mind in team or departmental decision making.</p><p>Teacher complies fully with school and district regulations.</p>",
              pL4Descriptor:
                "<p>Teacher takes a leadership role with colleagues and can be counted on to hold to the highest standards of honesty, integrity, and confidentiality.</p><p>Teacher is highly proactive in serving students, seeking out resources when needed. Teacher makes a concerted effort to challenge negative attitudes or practices to ensure that all students, particularly those traditionally under- served, are honored in the school.</p><p>Teacher takes a leadership role in team or departmental decision making and helps ensure that such decisions are based on the highest professional standards.</p><p>Teacher complies fully with school and district regulations, taking a leadership role with col- leagues.</p>",
              lookFor1:
                "<p>Teacher is dishonest.</p><p>Teacher does not notice the needs of students. </p><p>The teacher engages in practices that are self-serving. </p><p>The teacher willfully rejects school district regulations. </p> ",
              lookFor2:
                " <p>Teacher is honest. </p><p>Teacher notices the needs of students, but is inconsistent in addressing them. </p><p>Teacher does not notice that some school practices result in poor conditions for students. </p><p>Teacher makes decisions professionally, but on a limited basis. </p><p>Teacher complies with school district regulations. </p> ",
              lookFor3:
                " <p>Teacher is honest and known for having high standards of integrity. </p><p>Teacher actively addresses student needs. </p><p>Teacher actively works to provide opportunities for student success. </p><p>Teacher willingly participates in team and departmental decisionmaking. </p><p>Teacher complies completely with school district regulations. </p> ",
              lookFor4:
                "<p>Teacher is considered a leader in terms of honesty, integrity, and confidentiality. </p><p>Teacher is highly proactive in serving students. </p><p>Teacher makes a concerted effort to ensure opportunities are available for all students to be successful. </p><p>Teacher takes a leadership role in team and departmental decisionmaking. </p><p>Teacher takes a leadership role regarding school district regulations. </p> ",
            },
          ],
        },
      ],
    },
    {
      id: 1,
      name: "Leadership",
      frameworkNodes: [
        {
          id: 1,
          frameworkId: 1,
          shortName: "C1",
          title: "Creating a Culture",
          isStudentGrowthAligned: false,
          sequence: 1,
          rubricRows: [
            {
              id: 1,
              shortName: "1.1",
              title:
                "Develops and sustains focus on a shared mission and clear vision for improvement of teaching and learning",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not believe a common mission or vision is needed for the improvement of teaching and learning.</p><p>Tolerates behaviors and activities not aligned with the school?s mission and vision.</p>",
              pL2Descriptor:
                "<p>Recognizes the connection between a common mission and vision in the improvement of teaching and learning but has not identified how to directly influence these in the work of the school.</p><p>Inconsistently connects the school?s mission and vision with school behaviors and activities.</p>",
              pL3Descriptor:
                "<p>Communicates a mission and vision of ongoing improvement in teaching and learning such that students and staff understand what the school is working to achieve.</p><p>Consistently encourages and supports behaviors and activities that explicitly align with the school?s mission and vision.</p>",
              pL4Descriptor:
                "<p>Most or all of the stakeholders own the mission and vision, such that they independently advocate for and seek to achieve the mission and vision and communicate these to others.</p><p>Students and staff develop and implement behaviors and activities that consistently align with the mission and vision of the school.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 2,
              shortName: "1.2",
              title:
                "Engages in essential conversations for ongoing improvement of the school",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Conversations with students, staff, and stakeholders are off topic, shallow or confusing.</p><p>Communication with students, staff, and stakeholders is top-down and discourages feedback.</p><p>Creates or employs barriers to effective communication about ongoing improvement of the school.</p>",
              pL2Descriptor:
                "<p>Conversations with students, staff, and stakeholders rarely focus on high impact issues and topics.</p><p>Input from students, staff, and stakeholders is solicited, but not acted upon.</p><p>Infrequently identifies or addresses barriers to effective communication about ongoing improvement of the school.</p>",
              pL3Descriptor:
                "<p>Conversations with students, staff, and stakeholders routinely focus on high-impact issues and topics.</p><p>Creates and sustains productive two-way communication systems with students, staff, and stakeholders.</p><p>Provides leadership such that the effective communication about ongoing improvement of the school takes place barrier free.</p>",
              pL4Descriptor:
                "<p>Establishes and implements communication systems that focus student, staff, and stakeholder conversations on high impact issues and topics.</p><p>Creates systemic, two-way feedback loops used within student, staff, and stakeholder groups.</p><p>Staff and students identify and reduce barriers to effective communication about ongoing improvement of the school.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 3,
              shortName: "1.3",
              title:
                "Facilitates collaborative processes leading toward continuous improvement of teaching and learning",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Demonstrates no understanding of the value of collaboration and trust?does not model, promote, or facilitate collaboration among staff for teaching and learning.</p><p>Tolerates behaviors (competition, unhealthy interactions) that impede collaboration among staff for teaching and learning.</p>",
              pL2Descriptor:
                "<p>Demonstrates some understanding of the value of collaboration and trust?occasionally models, promotes, and facilitates collaboration among staff for teaching and learning.</p><p>Displays emerging consensus-building and negotiation skills among staff for teaching and learning.</p>",
              pL3Descriptor:
                "<p>Assumes responsibility for modeling, teaching, and promoting collaboration among staff for teaching and learning.</p><p>Actively supports and facilitates collaborative processes among staff for teaching and learning.</p>",
              pL4Descriptor:
                "<p>Has created a culture in which staff willingly and autonomously model, promote, and facilitate collaboration for teaching and learning.</p><p>Successfully creates systems that build the capacity of staff to collaborate across grade levels and subject areas for teaching and learning.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 4,
              shortName: "1.4",
              title: "Promotes and distributes leadership",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Offers no model or opportunity for distributed leadership among staff.</p><p>Makes decisions unilaterally.</p><p>Takes no responsibility for developing the leadership skills of others.</p>",
              pL2Descriptor:
                "<p>Offers differing or limited opportunities for staff to serve in appropriate leadership roles.</p><p>Decision-making is limited to selected individuals or groups.</p><p>Takes limited responsibility for developing the leadership skills of others.</p>",
              pL3Descriptor:
                "<p>Provides opportunities and invitations for a range of staff to serve in appropriate leadership roles.</p><p>Those impacted by a decision have input before a decision is finalized.</p><p>Routinely develops the leadership skills of building leaders and other staff.</p>",
              pL4Descriptor:
                "<p>Develops and depends upon structures that rely on many staff serving in appropriate leadership roles.</p><p>Builds a sense of efficacy and empowerment that results in staff ownership for final decisions.</p><p>Key staff develop the leadership skills of others by routinely teaching effective leadership skills to students and staff.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 5,
              shortName: "1.5",
              title:
                "Creates and sustains a school culture that values and responds to the characteristics and needs of each learner",
              frameworkNodeShortName: "C1",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not address the common need for others to feel welcome, safe, capable, and known.</p><p>No effort made to address the unique economic, cultural, or societal influences on individual learners.</p><p>Does not communicate high expectations for students and staff regarding school improvement.</p>",
              pL2Descriptor:
                "<p>Makes attempts to meet common needs, but the attempts do not contribute to an improved building culture.</p><p>Very little and/or ineffective effort is made to adjust school culture and programs to better meet the unique economic, cultural, or societal influences on individual learners.</p><p>Conversations about school improvement infrequently express high expectations for students and staff.</p>",
              pL3Descriptor:
                "<p>Implements programs which create a building culture that meets the common needs for others to feel welcome, safe, capable, and known.</p><p>All influences are considered by administrator when planning for and responding to the unique economic, cultural, or societal influences on individual learners.</p><p>Conversations about school improvement regularly express high expectations for students and staff.</p>",
              pL4Descriptor:
                "<p>Leads the community to initiate programs that lead to measurable improvement in building culture.</p><p>All staff are knowledgeable, sensitive and effectively responsive to the unique economic, cultural, and societal influences on individual learners.</p><p>Students and staff consistently communicate high expectations for their ability to improve the school.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 2,
          frameworkId: 1,
          shortName: "C2",
          title: "Ensuring School Safety",
          isStudentGrowthAligned: false,
          sequence: 2,
          rubricRows: [
            {
              id: 6,
              shortName: "2.1",
              title: "Provides for physical safety",
              frameworkNodeShortName: "C2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Neglects to consider the physical safety of students and staff.</p><p>Does not maintain or implement a current school safety plan.</p><p>No safety drills for earthquake, fire, and intruder/ lock-down take place.</p>",
              pL2Descriptor:
                "<p>Physically unsafe problems may be identified but are not always resolved in a timely manner.</p><p>A school safety plan exists but needs updating and/or is not widely known.</p><p>Safety drills for earthquake, fire, and intruder/lock-down are sporadic or are not taken seriously.</p>",
              pL3Descriptor:
                "<p>Physically unsafe problems are identified and the administrator is persistent in resolving them.</p><p>Maintains and implements a school safety plan, proactively monitors and updates the plan in response to new threats and changing circumstances.</p><p>Required drills are performed and students and staff follow the building procedures.</p>",
              pL4Descriptor:
                "<p>Considers potentially unsafe physical concerns and implements preventive programs which result in a reduction of harm.</p><p>In consultation with staff, students, and outside experts, updates and shares a school safety plan.</p><p>After required drills are conducted, students and staff are part of a feedback cycle to identify and address areas for improvement.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 7,
              shortName: "2.2",
              title: "Provides for social, emotional and intellectual safety",
              frameworkNodeShortName: "C2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Allows staff to devalue or remain ignorant of the authentic, lived culture of students while at school. Neglects the social safety of students and staff.</p><p>Does not acknowledge the diversity of ideas and opinions of students and staff. Students are unwilling to admit mistakes or to ask for help.</p><p>Does not have an anti-bullying policy or plan in place that promotes emotional safety.</p>",
              pL2Descriptor:
                "<p>Vocalizes the need to understand the level of social safety experienced by students and staff but does not have effective routines to gain or address this information.</p><p>Demonstrates limited acceptance for diversity of ideas and opinions of students and staff. Students rarely admit their mistakes or ask for help.</p><p>Anti-bullying policy and plan exists to promote emotional safety but is not fully effective.</p>",
              pL3Descriptor:
                "<p>Develops, implements, and monitors systems, curricula, and programs that effectively create social safety for students and staff.</p><p>Ensures a school culture in which the diversity of ideas and opinions of students and staff are acknowledged and valued. Students feel safe in the classroom admitting mistakes and asking for help.</p><p>Anti-bullying policy and plan to promote emotional safety is known and followed by students and staff.</p>",
              pL4Descriptor:
                "<p>Staff and students support systems, curricula, and programs which make social safety a top priority for staff and students.</p><p>Students and staff advocate for a diversity of ideas and opinions, respecting perspectives that arise and promote the open exchange of ideas. Classrooms promote mistakes and requests for help as an essential element of learning.</p><p>Unprompted, students and staff address bullying behaviors using tools universally taught and respected.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 8,
              shortName: "2.3",
              title: "Creates and protects identity safety",
              frameworkNodeShortName: "C2",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Is unaware or disinterested in identifying areas of discrimination within the school community.</p><p>Does not differentiate responses or proactively address disproportionate results of behavioral consequences based on an individual?s race, culture, or social status.</p>",
              pL2Descriptor:
                "<p>Recognizes the limiting impact of discrimination on student learning and social safety but does not systematically implement an effective response.</p><p>May be somewhat aware of disproportionate responses based on race, culture, or social status but is not addressing it as a priority.</p>",
              pL3Descriptor:
                "<p>The school addresses discrimination and includes positive and inclusive representations of diversity. Students display a sense of belonging and feel they can be successful within the context of the classroom and school.</p><p>Identifies and responds effectively to eliminate disproportionate responses based on an individual?s race, culture, or social status.</p>",
              pL4Descriptor:
                "<p>Students and staff take a leadership role in identifying and addressing discrimination. There is ongoing, highly-transparent work to identify and address emerging areas of discrimination.</p><p>Creates a school in which adults address the disproportionate application of responses based on an individual?s race, culture, or social status.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 3,
          frameworkId: 1,
          shortName: "C3",
          title: "Planning with Data",
          isStudentGrowthAligned: true,
          sequence: 3,
          rubricRows: [
            {
              id: 9,
              shortName: "3.1",
              title: "Recognizes and seeks out multiple data sources",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not access appropriate data to inform leadership decisions.</p>",
              pL2Descriptor:
                "<p>Accesses standard data, which is easily obtained to inform leadership decisions.</p>",
              pL3Descriptor:
                "<p>Accesses easily obtained data and creates systems to obtain additional data to inform leadership decisions.</p>",
              pL4Descriptor:
                "<p>Shows evidence that data collection systems are linked to the school improvement plan.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 10,
              shortName: "3.2",
              title:
                "Analyzes and interprets multiple data sources to inform school-level improvement efforts",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to analyze data, does so only at a cursory level, or interprets data incorrectly.</p><p>Does not share key data with students, staff, and/or stakeholders.</p>",
              pL2Descriptor:
                "<p>Data is analyzed but does not contribute to the understanding of overall progress toward building goals.</p><p>Informs students, staff, and/or stakeholders of school-wide data.</p>",
              pL3Descriptor:
                "<p>Analyzes multiple sources of data from multiple vantage points, often using staff to help draw conclusions which creates monitoring systems for the School Improvement Plan.</p><p>Creatively conveys data in ways that increase an understanding of it by students, staff, and/or stakeholders.</p>",
              pL4Descriptor:
                "<p>Leads staff to independently analyze their own data to inform their own improvement plans.d</p><p>Leads students, staff, and/or stakeholders to convey their own data so as to inform professional practice in the school.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 11,
              shortName: "3.3",
              title:
                "Creates data-driven plans for improved teaching and learning",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to create a School Improvement Plan, or it is not based on data aligned with the needs of the school or connected to the District Improvement Plan.</p><p>Fails to develop short-range plans to support the School Improvement Plan, or plans for school improvements unrelated to the School Improvement Plan.</p><p>Ignores those charged with implementing plans in the development of them.</p>",
              pL2Descriptor:
                "<p>Develops a School Improvement Plan based on standard data sources targeting specific goals, which are informed by and support the District Improvement and/or Strategic Plan.</p><p>Creates some additional plans that are developed in response to the unique needs of the school or support the School Improvement Plan.</p><p>Makes an effort to involve stakeholders who might be involved in its implementation.</p>",
              pL3Descriptor:
                "<p>Creates a comprehensive School Improvement Plan, with measurable goals and achievable timelines, and supports the District Improvement and/or Strategic Plan.</p><p>Creates short-range plans that support the School Improvement Plan, and other plans that are developed in response to analyzed data and are designed to accomplish specific goals.</p><p>Engages key stakeholders in the development of the plans to which they will be contributing.</p>",
              pL4Descriptor:
                "<p>Creates a comprehensive and challenging School Improvement Plan in a way that causes the staff to own the plan and feel a sense of urgency to accomplish its goals.</p><p>Leads in a way that links teachers? individual professional growth plans to the school?s improvement plans.</p><p>Leads in a way that key stakeholders involved in implementing the plans own them because of their involvement.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 12,
              shortName: "3.4",
              title: "Implements data-informed improvement plans",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to provide leadership to implement the plan successfully.</p><p>Monitors the plan in a sporadic and ineffective way.</p><p>Makes no effort to revise action steps of the plan in the face of marginal progress along the way.</p>",
              pL2Descriptor:
                "<p>Implements the plan to get it off the ground.</p><p>Monitors progress on the plan at key times during the duration of the plan and conveys the results to those involved.</p><p>Revises some action steps when necessary but might ignore a need to revise, or revises too often.</p>",
              pL3Descriptor:
                "<p>Implements the plan in a way that creates excitement for accomplishing the goals of the plan.</p><p>Monitors plans regularly with staff. Displays data and celebrates progress.</p><p>Revises action steps in the plan when needed to keep the plan fresh and dynamic.</p>",
              pL4Descriptor:
                "<p>Implements the plan in a way that encourages key staff members to take the lead on its implementation.</p><p>Leads in a way that key staff members regularly monitor short and long term goals including the School Improvement Plan. The celebration of progress is pervasive.</p><p>Leads in a way that staff regularly consider revisions to their action steps in order to succeed with the plan.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 29,
              shortName: "SG 3.5",
              title:
                "Provides evidence of student growth that results from the school improvement planning process",
              frameworkNodeShortName: "C3",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "School improvement planning process results in no improvement in student academic growth.",
              pL2Descriptor:
                "School improvement planning process results in minimal improvement in student academic growth.",
              pL3Descriptor:
                "School improvement planning process results in measurable improvement in student academic growth.",
              pL4Descriptor:
                "School improvement planning process results in significant improvement in student academic growth.",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 4,
          frameworkId: 1,
          shortName: "C4",
          title: "Aligning Curriculum",
          isStudentGrowthAligned: false,
          sequence: 4,
          rubricRows: [
            {
              id: 13,
              shortName: "4.1",
              title:
                "Assists staff in aligning curriculum to state and local district learning goals",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Has incomplete or insufficient knowledge of state standards and district learning goals.</p><p>Does not facilitate curriculum alignment activities with staff to determine and assure essential standards are taught across grade levels and content areas.</p>",
              pL2Descriptor:
                "<p>Has emerging knowledge of state standards and district learning goals.</p><p>Facilitates some curriculum alignment activities with staff to determine and assure essential standards are taught across grade levels and content areas.</p>",
              pL3Descriptor:
                "<p>Has strong knowledge of state standards and district learning goals.</p><p>Systematically facilitates curriculum alignment activities with staff to determine and assure essential standards are taught across grade levels and content areas.</p>",
              pL4Descriptor:
                "<p>Provides leadership and support such that staff have strong knowledge of state standards and district learning goals.</p><p>Provides leadership and support such that staff ownership of curriculum alignment and implementation of identified essential standards positively impacts opportunities to learn.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 14,
              shortName: "4.2",
              title:
                "Assists staff in aligning instructional practices to state standards and district learning goals",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Has incomplete or insufficient knowledge of instructional practices to address state standards and district learning goals.</p><p>Does not facilitate alignment of best practices for underperforming and above-proficient students across grade levels or content areas.</p>",
              pL2Descriptor:
                "<p>Has sufficient knowledge of instructional practices to address state standards and district learning goals.</p><p>Facilitates some alignment of best practices for underperforming and above-proficient students across grade levels or content areas.</p>",
              pL3Descriptor:
                "<p>Has strong knowledge of instructional practices to address state standards and district learning goals.</p><p>Systematically facilitates alignment of best instructional practices for underperforming and above-proficient students across grade levels or content areas.</p>",
              pL4Descriptor:
                "<p>Provides leadership and support such that staff have strong knowledge of instructional practices to address state standards and district learning goals.</p><p>Provides leadership and support such that staff assist each other in the alignment of best instructional practice for underperforming and above-proficient students.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 15,
              shortName: "4.3",
              title:
                "Assists staff in aligning assessment practices to state standards and district learning goals",
              frameworkNodeShortName: "C4",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Has incomplete or insufficient knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Does not lead the staff in the alignment of balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>",
              pL2Descriptor:
                "<p>Has emerging knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Leads staff in limited aspects of aligning balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>",
              pL3Descriptor:
                "<p>Has strong knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Systemically leads staff in aligning balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>",
              pL4Descriptor:
                "<p>Provides leadership and support such that staff have strong knowledge of a balanced (diagnostic, formative, and summative) assessment system to drive instruction and make adjustments to the curriculum.</p><p>Provides leadership and support such that staff take ownership for alignment of balanced (diagnostic, formative, and summative) assessment practices to support underperforming to above-proficient students across grade levels or content areas.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 5,
          frameworkId: 1,
          shortName: "C5",
          title: "Improving Instruction",
          isStudentGrowthAligned: true,
          sequence: 5,
          rubricRows: [
            {
              id: 16,
              shortName: "5.1",
              title:
                "Uses adopted instructional framework to monitor and support effective instruction and assessment practices",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not effectively monitor instruction and assessment practices of staff and/or does not provide sufficient support for staff to improve teaching and learning.</p><p>Feedback to staff demonstrates lack of/or insufficient knowledge of adopted instructional framework or its use in improving instruction and assessment practices resulting in little or no growth in teacher efficacy.</p>",
              pL2Descriptor:
                "<p>Develops and uses minimal systems and routines to monitor instruction and assessment practices of staff which result in consistent but limited support for staff to improve teaching and learning.</p><p>Feedback to staff demonstrates emerging knowledge of adopted instructional framework and its use in improving instruction and assessment practices resulting in some growth in teacher efficacy.</p>",
              pL3Descriptor:
                "<p>Develops and uses observable systems and routines to regularly monitor instruction and assessment of staff both formally and informally which result in consistent and differentiated support to staff in their efforts to improve teaching and learning.</p><p>Feedback to staff demonstrates strong knowledge of adopted instructional framework and its use in improving instruction and assessment practices resulting in evident growth in teacher efficacy.</p>",
              pL4Descriptor:
                "<p>Provides leadership and support such that staff participate in collaborative and peer-based systems and routines for monitoring instruction and assessment to support their efforts to improve teaching and learning.</p><p>Feedback to staff demonstrates expert knowledge of adopted instructional framework and it?s use in improving instruction and assessment practices resulting in growth in teacher efficacy for most teachers, demonstrated by staff effectively using the framework to independently and collaboratively reflect, monitor, and adjust instruction and assessment practices.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 17,
              shortName: "5.2",
              title:
                "Uses adopted instructional framework to evaluate instruction and assessment",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Evaluations do not meet minimum district expectations and/or lack adequate or accurate evidence from the adopted instructional framework to substantiate claims about staff performance yielding unreliable staff ratings.</p>",
              pL2Descriptor:
                "<p>Evaluations meet minimum district expectations but provide inconsistent evidence from the adopted instructional framework to substantiate claims about staff performance yielding some unreliable staff ratings.</p>",
              pL3Descriptor:
                "<p>Evaluations meet minimum district expectations and provide adequate and accurate evidence from the adopted instructional framework to substantiate claims about staff performance yielding valid and reliable staff ratings.</p>",
              pL4Descriptor:
                "<p>Evaluations exceed district expectations by differentiating needed support for individual teachers to provide consistent evidence from the adopted instructional framework to substantiate claims about staff performance yielding valid and reliable staff ratings.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 18,
              shortName: "5.3",
              title:
                "Assists staff in developing required student growth plans and identifying valid, reliable sources of evidence of effectiveness",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not assist staff in the use of multiple types of data for the identification of performance indicators and/or identified performance indicators are insufficient to identify gap-closing student growth goals.</p><p>Does not meet with staff to develop, review, and modify student growth goals (individual or group goals).</p>",
              pL2Descriptor:
                "<p>Occasionally assists staff to use multiple types of data in the identification of performance indicators resulting in unreliable gap-closing student growth goals.</p><p>Meets minimum district requirements to develop, review, and modify student growth goals (individual or group goals) but are scheduled to limit the ability to make midcourse corrections to improve teacher practice.</p>",
              pL3Descriptor:
                "<p>Regularly assists staff to use multiple types of data in the identification of performance indicators resulting in reliable gap-closing student growth goals.</p><p>Meets minimum district requirements to develop, review, and modify student growth goals (individual or group goals) and are effectively scheduled to allow timely feedback to make midcourse corrections and improve teacher practice.</p>",
              pL4Descriptor:
                "<p>Consistently provides leadership and support such that staff take ownership for and use multiple types of data to consistently identify effective performance indicators in developing reliable gap-closing student growth goals.</p><p>Consistently provides leadership and support such that staff understand and take ownership to develop, review, and modify student growth goals (individual or group goals) and make midcourse corrections and improve teacher practice.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 30,
              shortName: "SG 5.4",
              title: "Provides evidence of student growth of selected teachers",
              frameworkNodeShortName: "C5",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "Multiple measures of student achievement of selected teachers show no academic growth.",
              pL2Descriptor:
                "Multiple measures of student achievement of selected teachers show minimal academic growth.",
              pL3Descriptor:
                "Multiple measures of student achievement of selected teachers show measurable academic growth.",
              pL4Descriptor:
                "Multiple measures of student achievement of selected teachers show significant academic growth.",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 6,
          frameworkId: 1,
          shortName: "C6",
          title: "Managing Resources",
          isStudentGrowthAligned: false,
          sequence: 6,
          rubricRows: [
            {
              id: 19,
              shortName: "6.1",
              title: "Managing self",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to prioritize time causing missed deadlines and a reputation of unreliability.</p>",
              pL2Descriptor:
                "<p>Creates time-management strategies, but struggles occasionally implementing them successfully.</p>",
              pL3Descriptor:
                "<p>Creates strategies and systems to regularly meet obligations.</p>",
              pL4Descriptor:
                "<p>Engages office staff as a partner in developing and implementing personal management strategies.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 20,
              shortName: "6.2",
              title: "Recruiting and hiring",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to sell the value of teaching at their school.</p><p>Disregards established hiring processes to ensure a quality staff.</p>",
              pL2Descriptor:
                "<p>Limits hiring process to those who apply.</p><p>Follows laws, policies, and district processes in the hiring process. Reference checks are perfunctory.</p>",
              pL3Descriptor:
                "<p>Actively recruits skilled and talented teachers and other staff. Considers the need of diversifying the workforce when recruiting.</p><p>Creates a strong hiring process beyond the minimum required. Ensures that thorough background and reference checks are completed in a timely and professional manner.</p>",
              pL4Descriptor:
                "<p>Engages staff in the recruitment of prospective teachers and other staff.</p><p>Employs a rigorous process of hiring. Goes beyond candidate-supplied references to thoroughly vet applicants.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 21,
              shortName: "6.3",
              title: "Assigning staff",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Places teachers? wishes above student needs in assigning staff.</p>",
              pL2Descriptor:
                "<p>Considers both student needs and staff members? desires in assigning staff.</p>",
              pL3Descriptor:
                "<p>Takes a holistic view in assigning staff, but never compromises student needs when deciding on staff assignments.</p>",
              pL4Descriptor:
                "<p>Creates a culture whereby teacher contributions to staffing assignments put students first.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 22,
              shortName: "6.4",
              title: "Managing fiscal resources",
              frameworkNodeShortName: "C6",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Ignores regulations connected to fiscal management.</p><p>Provides little or no evidence of effectively managing financial resources.</p>",
              pL2Descriptor:
                "<p>Usually manages financial decisions in compliance with regulations.</p><p>Often connects spending to improved learning.</p>",
              pL3Descriptor:
                "<p>Creates systems to ensure that all compliance requirements are met.</p><p>Strategically manages fiscal resources to improve student learning.</p>",
              pL4Descriptor:
                "<p>Involves key staff in making or contributing to spending decisions which put student learning first.</p><p>Seeks outside and/or innovative sources of revenue to enhance existing budget.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 7,
          frameworkId: 1,
          shortName: "C7",
          title: "Engaging Families & Communities",
          isStudentGrowthAligned: false,
          sequence: 7,
          rubricRows: [
            {
              id: 23,
              shortName: "7.1",
              title: "Partners with families to promote student learning",
              frameworkNodeShortName: "C7",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Demonstrates no effort to engage families in school activities that promote student learning.</p><p>Fails to share the vision of hope and opportunity that results from healthy family/school partnerships.</p><p>Has lost the trust of parents by allowing confidential information to be inappropriately shared.</p><p>Excludes families from decision making at the school to improve student learning.</p>",
              pL2Descriptor:
                "<p>Encourages and supports involvement of families in some school activities that promote student learning.</p><p>Encourages pockets of families within the school community to see an improved future for their children by partnering with the school.</p><p>Practices personal discretion when in possession of personal information about students.</p><p>Limits family participation in some school decision- making processes to improve student learning.</p>",
              pL3Descriptor:
                "<p>Encourages and supports consistent and ongoing family engagement in school activities that promote student learning.</p><p>Shares the vision for improving learning and future opportunities for all students through wide-ranging, inclusive family partnerships.</p><p>Assures that all staff practice discretion with personal information about students.</p><p>Consistently implements effective channels for families to participate in school decision making to improve student learning.</p>",
              pL4Descriptor:
                "<p>Engaged families support student learning, led by staff who value and encourage these partnerships.</p><p>Family members and staff display a strong belief in the power of family/school partnerships to positively impact the futures of children.</p><p>Creates a culture within the school and larger community in which private student, staff, and family information is actively protected and respected by all.</p><p>Participation and engagement by families in school-based decision-making displays widely shared ownership for the student learning.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 24,
              shortName: "7.2",
              title:
                "Incorporates strategies that engage all families, particularly those that historically have been underserved",
              frameworkNodeShortName: "C7",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Treats parent community as mono-cultural. Makes little or no adjustment to meet needs and interests of under-involved groups within parent community to promote student learning.</p><p>Communication with families is mono-lingual and mono-cultural. As such, some families are less capable of supporting student growth.</p>",
              pL2Descriptor:
                "<p>Gives some attention to underserved groups within the parent community, yet these efforts are ineffective and/or unequal in nature in promoting student learning.</p><p>Has not established channels of communication accessible to all families with the aim of supporting student growth.</p>",
              pL3Descriptor:
                "<p>Recognizes and reaches out to underserved groups within the parent community to promote student learning.</p><p>Uses multiple communication channels appropriate for cultural and language differences that exist in the community with the aim of supporting student growth.</p>",
              pL4Descriptor:
                "<p>Students and staff take a leadership role in ensuring every student?s family is engaged with the school to promote student learning.</p><p>Families and staff establish and utilize culturally-inclusive communication systems which support student growth.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 25,
              shortName: "7.3",
              title: "Engages with communities to promote learning",
              frameworkNodeShortName: "C7",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Communication with community designed to promote student learning is sparse or non-existent.</p><p>Is frequently absent from the community; is not perceived as an advocate for students and schools.</p><p>Does not identify and utilize community resources in support of improved student learning.</p>",
              pL2Descriptor:
                "<p>Communication with the community to promote student learning is regular, yet is mainly informational.</p><p>Is a member but not necessarily an influential leader in the community?s shared mission to support student learning.</p><p>Identifies and utilizes some community talent and resources in support of improved student learning.</p>",
              pL3Descriptor:
                "<p>Builds effective and authentic communication systems between the community and school to promote student learning that are interactive and regularly used.</p><p>Works in partnership with community organizations and informally throughout the community to promote student learning.</p><p>Makes full use of community resources in support of improved teaching and learning.</p>",
              pL4Descriptor:
                "<p>Staff, parents, and students develop effective and inclusive communication between the school and community in support of student learning.</p><p>Is recognized outside of school for developing and implementing programs in partnership with the greater community that focus on student learning.</p><p>Businesses, community organizations, government entities, and higher education institutions seek to partner with the school to improve student learning.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
        {
          id: 8,
          frameworkId: 1,
          shortName: "C8",
          title: "Closing the Gap",
          isStudentGrowthAligned: true,
          sequence: 8,
          rubricRows: [
            {
              id: 26,
              shortName: "8.1",
              title: "Assesses data and identifies barriers",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Does not analyze data by group.</p><p>Does not identify barriers to shrinking gaps.</p>",
              pL2Descriptor:
                "<p>Analyzes limited sources of data which are disaggregated at the group level.</p><p>Identifies some barriers which prevent the shrinking of gaps.</p>",
              pL3Descriptor:
                "<p>Analyzes multiple sources of data which are disaggregated at the group level.</p><p>Identifies key barriers to close gaps.</p>",
              pL4Descriptor:
                "<p>Leads in a manner such that teachers regularly create and assess data which are disaggregated at the group level to inform their own practice.</p><p>Leads in a manner such that teachers regularly identify barriers which prevent the shrinking of gaps.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 27,
              shortName: "8.2",
              title:
                "Creates plans to dismantle barriers and increase achievements",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to create plans to shrink opportunity and achievement gaps.</p>",
              pL2Descriptor:
                "<p>Creates plans to shrink opportunity and achievement gaps that are ineffective or difficult to implement.</p>",
              pL3Descriptor:
                "<p>Creates plans with staff to shrink opportunity and achievement gaps that are effective and manageable.</p>",
              pL4Descriptor:
                "<p>Leads in a manner that staff possess the skills to develop the plans and have a personal sense of ownership of the plans.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 28,
              shortName: "8.3",
              title: "Implements and monitors plans to shrink achievement gaps",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: false,
              sequence: 0,
              pL1Descriptor:
                "<p>Fails to implement plans to shrink opportunity and achievement gaps.</p><p>Fails to monitor and adjust plans to shrink opportunity and achievement gaps.</p>",
              pL2Descriptor:
                "<p>Inconsistently implements plans to shrink opportunity and achievement gaps.</p><p>Inconsistently monitors and adjusts plans to shrink opportunity and achievement gaps.</p>",
              pL3Descriptor:
                "<p>Implements plans with fidelity to shrink opportunity and achievement gaps.</p><p>Implements a system for monitoring and adjusting plans to shrink opportunity and achievement gaps.</p>",
              pL4Descriptor:
                "<p>Leads in a manner that staff independently implement plans with fidelity to shrink opportunity and achievement gaps.</p><p>Leads in a manner that staff independently monitor and adjust plans with fidelity to shrink opportunity and achievement gaps.</p>",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
            {
              id: 31,
              shortName: "SG 8.4",
              title: "Provides evidence of growth in student learning",
              frameworkNodeShortName: "C8",
              isStudentGrowthAligned: true,
              sequence: 0,
              pL1Descriptor:
                "Achievement data from multiple sources or data points show no evidence of student growth toward narrowing gaps of targeted student groups.",
              pL2Descriptor:
                "Achievement data from multiple sources or data points show minimum evidence of student growth toward narrowing gaps of targeted student groups.",
              pL3Descriptor:
                "Achievement data from multiple sources or data points show measurable evidence of student growth toward narrowing gaps of targeted student groups.",
              pL4Descriptor:
                "Achievement data from multiple sources or data points show consistent evidence of student growth toward narrowing gaps of targeted student groups.",
              lookFor1: null,
              lookFor2: null,
              lookFor3: null,
              lookFor4: null,
            },
          ],
        },
      ],
    },
  ],
};

mock.onGet(/\/api\/frameworks\/\d+/).reply((config) => {
  const id = parseInt(config.url.split('/').pop());
  const response = frameworksDB.frameworks.find((x) => x.id === id);
  return [200, response];
});

