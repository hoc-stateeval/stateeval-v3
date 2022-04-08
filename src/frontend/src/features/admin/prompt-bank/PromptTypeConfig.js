import { useSelector } from 'react-redux';

import {
  selectActiveWorkAreaContext,
} from '@user-context-slice';

import { PageSectionHeader } from "@components";
import { UserPromptTier } from "@lib/enums";
import DistrictPrompts from "./DistrictPrompts";
import SchoolPrompts from "./SchoolPrompts";
import EvaluatorPrompts from "./EvaluatorPrompts";

const PromptTypeConfig = ({promptType}) => {

  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);

  let promptTier = UserPromptTier.UNDEFINED;
  if (activeWorkAreaContext.isDistrictAdmin) promptTier = UserPromptTier.DISTRICT_ADMIN;
  else if (activeWorkAreaContext.isSchoolAdmin) promptTier = UserPromptTier.SCHOOL_ADMIN;
  else promptTier = UserPromptTier.EVALUATOR;

  return (
    <>
      <PageSectionHeader title={`${promptType.name} Prompts`}>    
        {promptTier===UserPromptTier.DISTRICT_ADMIN &&
          <DistrictPrompts 
          frameworkContextId={activeWorkAreaContext.frameworkContextId} 
          promptType={promptType} />
        } 
        {promptTier===UserPromptTier.SCHOOL_ADMIN &&
          <SchoolPrompts 
          frameworkContextId={activeWorkAreaContext.frameworkContextId} 
          schoolCode={activeWorkAreaContext.schoolCode}
          promptType={promptType} />
        } 
        {promptTier===UserPromptTier.EVALUATOR &&
          <EvaluatorPrompts 
          frameworkContextId={activeWorkAreaContext.frameworkContextId} 
          schoolCode={activeWorkAreaContext.schoolCode}
          promptType={promptType} />
        }           
      </PageSectionHeader>
    </>
  )
}

export default PromptTypeConfig;