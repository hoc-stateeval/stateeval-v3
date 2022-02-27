import { useParams } from "react-router-dom";

const PerceptionSurvey = () => {

  const { id } = useParams();
  return (
    <>
    <h1>{id}</h1>
    </>
  )
}

export default PerceptionSurvey;