

/***********************************************************************************/
DECLARE @sql_error INT,@tran_count INT,@sql_error_message NVARCHAR(500), @prevVersion bigint
DECLARE @BugFixed bigint, @title varchar(100), @comment varchar(400), @ahora dateTime
SELECT  @ahora = GETDATE(), @sql_error= 0,@tran_count = @@TRANCOUNT 


-- DAN
-- drop table #tmp
create table #tmp(id bigint identity(1,1), shortname varchar(max), rubricrowId bigint , stmt varchar(max), cmd varchar(max))
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'I feel respected by my teacher.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'In this class, students help each other to learn.' 
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'In this class, students work well together in groups.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'My teacher encourages us to take risks if something is the right thing to do.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'My teacher encourages us to think about different points of view when they are discussed in class.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'My teacher shows respect for my culture.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'My teacher wants to know about me as a person.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'Students in this class treat the teacher with respect.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'Students respect each other in this class.'
insert #tmp(shortName, rubricrowId, stmt) select '2a',null,	'When something is hard for us, my teacher still makes us try.'
insert #tmp(shortName, rubricrowId, stmt) select '2b',null,	'I have learned in this class not to give up, even when things get difficult.'
insert #tmp(shortName, rubricrowId, stmt) select '2b',null,	'My teacher connects our learning to real life.'
insert #tmp(shortName, rubricrowId, stmt) select '2b',null,	'My teacher expects students in this class to work hard.'
insert #tmp(shortName, rubricrowId, stmt) select '2b',null,	'My teacher is excited about what he/she is teaching me.'
insert #tmp(shortName, rubricrowId, stmt) select '2b',null,	'My teacher makes learning enjoyable.'
insert #tmp(shortName, rubricrowId, stmt) select '2b',null,	'My teacher!!s excitement for a topic encourages me to learn more about the topic.'
insert #tmp(shortName, rubricrowId, stmt) select '2c',null,	'I know the routines and procedures of my classroom'
insert #tmp(shortName, rubricrowId, stmt) select '2c',null,	'I know where to get materials in my classroom.'
insert #tmp(shortName, rubricrowId, stmt) select '2c',null,	'I use my time wisely during class.'
insert #tmp(shortName, rubricrowId, stmt) select '2c',null,	'Our class stays on task and does not waste time.'
insert #tmp(shortName, rubricrowId, stmt) select '2c',null,	'Students know what they should be doing in this class.'
insert #tmp(shortName, rubricrowId, stmt) select '2c',null,	'Students know what to do when they enter the classroom.'
insert #tmp(shortName, rubricrowId, stmt) select '2d',null,	'My classmates behave the way our teacher says we should.'
insert #tmp(shortName, rubricrowId, stmt) select '2d',null,	'My teacher always talks to students who pick on other students.'
insert #tmp(shortName, rubricrowId, stmt) select '2d',null,	'My teacher helps students make better choices when they are misbehaving.'
insert #tmp(shortName, rubricrowId, stmt) select '2d',null,	'When somebody in the class does not behave, my teacher deals with it in the right way.'
insert #tmp(shortName, rubricrowId, stmt) select '2d',null,	'My teacher notices when I follow the rules.'
insert #tmp(shortName, rubricrowId, stmt) select '2d',null,	'Student behavior in this class is appropriate.'
insert #tmp(shortName, rubricrowId, stmt) select '2e',null,	'I can adjust my learning space when needed.'
insert #tmp(shortName, rubricrowId, stmt) select '2e',null,	'I can easily see and hear my teacher.'
insert #tmp(shortName, rubricrowId, stmt) select '2e',null,	'My teacher uses technology to help me learn.'
insert #tmp(shortName, rubricrowId, stmt) select '2e',null,	'The class is arranged so students can move around the room safely and comfortably.'
insert #tmp(shortName, rubricrowId, stmt) select '2e',null,	'The materials and resources in this classroom are organized so we use them easily.'
insert #tmp(shortName, rubricrowId, stmt) select '2e',null,	'This classroom is arranged so I can learn.' 
insert #tmp(shortName, rubricrowId, stmt) select '3a',null,	'If students don�t understand something, my teacher explains it another way.'
insert #tmp(shortName, rubricrowId, stmt) select '3a',null,	'My teacher clearly tells us what we are supposed to learn during a lesson.'
insert #tmp(shortName, rubricrowId, stmt) select '3a',null,	'If class material something I!!m learning gets hard for me, I know my teacher will help me.'
insert #tmp(shortName, rubricrowId, stmt) select '3a',null,	'My teacher lets me teach other students how I solved a problem.'
insert #tmp(shortName, rubricrowId, stmt) select '3a',null,	'When students ask questions, my teacher!!s answers are clear to me.'
insert #tmp(shortName, rubricrowId, stmt) select '3b',null,	'In our class discussion, students add to the ideas of other students.'
insert #tmp(shortName, rubricrowId, stmt) select '3b',null,	'My teacher asks questions that help me continue to think.'
insert #tmp(shortName, rubricrowId, stmt) select '3b',null,	'My teacher expects everyone to participate in class discussions.'
insert #tmp(shortName, rubricrowId, stmt) select '3b',null,	'My teacher uses multi-step problems or questions that require me to think deeply.'
insert #tmp(shortName, rubricrowId, stmt) select '3b',null,	'Students are encouraged to participate in class discussions.'
insert #tmp(shortName, rubricrowId, stmt) select '3b',null,	'Students respond to questions that other students ask.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'In this class, we use many different activities to help students learn.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'My teacher gives us time to reflect on what we have learned.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'My teacher makes learning interesting.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'My teacher makes us explain our answers and why we think what we think.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'Sometimes my teacher asks us to solve problems in teams.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'Students have the chance to do more challenging work during class.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'The work in this class encourages us me to think deeply. '
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'The work in this class really makes me think.'
insert #tmp(shortName, rubricrowId, stmt) select '3c',null,	'There is enough time for us to learn what we need to learn.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'I know what high quality work looks like.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'I use scales or rubrics given by the teacher to judge how well I have done my work.' 
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'Students help my the teacher develop guidelines (e.g., student work examples, rubrics, criteria) that we will use to grade our assignments.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'My teacher checks for our understanding after a lesson.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'My teacher explains what good work looks like on assignments and projects.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'My teacher knows when I need help.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'If I don!!t understand something, my teacher will notice.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'My teacher provides feedback quickly so I know how to do better with my next assignment.'
insert #tmp(shortName, rubricrowId, stmt) select '3d',null,	'My teacher shares with me steps I need to take to do better.'
insert #tmp(shortName, rubricrowId, stmt) select '3e',null,	'My teacher makes connections to current events.'
insert #tmp(shortName, rubricrowId, stmt) select '3e',null,	'My teacher uses things that interest me to explain ideas.' 
insert #tmp(shortName, rubricrowId, stmt) select '3e',null,	'My teacher encourages me to ask for help when I need it.'
insert #tmp(shortName, rubricrowId, stmt) select '3e',null,	'When students encounter problems working towards a goal, my teacher encourages us to keep working at it.'

