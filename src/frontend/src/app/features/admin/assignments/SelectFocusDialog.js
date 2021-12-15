import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectStateFramework,
} from '../../store/stateEval/userContextSlice';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  MenuItem,
  TextField,
} from '@mui/material';

const SelectFocusDialog = () => {

  const stateFramework = useSelector(selectStateFramework);

  const [dlgOpen, setDlgOpen] = useState(false);
  const [selectedFocusFrameworkNodeId, setSelectedFocusFrameworkNodeId] = useState(null);
  const [selectedFocusSGFrameworkNodeId, setSelectedSGFrameworkNodeId] = useState(null);
  const [showStudentGrowthSelect, setShowStudentGrowthSelect] = useState(false);

  const dispatch = useDispatch();

  const handleClickDlgOpen = () => {
    setDlgOpen(true);
  };

  const handleClickDlgCancel = () => {
    setDlgOpen(false);
  };

  const handleClickDlgOk = () => {

    setDlgOpen(false);
  };

  const handleSelectFocusFrameworkNode = (id) => {
    const node = stateFramework.frameworkNode.find(x=>x.id === id);
    setShowStudentGrowthSelect(!node.isStudentGrowthAligned);
    setSelectedFocusFrameworkNodeId(id);
  }

  const styles = {
    optionsLink: {
      color: '#dfe4ed',
      textAlign: 'right',
      textDecoration: 'underline',
      paddingRight:'5px',
      fontSize: '.813rem'

    }
  }

  return (
    <>
      <Link component="button" sx={{...styles.optionsLink, mt:1}} onClick={handleClickDlgOpen}>Options</Link>
      <Dialog open={dlgOpen} onClose={handleClickDlgCancel}>
        <DialogTitle>Setup Focused Evaluation</DialogTitle>
        <DialogContent>
          <Box sx={{mt: 3, mb:3}}>
            <TextField label="Focus Criteria" sx={{minWidth:'200px'}}
                select
                value={selectedFocusFrameworkNodeId}
                onChange={(e) => {
                  handleSelectFocusFrameworkNode(parseInt(e.target.value));
                }}
              >
                <MenuItem value="">Select a Focus Criteria</MenuItem>
                {stateFramework.frameworkNodes.map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.shortName}
                  </MenuItem>
                ))}
              </TextField>
          </Box>
         
          {showStudentGrowthSelect && 
          <Box sx={{mb:3}}>
            <TextField label="Student Growth Criteria" sx={{minWidth:'200px'}}
                select
                value={selectedFocusSGFrameworkNodeId}
                onChange={(e) => {
                  setSelectedSGFrameworkNodeId(parseInt(e.target.value));
                }}
              >
                <MenuItem value="">Select a Student Growth Criteria</MenuItem>
                {stateFramework.frameworkNodes.filter(x=>x.isStudentGrowthAligned).map((x) => (
                  <MenuItem key={x.id} value={x.id}>
                    {x.shortName}
                  </MenuItem>
                ))}
              </TextField>
          </Box>}

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDlgCancel}>Cancel</Button>
          <Button onClick={handleClickDlgOk}>OK</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default SelectFocusDialog;