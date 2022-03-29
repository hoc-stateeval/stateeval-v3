import { useState } from 'react';

import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
  PageSectionHeader,
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

const PromptGrid = ({prompts, promptType, createPromptFcn, updatePromptFcn}) => {

  const [activePrompt, setActivePrompt] = useState(null);
  const [editPromptDlgOpen, setEditPromptDlgOpen] = useState(false);
  const [editMode, setEditMode] = useState('');

  const onClickAddPrompt = () => {
    setEditMode('add');
    setActivePrompt({
      id:0,
      prompt: '',
      required: false
    });
    setEditPromptDlgOpen(true); 
  }

  return (
    <>
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
          <Dialog open={editPromptDlgOpen} onClose={()=> {setEditPromptDlgOpen(false)}}>
            <DialogTitle>{editMode==='edit'?'Edit':'New'} Prompt</DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormGroup>
                  <FormControlLabel
                        control={
                          <Checkbox 
                            color="secondary" 
                            checked={activePrompt.required} 
                            name="required"
                            onChange={()=>{setActivePrompt({
                              ...activePrompt, 
                              required:!activePrompt.required
                            })}} />
                        }
                        label="Required"
                      />
                    <TextField
                      name="prompt"
                      label="Prompt"
                      value={activePrompt.prompt}
                      onChange={({target})=>{
                        setActivePrompt({
                          ...activePrompt,
                          prompt: target.value
                        })
                      }}
                    ></TextField>
                  </FormGroup>
                </Grid>

              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined"  onClick={()=> {setEditPromptDlgOpen(false)}}>Cancel</Button>
              <Button variant="contained" onClick={onClickSavePrompt}>Save</Button>
            </DialogActions>
          </Dialog>
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
                        <Button onClick={()=>{updatePromptFcn(prompt);}}>Edit</Button>
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