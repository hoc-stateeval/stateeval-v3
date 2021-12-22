import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
  selectActiveWorkAreaContext,
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

const ChangeWorkAreaDialog = () => {

  const [dlgOpen, setDlgOpen] = useState(false);

  const dispatch = useDispatch();
  const workAreaContexts = useSelector(selectWorkAreaContextsAll);
  const activeWorkAreaContext = useSelector(selectActiveWorkAreaContext);
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
      setSelectedWorkAreaContextId(activeWorkAreaContext.id);
    };

    changeSchool();
  }, [workAreaContexts, selectedDistrictCode, selectedSchoolCode, activeWorkAreaContext.id]);

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
      setSelectedSchoolCode(activeWorkAreaContext.schoolCode);
    };
    if (selectedDistrictCode !== '') changeDistrict();
  }, [workAreaContexts, selectedDistrictCode, activeWorkAreaContext.schoolCode]);

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
      setSelectedDistrictCode(activeWorkAreaContext.districtCode);
    };
    if (workAreaContexts.length > 0) initDistricts();
  }, [workAreaContexts, activeWorkAreaContext.districtCode]);

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

  return (
    <>
      <Link component="button" 
        sx={{
          color: theme => theme.palette.neutral[400],
          textAlign: 'right',
          textDecoration: 'none',
          paddingRight:'5px',
          fontSize: '.813rem', 
          textTransform: 'uppercase',
          mt:1
        }} 
        onClick={handleClickDlgOpen}>Change</Link>
      <Dialog open={dlgOpen} onClose={handleClickDlgCancel}>
        <DialogTitle>Select a Work Area</DialogTitle>
        <DialogContent>
          <Box sx={{mt: 3, mb:3}}>
            <TextField label="District" sx={{minWidth:'200px'}}
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
          </Box>
          {selectedSchoolCode && <Box sx={{mb:3}}>
            <TextField label="School"  sx={{minWidth:'200px'}}
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
          </Box>}
          <Box sx={{mb:3}}>
            <TextField label="Work Area"  sx={{minWidth:'200px'}}
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
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDlgCancel}>Cancel</Button>
          <Button onClick={handleClickChangeWorkArea}>OK</Button>
        </DialogActions>
      </Dialog>
      </>
  );
};

export default ChangeWorkAreaDialog;