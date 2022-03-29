import { useErrorHandler } from 'react-error-boundary';

import {
  useGetUserPromptsForDistrictTierQuery,
  useCreateUserPromptMutation,
  useUpdateUserPromptMutation
} from "@api-slice";

import PromptGrid from './PromptGrid';

const DistrictPrompts = ({frameworkContextId, promptType}) => {

  const errorHandler = useErrorHandler();

  const { data: prompts, error: getPromptsError } = useGetUserPromptsForDistrictTierQuery({
    frameworkContextId,
    promptType: promptType.value
  });
  if (getPromptsError) errorHandler(getPromptsError);

  const [createPromptAPI, {error: createPromptError}] = useCreateUserPromptMutation();
  if (createPromptError) errorHandler(createPromptError);

  const [updatePromptAPI, {error: updatePromptError}] = useCreateUserPromptMutation();
  if (updatePromptError) errorHandler(updatePromptError);

  const createPrompt = async () => {

  }

  const updatePrompt = async () => {

  }

  return (
    <>
      <PromptGrid prompts={prompts} prmoptType={promptType} createPromptFcn={createPrompt} updatePromptFcn={updatePrompt} />
    </>
  )
}

export default DistrictPrompts;