import { useState } from 'react';

import { PageSectionHeader } from "@components";

import { 
  Typography
} from "@mui/material";


const PromptTypeConfig = ({promptType}) => {
  
  return (
    <>
      <PageSectionHeader title={`${promptType.name} Prompts`}>
        
      </PageSectionHeader>
    </>
  )
}

export default PromptTypeConfig;