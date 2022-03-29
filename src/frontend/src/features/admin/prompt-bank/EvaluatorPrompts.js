import { useErrorHandler } from 'react-error-boundary';
import { useSelector } from "react-redux";

import {
  useGetUserPromptsForEvaluatorTierQuery,
} from "@api-slice";

import {
  selectCurrentUser
} from "@user-context-slice";

import PromptGrid from './PromptGrid';

const EvaluatorPrompts = ({frameworkContextId, schoolCode, promptType}) => {

  const errorHandler = useErrorHandler();
  const currentUser = useSelector(selectCurrentUser);

  const { data: prompts, error: getPromptsError } = useGetUserPromptsForEvaluatorTierQuery({
    frameworkContextId,
    promptType: promptType.value,
    schoolCode,
    evaluatorId: currentUser.id
  });
  if (getPromptsError) errorHandler(getPromptsError);


  return (
    <>
      <PromptGrid prompts={prompts} />
    </>
  )
}

export default EvaluatorPrompts;