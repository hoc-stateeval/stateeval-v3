
import { useParams } from 'react-router-dom';

const Observation = () => {

  const { id: observationId } = useParams();

  return (
    <>
      <h1>{observationId}</h1>
    </>
  )
}

export default Observation;