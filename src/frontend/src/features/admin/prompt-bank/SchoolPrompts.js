import { useErrorHandler } from 'react-error-boundary';

import {
  useGetUserPromptsForSchoolTierQuery,
} from "@api-slice";

import PromptGrid from './PromptGrid';

const SchoolPrompts = ({frameworkContextId, schoolCode, promptType}) => {

  const errorHandler = useErrorHandler();

  const { data: prompts, error: getPromptsError } = useGetUserPromptsForSchoolTierQuery({
    frameworkContextId,
    promptType: promptType.value,
    schoolCode,
  });
  if (getPromptsError) errorHandler(getPromptsError);


  return (
    <>
      <PromptGrid prompts={prompts} />
    </>
  )
}

export default SchoolPrompts;