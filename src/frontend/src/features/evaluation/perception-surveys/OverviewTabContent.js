import { 
  Stack,
  Typography
} from "@mui/material";

import CSTPImage from "../../../images/cstp.png";

const OverviewTabContent = () => {
  return (
    <Stack direction="column" spacing={2}>
      <img style={{width: '200px'}} src={CSTPImage} alt="CSTP Logo" />
      <Typography>
        Are you interested in hearing your students' perceptions of instruction, their learning and how they feel about class? Student perception surveys are a tool to do just that. After three years of developing our understanding and knowledge base about student perception surveys, testing various tools and working with Washington educators on what might be most useful, Washington State is launching a student perception survey feature in eVAL that is available and accessible to any Washington teacher. This intent of this survey feature is that it will be used as a reflective tool that allows teachers to better understand student perceptions and adjust practices to better support each student in the classroom.
        The Student Perception Survey items were collaboratively developed with and informed by educators, OSPI and CSTP with connections to each instructional framework. Survey items have been pre-tested and piloted by over 3,000 students in Washington. Teachers can self-select survey items they want to use with their students and receive results from students quickly, which teachers can then use to inform decisions and changes they may want to make to their instruction and practice.
        What teachers should know about this feature:
      </Typography>
      <ul>
          <li>
            <Typography>Student responses are anonymous and teachers will see aggregate results that aren't identifiable.
            </Typography>
          </li>
          <li>
            <Typography>Survey items have been matched up to observable components and elements of each of the instructional frameworks. Teachers will want to select items from their district’s instructional framework and the appropriate grade levels. 
            </Typography>
          </li>
          <li>
            <Typography>Survey items have been tested and piloted with WA students, are focused on the teaching and learning environment of the classroom and responses are based on a 5 point Likert scale (strongly disagree to strongly agree). 
            </Typography>
          </li>
          <li>
          <Typography>While teachers can decide whether they share the results of the student perception surveys with their administrator, teachers should know that these results are better protected from a public records request if they are discussed with an evaluator. This doesn’t mean results must be shared, but the teacher must have a conversation about what they have noticed in the results that has created an interest in changing their practice, setting a new goal for the year, etc. 
            </Typography>
          </li>
          <li>
            <Typography>This feature is electronically-based; therefore, students will need access to a device that has an internet connection.  
            </Typography>
          </li>
          <li>
            <Typography>There are demographic questions students will be asked to respond to at the end of their survey. This information is for state use only and will not be shared with teachers or others.
            </Typography>
          </li>
      </ul>
    </Stack>
  )
}

export default OverviewTabContent;