update #tmp
   set rubricRowId = rr.id
  from rubricrow rr
 where rr.frameworktagname='DAN' 
	    and rr.schoolyear=2021
		and rr.shortname=#tmp.shortName

update #tmp
   set cmd='INSERT PerceptionSurveyStatement(FrameworkTagName, RubricRowID, [Text]) SELECT ''DAN'', ' + CONVERT(VARCHAR, tmp.RubricRowID) + ', ''' + tmp.stmt + '''' FROM #tmp AS tmp

DECLARE @IMAX INT,
        @ICOUNT INT
DECLARE @CMD VARCHAR(MAX)

Declare @I BIGINT = 1    
declare @count BIGINT = (select Count(*)  from #tmp)    
while(@I < = @count)    
  begin  

        SELECT @CMD = cmd
        FROM #tmp
        where   ID = @I

        EXEC(@CMD)
   set @I =@I +1    
  end    

truncate table #tmp

insert #tmp(shortName, rubricrowId, stmt) select 'A1'	,null,'My teacher helps me identify my strengths.'
insert #tmp(shortName, rubricrowId, stmt) select 'A1'	,null,'My teacher helps me learn by showing me how to use my strengths.'
insert #tmp(shortName, rubricrowId, stmt) select 'A1'	,null,'My teacher helps me set learning goals.'
insert #tmp(shortName, rubricrowId, stmt) select 'A1'	,null,'Students in this class use rubrics to judge for ourselves what we have learned.'
insert #tmp(shortName, rubricrowId, stmt) select 'A4'	,null,'If the class does not understand what is being taught, my teacher quickly makes changes to help us learn.'
insert #tmp(shortName, rubricrowId, stmt) select 'A4'	,null,'Before my work is graded, my teacher reviews my work with me so I can improve it.'
insert #tmp(shortName, rubricrowId, stmt) select 'A4'	,null,'My teacher checks to make sure we understand what we need to learn.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC1'	,null,'The materials and resources in this classroom are organized so we use them easily.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC1'	,null,'If I need something during class, I know where to find it.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC1'	,null,'The way the classroom is set up supports my learning.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC3'	,null,'If I misbehave in class, my teacher helps me make better choices.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC3'	,null,'My teacher knows if I am not getting my work done in class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC3'	,null,'My teacher maintains good control of the class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC3'	,null,'Our class stays busy and does not waste time.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'Students support each other in class so we all can be successful.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'If a student disrespects others in this class, the teacher handles the situation fairly.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'My teacher shows us how to respect different opinions in class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'I feel comfortable asking questions and sharing my ideas during class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'I feel like I am a valuable member of my class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'My teacher makes me feel like I am an important part of the class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'I feel respected by my teacher.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'I feel understood by other students in my class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'I feel a positive connection with my teacher.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC4'	,null,'Students in this class are given time to share our thoughts and ideas with other students.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC5'	,null,'My teacher encourages us to think about different points of view when they are discussed in class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC5'	,null,'In this class, we are learning to respect different ideas and opinions.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC5'	,null,'In this class, making mistakes is seen as an important part of the learning process.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC5'	,null,'I know the rules we should follow when we work in groups and have class discussions.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC5'	,null,'My teacher makes it clear how students should behave in class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CEC5'	,null,'I am given chances to work with my classmates to help me learn.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP4'	,null,'In this class, I have the opportunity to show what I have learned in many ways (such as using graphs, pictures, and words).'
insert #tmp(shortName, rubricrowId, stmt) select 'CP4'	,null,'My teacher shares with me steps I need to take to do better.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP4'	,null,'My teacher understands the best way for me to learn.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP4'	,null,'My teacher assesses my learning in different ways.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP4'	,null,'My teacher knows what might be hard for us to understand and gives us several ways to understand it.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP4'	,null,'Students have the chance to do more challenging work during class.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP5'	,null,'The work in this class is challenging but not too difficult for me.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP5'	,null,'If material is confusing, my teacher knows how to break it down so I can understand it.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP5'	,null,'My teacher guides us through challenging learning activities when we need it.'
insert #tmp(shortName, rubricrowId, stmt) select 'CP5'	,null,'The activities we do in this class help me understand difficult ideas.'
insert #tmp(shortName, rubricrowId, stmt) select 'P2'	,null,'I can connect what we learn in this class to what we learn in other subjects.'
insert #tmp(shortName, rubricrowId, stmt) select 'P2'	,null,'My teacher connects what I have already learned with what I am learning now.'
insert #tmp(shortName, rubricrowId, stmt) select 'P2'	,null,'Our class activities help me understand difficult ideas.'
insert #tmp(shortName, rubricrowId, stmt) select 'P2'	,null,'My teacher helps me think about what I already know.'
insert #tmp(shortName, rubricrowId, stmt) select 'P2'	,null,'I use ideas from class in my daily life.'
insert #tmp(shortName, rubricrowId, stmt) select 'P2'	,null,'The things I am learning in class can be used in my daily life.'
insert #tmp(shortName, rubricrowId, stmt) select 'P4'	,null,'If asked, I can explain what I am learning and why.'
insert #tmp(shortName, rubricrowId, stmt) select 'P4'	,null,'During a lesson, my teacher explains the learning goals in ways I can understand.'
insert #tmp(shortName, rubricrowId, stmt) select 'P4'	,null,'My teacher has me check to see if I understand what I am supposed to learn.'
insert #tmp(shortName, rubricrowId, stmt) select 'P4'	,null,'My teacher helps us see how things we learn in class will help us in the future.'
insert #tmp(shortName, rubricrowId, stmt) select 'P5'	,null,'My teacher tells me in advance how my work is going to be graded.'
insert #tmp(shortName, rubricrowId, stmt) select 'P5'	,null,'My teacher helps me know how well I am doing as we progress through a unit.'
insert #tmp(shortName, rubricrowId, stmt) select 'P5'	,null,'I know what high quality work looks like.'
insert #tmp(shortName, rubricrowId, stmt) select 'P5'	,null,'My teacher gives us rubrics so we are clear about how our work will be judged.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE1'	,null,'My teacher uses questions that help me think of different answers.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE1'	,null,'My teacher asks questions that make me think about my learning.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE1'	,null,'My teacher asks me deeper questions to see if I understand what is being taught.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE2'	,null,'My teacher uses our mistakes to help us all learn from them.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE2'	,null,'In this class, we can sometimes choose the assignments we do.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE2'	,null,'My teacher gives students choices about how to show what we have learned.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE3'	,null,'My teacher knows me and uses that information to help me learn.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE3'	,null,'My teacher shows respect for my culture.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE3'	,null,'My teacher values my cultural heritage.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE3'	,null,'My teacher values my unique experiences.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE4'	,null,'My teacher wants us to share our thoughts and ideas about our class work.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE4'	,null,'My teacher expects everyone to participate in class discussions.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE4'	,null,'Students in this class get to talk to each other about what we are learning.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE5'	,null,'In this class, the teacher encourages students to challenge each other!!s thinking.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE5'	,null,'I use evidence to explain my thinking.' 
insert #tmp(shortName, rubricrowId, stmt) select 'SE5'	,null,'My teacher asks us to share what we have learned in a lesson.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE5'	,null,'My teacher asks me to explain my thinking.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE5'	,null,'My teacher gives us time to talk to each other to share our thinking about a topic.'
insert #tmp(shortName, rubricrowId, stmt) select 'SE5'	,null,'My teacher expects us to ask other students if we need help.'

update #tmp
   set rubricRowId = rr.id
  from rubricrow rr
 where rr.frameworktagname='CEL' 
	    and rr.schoolyear=2021
		and rr.shortname=#tmp.shortName

update #tmp
   set cmd='INSERT PerceptionSurveyStatement(FrameworkTagName, RubricRowID, [Text]) SELECT ''CEL'', ' + CONVERT(VARCHAR, tmp.RubricRowID) + ', ''' + tmp.stmt + '''' FROM #tmp AS tmp

SELECT @I = 1    
SELECT @count = (select Count(*)  from #tmp)    
while(@I < = @count)    
  begin  

        SELECT @CMD = cmd
        FROM #tmp
        where   ID = @I

        EXEC(@CMD)
   set @I =@I +1    
  end  

truncate table #tmp

insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher provides us with examples of excellent work so I understand what is expected of me.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher works with us to develop guidelines or rubrics that we will use to evaluate our assignments.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'I use scales or rubrics given by the teacher to judge how well I have done my work.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher explains what good work looks like on assignments and projects.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'When asked, I can explain what I am learning and why.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher clearly communicates what I�m supposed to be learning during lessons.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'The things I do in class are designed to help me achieve the learning goal.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher tells me how well I am doing in class.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher talks to me about what I need to do to move up to the next score level on each of our learning goals.'
insert #tmp(shortName, rubricrowId, stmt) select '1.1', null,	'My teacher uses lots of different kinds of tests, activities, and assignments to assign scores.'

insert #tmp(shortName, rubricrowId, stmt) select '1.2', null,	'My teacher helps me know how well I am doing as we progress through a unit.'
insert #tmp(shortName, rubricrowId, stmt) select '1.2', null,	'My teacher celebrates learning in our class.'
insert #tmp(shortName, rubricrowId, stmt) select '1.2', null,	'My teacher notices me when I reach my learning goal.'
insert #tmp(shortName, rubricrowId, stmt) select '1.2', null,	'The level of my work in this class goes beyond what I thought I could do.'
insert #tmp(shortName, rubricrowId, stmt) select '1.2', null,	'My teacher celebrates students who grow, regardless of their final grade/score.'

insert #tmp(shortName, rubricrowId, stmt) select '1.3', null,	'My teacher cares about my well-being beyond just my class work.'
insert #tmp(shortName, rubricrowId, stmt) select '1.3', null,	'My teacher wants to know about the things I am interested in.'
insert #tmp(shortName, rubricrowId, stmt) select '1.3', null,	'I see people who look like me in the books and resources we use in this class.'
insert #tmp(shortName, rubricrowId, stmt) select '1.3', null,	'I feel comfortable asking my teacher questions about what I am learning.'
insert #tmp(shortName, rubricrowId, stmt) select '1.3', null,	'My teacher treats students in this class with respect.'

insert #tmp(shortName, rubricrowId, stmt) select '1.4', null,	'My teacher thinks I can succeed.'
insert #tmp(shortName, rubricrowId, stmt) select '1.4', null,	'Even if the lessons are difficult in my class, I know I can do the work and learn something new.'
insert #tmp(shortName, rubricrowId, stmt) select '1.4', null,	'My teacher expects all students to succeed.'

insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher often asks us to summarize what we have learned in a lesson.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'In this class, students encourage each other to do their best work.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher wants me to explain my answers and why I think what I think.'

insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher tells me what information is most important.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher sometimes asks me to work in a group when I am learning new information.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher helps me think about what I already know.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher teaches me new information a little bit at a time.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher gives me time to think about what I�ve learned'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher helps me learn things that he or she didn�t teach in class.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher asks me to show my learning using words, pictures, charts, or diagrams.'
insert #tmp(shortName, rubricrowId, stmt) select '2.1', null,	'My teacher asks me to think about what I�ve learned.'

insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher expects me to explain my thinking when I present my work.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher shares with me steps I need to take to do better.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'In this class, we learn to correct our mistakes.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher often gives me feedback that helps me learn and understand how to improve.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher expects my best effort in this class.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher usually knows whether or not I understand a topic.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'In this class, I show what I have learned in many ways (such as using graphs, pictures, and words).'

insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher reminds me of what we�ve already learned.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher asks me to work in a group to practice skills or to think about information that I have learned.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My homework helps me practice a skill or explore information I learned in class.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher asks me to think about how things are like each other and different from one another. '
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher asks me to look for errors in the information I hear or read.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'My teacher asks me to practice things over and over until I get good at them.'
insert #tmp(shortName, rubricrowId, stmt) select '2.2', null,	'I can explain how my understanding of a topic changed over the course of a unit. '

insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'I can connect what we learn in this class to what we learn in other subjects.'
insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'My teacher uses questions that help me think of different answers.'
insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'In this class, students work together to help each other learn.'
insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'Students in this class focus more on the quality of our work rather than on how much work we do.'

insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'My teacher asks me to solve problems in teams.'
insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'My teacher asks me to make predictions and find out if they are correct.'
insert #tmp(shortName, rubricrowId, stmt) select '2.3', null,	'My teacher is always willing to help me and provide guidance.'


insert #tmp(shortName, rubricrowId, stmt) select '2.4', null,	'My teacher gives me time to think about my answer to a question.'
insert #tmp(shortName, rubricrowId, stmt) select '2.4', null,	'My teacher has us talk to a partner or with a team before we answer questions.'

insert #tmp(shortName, rubricrowId, stmt) select '2.4', null,	'My teacher gives me time to think about my answer to a question.'
insert #tmp(shortName, rubricrowId, stmt) select '2.4', null,	'My teacher asks difficult questions of all students in this class.'


insert #tmp(shortName, rubricrowId, stmt) select '2.5', null,	'My teacher asks me to explain the thinking behind my answers to questions.'
insert #tmp(shortName, rubricrowId, stmt) select '2.5', null,	'The teacher doesn�t let me give up when the work gets hard in this class.'
insert #tmp(shortName, rubricrowId, stmt) select '2.5', null,	'My teacher expresses appreciation when I answer a question.'
insert #tmp(shortName, rubricrowId, stmt) select '2.5', null,	'My teacher is willing to phrase questions differently to help me understand them.'

insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher notices when I�m not interested in what he or she is teaching.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher uses games to review information or teach new material.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher wants everyone to participate in class discussions.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher asks me to move around during class. '
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher keeps class moving at a good pace.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher likes teaching.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher asks us to talk about our opinions in class.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher wants to know about me and what I am interested in.'
insert #tmp(shortName, rubricrowId, stmt) select '2.6', null,	'My teacher tells me interesting or unusual facts about what I am learning.'

insert #tmp(shortName, rubricrowId, stmt) select '2.7', null,	'I feel confident about using important vocabulary words I have learned. '
insert #tmp(shortName, rubricrowId, stmt) select '2.7', null,	'My teacher repeats key vocabulary words many times within a lesson. '
insert #tmp(shortName, rubricrowId, stmt) select '2.7', null,	'My teacher helps me understand the important words in a lesson.'

insert #tmp(shortName, rubricrowId, stmt) select '3.1', null,	'My teacher gives us opportunities to push our own learning beyond what the class might do.'

insert #tmp(shortName, rubricrowId, stmt) select '3.2', null,	'Sometimes my teachers works with me or in a small group to make sure I learn what I need to learn.'
insert #tmp(shortName, rubricrowId, stmt) select '3.2', null,	'My teacher takes time to make sure I understand what is being taught.'

insert #tmp(shortName, rubricrowId, stmt) select '3.2', null,	'I know where I can find resources to help me with my learning.'
insert #tmp(shortName, rubricrowId, stmt) select '3.2', null,	'My teacher notices my contributions to the work in our class.'

insert #tmp(shortName, rubricrowId, stmt) select '5.1', null,	'The materials and resources in this classroom are organized so we use them easily.'
insert #tmp(shortName, rubricrowId, stmt) select '5.1', null,	'I can use the information posted in my classroom to help me learn.'
insert #tmp(shortName, rubricrowId, stmt) select '5.1', null,	'I can adjust my learning space when needed.'
insert #tmp(shortName, rubricrowId, stmt) select '5.1', null,	'I can easily see and hear my teacher.'
insert #tmp(shortName, rubricrowId, stmt) select '5.1', null,	'I can find and get the tools I need for learning.'
insert #tmp(shortName, rubricrowId, stmt) select '5.1', null,	'The class is arranged so students can move around the room safely and comfortably.'
insert #tmp(shortName, rubricrowId, stmt) select '5.2', null,	'Class meetings give me the chance to say what is on my mind.'
insert #tmp(shortName, rubricrowId, stmt) select '5.2', null,	'My teacher Involves students when creating classroom routines.'
insert #tmp(shortName, rubricrowId, stmt) select '5.2', null,	'My teacher reminds students of the class rules and procedures, when necessary.'
insert #tmp(shortName, rubricrowId, stmt) select '5.3', null,	'My teacher deals with potential problems before they become big.'
insert #tmp(shortName, rubricrowId, stmt) select '5.3', null,	'My teacher is aware of what!!s going on in the classroom.'
insert #tmp(shortName, rubricrowId, stmt) select '5.3', null,	'My teacher moves around the room and helps students stay on task.'
insert #tmp(shortName, rubricrowId, stmt) select '5.4', null,	'Our class stays on task and does not waste time.'
insert #tmp(shortName, rubricrowId, stmt) select '5.4', null,	'When students misbehave in class, my teacher helps them make better choices.'
insert #tmp(shortName, rubricrowId, stmt) select '5.4', null,	'When a student disrespects others in this class, the teacher handles the situation fairly.'
insert #tmp(shortName, rubricrowId, stmt) select '5.4', null,	'My teacher makes it clear how students should behave in class.'
insert #tmp(shortName, rubricrowId, stmt) select '5.5', null,	'My teacher lets my family know when I am doing a good job in class.'
insert #tmp(shortName, rubricrowId, stmt) select '5.5', null,	'My teacher acknowledges us when we follow class rules and procedures.'

insert #tmp(shortName, rubricrowId, stmt) select '5.5', null,	'My teacher notices when I follow the rules.'

insert #tmp(shortName, rubricrowId, stmt) select '5.6', null,	'My teacher uses hand signals, count downs, or other non-verbal cues to get the students!! attention.'
insert #tmp(shortName, rubricrowId, stmt) select '5.6', null,	'My teacher will wait until the class is focused to start teaching.'
insert #tmp(shortName, rubricrowId, stmt) select '5.6', null,	'No matter who my teacher talks to, he/she stays respectful.'
insert #tmp(shortName, rubricrowId, stmt) select '6.1', null,	'We spend time in class practicing the type of items that will appear on an assessment.'
insert #tmp(shortName, rubricrowId, stmt) select '6.1', null,	'I know what will be on a future assessment.'
insert #tmp(shortName, rubricrowId, stmt) select '6.1', null,	'My teacher assesses the class based on what has been taught.'
insert #tmp(shortName, rubricrowId, stmt) select '6.1', null,	'My teacher explains ahead of time how assessments will be graded.'
insert #tmp(shortName, rubricrowId, stmt) select '6.2', null,	'I am able to choose how to show my learning (e.g., write a paper, prepare a presentation, make a video.)'
insert #tmp(shortName, rubricrowId, stmt) select '6.2', null,	'During our class time, not everyone is doing the same assignment.'
insert #tmp(shortName, rubricrowId, stmt) select '6.3', null,	'My teacher asks me to share my understanding of what we have learned in class.'
insert #tmp(shortName, rubricrowId, stmt) select '6.3', null,	'My teacher helps me track my progress on a learning goal.'

update #tmp
   set rubricRowId = rr.id
  from rubricrow rr
 where rr.frameworktagname='MAR-TR' 
	    and rr.schoolyear=2021
		and rr.shortname=#tmp.shortName

update #tmp
   set cmd='INSERT PerceptionSurveyStatement(FrameworkTagName, RubricRowID, [Text]) SELECT ''MAR-TR'', ' + CONVERT(VARCHAR, tmp.RubricRowID) + ', ''' + tmp.stmt + '''' FROM #tmp AS tmp

SELECT @I = 1    
SELECT @count = (select Count(*)  from #tmp)    
while(@I < = @count)    
  begin  

        SELECT @CMD = cmd
        FROM #tmp
        where   ID = @I

        EXEC(@CMD)
   set @I =@I +1    
  end  

  update PerceptionSurveyStatement SET [Text]=REPLACE([Text], '!!', '''')
