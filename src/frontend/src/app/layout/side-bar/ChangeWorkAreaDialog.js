import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
} from '../../store/stateEval/userContextSlice';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Link,
  MenuItem,
  TextField,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';

const ChangeWorkAreaDialog = () => {
  const theme = useTheme();

  const [dlgOpen, setDlgOpen] = useState(false);

  const dispatch = useDispatch();
  const workAreaContexts = useSelector(selectWorkAreaContextsAll);
  const [districts, setDistricts] = useState([]);
  const [schools, setSchools] = useState([]);
  const [selectedDistrictCode, setSelectedDistrictCode] = useState('');
  const [selectedSchoolCode, setSelectedSchoolCode] = useState('');
  const [filteredWorkAreaContexts, setFilteredWorkAreaContexts] = useState([]);
  const [selectedWorkAreaContextId, setSelectedWorkAreaContextId] = useState('');

  useEffect(() => {
    const changeSchool = () => {
      const finalWorkAreas = workAreaContexts.filter(
        (x) => x.districtCode === selectedDistrictCode && x.schoolCode === selectedSchoolCode
      );
      setFilteredWorkAreaContexts(finalWorkAreas);
      setSelectedWorkAreaContextId(finalWorkAreas[0].id);
    };

    if (selectedSchoolCode !== '') changeSchool();
  }, [workAreaContexts, selectedDistrictCode, selectedSchoolCode]);

  useEffect(() => {
    const changeDistrict = () => {
      const distinctSchools = [];
      for (let i = 0; i < workAreaContexts.length; ++i) {
        const workAreaContext = workAreaContexts[i];
        if (
          workAreaContext.districtCode === selectedDistrictCode &&
          !distinctSchools.find((x) => x.schoolCode === workAreaContext.schoolCode)
        ) {
          distinctSchools.push({
            districtCode: workAreaContext.districtCode,
            schoolCode: workAreaContext.schoolCode,
            schoolName: workAreaContext.schoolName ? workAreaContext.schoolName : 'District Wide',
          });
        }
      }
      setSchools(distinctSchools);
      setSelectedSchoolCode(distinctSchools[0].schoolCode);
    };
    if (selectedDistrictCode !== '') changeDistrict();
  }, [workAreaContexts, selectedDistrictCode]);

  useEffect(() => {
    const initDistricts = () => {
      const distinctDistricts = [];
      for (let i = 0; i < workAreaContexts.length; ++i) {
        const workAreaContext = workAreaContexts[i];
        if (!distinctDistricts.find((x) => x.districtCode === workAreaContext.districtCode)) {
          distinctDistricts.push({
            districtCode: workAreaContext.districtCode,
            districtName: workAreaContext.districtName,
          });
        }
      }

      setDistricts(distinctDistricts);
      const { districtCode } = distinctDistricts[0];
      setSelectedDistrictCode(districtCode);
    };
    if (workAreaContexts.length > 0) initDistricts();
  }, [workAreaContexts]);

  const handleClickDlgOpen = () => {
    setDlgOpen(true);
  };

  const handleClickChangeWorkArea = async () => {
    const workArea = workAreaContexts.find((x) => x.id === selectedWorkAreaContextId);
    await dispatch(setActiveWorkAreaContext(workArea));
    setDlgOpen(false);
  };

  const handleClickDlgCancel = () => {
    setDlgOpen(false);
  };

  const styles = {
    optionsLink: {
      color: '#dfe4ed',
      textAlign: 'right',
      textDecoration: 'underline',
      paddingRight:'5px',
      fontSize: '.813rem'

    }
  }
  const StyledDialog = styled(Dialog)`
  // .MuiDialog-paper {
  //   background-color: ${theme.palette.primary.main};
  // }
`;
  return (
    <>
      <Link component="button" sx={{...styles.optionsLink, mt:1}} onClick={handleClickDlgOpen}>Options</Link>
      <StyledDialog open={dlgOpen} onClose={handleClickDlgCancel}>
        <DialogTitle>Select a Work Area</DialogTitle>
        <DialogContent>
          <DialogContentText>
            District
          </DialogContentText>
          <FormControl variant="filled">
            <TextField
              size="small"
              sx={{ 
                width: 200, 
              }}
              select
              value={selectedDistrictCode}
              onChange={(e) => {
                setSelectedDistrictCode(e.target.value);
              }}
            >
              {districts.map((x) => (
                <MenuItem key={x.districtCode} value={x.districtCode}>
                  {x.districtName}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <DialogContentText>
            School
          </DialogContentText>
          <FormControl variant="filled">
            <TextField
                size="small"
                sx={{ 
                  width: 200, 
                }}
                select
                value={selectedSchoolCode}
                onChange={(e) => {
                  setSelectedSchoolCode(e.target.value);
                }}
              >
                {schools.map((x) => (
                  <MenuItem key={x.schoolCode} value={x.schoolCode}>
                    {x.schoolName}
                  </MenuItem>
                ))}
              </TextField>
          </FormControl>
          <DialogContentText>Work Area</DialogContentText>
          <FormControl variant="filled">
            <TextField
                size="small"
                sx={{ 
                  width: 200, 
                }}
                select
                value={selectedWorkAreaContextId}
                onChange={(e) => {
                  setSelectedWorkAreaContextId(parseInt(e.target.value, 10));
                }}
              >
                {filteredWorkAreaContexts.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.title}
                </MenuItem>
              ))}
              </TextField>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDlgCancel}>Cancel</Button>
          <Button onClick={handleClickChangeWorkArea}>OK</Button>
        </DialogActions>
      </StyledDialog>
      </>
  );
};

export default ChangeWorkAreaDialog;