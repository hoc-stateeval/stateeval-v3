
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
} from "@mui/material";

const EditPromptDialog = ({open, setOpen, prompt, setPrompt, editMode, createPromptFcn, updatePromptFcn}) => {

  const onClickSavePrompt = () => {
    if (editMode==='add') {
      createPromptFcn(prompt);
    }
    else {
      updatePromptFcn(prompt);
    }
  }
  
  return (
    <Dialog open={open} onClose={()=> {setOpen(false)}}>
    <DialogTitle>{editMode==='edit'?'Edit':'New'} Prompt</DialogTitle>
    <DialogContent>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormGroup>
          <FormControlLabel
                control={
                  <Checkbox 
                    color="secondary" 
                    checked={prompt.required} 
                    name="required"
                    onChange={()=>{setPrompt({
                      ...prompt, 
                      required:!prompt.required
                    })}} />
                }
                label="Required"
              />
            <TextField
              name="prompt"
              label="Prompt"
              value={prompt.prompt}
              onChange={({target})=>{
                setPrompt({
                  ...prompt,
                  prompt: target.value
                })
              }}
            ></TextField>
          </FormGroup>
        </Grid>

      </Grid>
    </DialogContent>
    <DialogActions>
      <Button variant="outlined"  onClick={()=> {setOpen(false)}}>Cancel</Button>
      <Button variant="contained" onClick={onClickSavePrompt}>Save</Button>
    </DialogActions>
  </Dialog>
  )
}

export default EditPromptDialog;