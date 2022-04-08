import { useErrorHandler } from 'react-error-boundary';

import {
  useGetUserPromptsForDistrictTierQuery,
  useCreateDistrictUserPromptMutation,
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

  const [ createPromptAPI, { error: createPromptError}] = useCreateDistrictUserPromptMutation();
  if (createPromptError) errorHandler(createPromptError);


  const [updatePromptAPI, {error: updatePromptError}] = useUpdateUserPromptMutation();
  if (updatePromptError) errorHandler(updatePromptError);

  const createPrompt = async (prompt) => {
    await createPromptAPI({
      ...prompt,
      frameworkContextId: frameworkContextId,

    })
  }

  const updatePrompt = async () => {
    await updatePromptAPI(prompt);
  }

  return (
    <>
      <PromptGrid prompts={prompts} promptType={promptType} createPromptFcn={createPrompt} updatePromptFcn={updatePrompt} />
    </>
  )
}

export default DistrictPrompts;