import { useErrorHandler } from 'react-error-boundary';

import {
  useGetUserPromptsForDistrictTierQuery,
} from "@api-slice";

import PromptGrid from './PromptGrid';

const DistrictPrompts = ({frameworkContextId, promptType}) => {

  const errorHandler = useErrorHandler();

  const { data: prompts, error: getPromptsError } = useGetUserPromptsForDistrictTierQuery({
    frameworkContextId,
    promptType
  });
  if (getPromptsError) errorHandler(getPromptsError);


  return (
    <>
      <PromptGrid prompts={prompts} />
    </>
  )
}

export default DistrictPrompts;