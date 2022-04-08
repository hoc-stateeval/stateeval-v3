import { useState } from 'react';

import {
  Button,
  Paper,
  Stack,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@mui/material";

import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material";

import { PageSectionHeader } from "@components";
import EditPromptDialog from './EditPromptDialog';

const PromptGrid = ({prompts, promptType, createPromptFcn, updatePromptFcn}) => {


  const [activePrompt, setActivePrompt] = useState(null);
  const [editPromptDlgOpen, setEditPromptDlgOpen] = useState(false);
  const [editMode, setEditMode] = useState('');

  const onClickAddPrompt = () => {
    setEditMode('add');
    setActivePrompt({
      id:0,
      prompt: '',
      promptType: promptType.value,
      required: false
    });
    setEditPromptDlgOpen(true); 
  }

  const onClickEditPrompt = (prompt) => {
    setEditMode('edit');
    setActivePrompt(prompt);
    setEditPromptDlgOpen(true); 
  }

  return (
    <>
    <EditPromptDialog 
      open={editPromptDlgOpen} 
      setOpen={setEditPromptDlgOpen}
      prompt={activePrompt}
      setPrompt={setActivePrompt}
      editMode={editMode}
      createPromptFcn={createPromptFcn}
      updatePromptFcn={updatePromptFcn}
    />

    <PageSectionHeader title={`${promptType.name} Prompts`}>    
      <Stack direction="column" spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "flex-end" }} spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<AddCircleOutlineIcon />}
            onClick={()=> { onClickAddPrompt(); }}
          >
            Add Prompt
          </Button>
        </Stack>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Prompt</TableCell>
                <TableCell align="center">Defined-By</TableCell>
                <TableCell align="center">Required-By</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prompts &&
                prompts.map((prompt, i) => (
                    <TableRow key={i}>
                      <TableCell align="center">
                        {prompt.prompt}
                      </TableCell>
                      <TableCell align="center">
                        {prompt.ownerTierDisplayName}
                      </TableCell>
                      <TableCell align="center">
                        {prompt.requiredByTierDisplayName}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={()=>{onClickEditPrompt(prompt);}}>Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </PageSectionHeader>
    </>
  )
}

export default PromptGrid;