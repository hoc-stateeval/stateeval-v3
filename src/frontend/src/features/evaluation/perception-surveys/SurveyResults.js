import { PureComponent } from 'react';
import { useErrorHandler } from "react-error-boundary";

import {
  Box,
  Grid,
  Paper,
  Stack,
  Typography
} from "@mui/material";

import { 
  Bar, 
  BarChart, 
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis, 
  YAxis} from 'recharts';


import {
  useGetPerceptionSurveyResponsesQuery
} from "@api-slice";

import tableData from "./studentSurveyTableData";

const series = tableData.map(x=>x.levelOfAgreementTitle);

const SurveyResults = ({survey, statements}) => {

  const errorHandler = useErrorHandler();

  const { data: responses, error: getResponsesError } = 
    useGetPerceptionSurveyResponsesQuery(survey.id);
  if (getResponsesError) errorHandler(getResponsesError);

  const  getPercentForStatementLevelOfAgreement = (levelOfAgreement, statement) => {
    const responsesForStatement = responses.filter(x=>x.statementId === statement.id);
    const responsesAtLevel = responsesForStatement.filter(x=>x.levelOfAgreement === levelOfAgreement);
    if (responsesAtLevel.length===0) return 0;
    const percent = (responsesAtLevel.length/responsesForStatement.length)*100;
    return percent;
  }

  const generateBarChartForStatement = (statement) => {

    let data = tableData.map(x=> {
      return {
        name: x.levelOfAgreementTitle,
        percent: getPercentForStatementLevelOfAgreement(x.levelOfAgreementValue, statement)
      }
    }
    )

    data.push({
      name: 'Not answered',
      percent: getPercentForStatementLevelOfAgreement(0, statement)
    })
    // const data = [
    //   {
    //     name: 'Page A',
    //     uv: 4000,
    //     pv: 2400,
    //     amt: 2400,
    //   },
    //   {
    //     name: 'Page B',
    //     uv: 3000,
    //     pv: 1398,
    //     amt: 2210,
    //   },
    //   {
    //     name: 'Page C',
    //     uv: 2000,
    //     pv: 9800,
    //     amt: 2290,
    //   },
    //   {
    //     name: 'Page D',
    //     uv: 2780,
    //     pv: 3908,
    //     amt: 2000,
    //   },
    //   {
    //     name: 'Page E',
    //     uv: 1890,
    //     pv: 4800,
    //     amt: 2181,
    //   },
    //   {
    //     name: 'Page F',
    //     uv: 2390,
    //     pv: 3800,
    //     amt: 2500,
    //   },
    //   {
    //     name: 'Page G',
    //     uv: 3490,
    //     pv: 4300,
    //     amt: 2100,
    //   },
    // ];
    return (
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar  dataKey="percent" fill="#8884d8" />
      </BarChart>);
  }

  if (!responses) {
    return (<></>)
  }
  else {
    // let labels = [];
    // let datasets = tableData.map(x=> {return {label: x.levelOfAgreementTitle, data: []}});
    // for (const statement of statements) {
    //   labels.push(statement.text);
    // //  datasets[0].data.push(getResponseCountForStatement(0, statement));
    //   datasets[0].data.push(getResponseCountForStatement(1, statement));
    //   datasets[1].data.push(getResponseCountForStatement(2, statement));
    //   datasets[2].data.push(getResponseCountForStatement(3, statement));
    //   datasets[3].data.push(getResponseCountForStatement(4, statement));
    //   datasets[4].data.push(getResponseCountForStatement(5, statement));
    // }

    // let data = {
    //   labels,
    //   datasets
    // }

    return (
      <>
        <Stack direction="column" spacing={3}>
          {statements.map((x,i)=> (
            <Box key={i}>
              <Typography variant="h4">{x.text}</Typography>
              {generateBarChartForStatement(x)}
            </Box>
          ))}
        </Stack>
         
        {/* <Box sx={{ width: '100%' }}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {statements.map((x,i)=>(
              <Grid key={i} item xs={12}>
                <Typography>{x.text}</Typography>
                {generateBarChartForStatement(x)}
                </Grid> 
            ))}
          </Grid>
        </Box> */}
      </>
    )
  }

}

export default SurveyResults;