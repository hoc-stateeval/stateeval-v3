import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';

const ChangeWorkAreaDialog = () => {
  const [dlgOpen, setDlgOpen] = useState(false);

  const handleClickDlgOpen = () => {
    setDlgOpen(true);
  };

  const handleClickDlgOk = () => {
    setDlgOpen(false);
  };

  const handleClickDlgCancel = () => {
    setDlgOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickDlgOpen}>
        Options
      </Button>
      <Dialog open={dlgOpen} onClose={handleClickDlgCancel}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Here are the instructions
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDlgCancel}>Cancel</Button>
          <Button onClick={handleClickDlgOk}>OK</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default ChangeWorkAreaDialog;