import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
} from '../store/stateEval/userContextSlice';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const ChangeWorkAreaDialog = () => {
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

  const onClickChangeWorkArea = (e) => {
    const workArea = workAreaContexts.find((x) => x.id === selectedWorkAreaContextId);
    dispatch(setActiveWorkAreaContext(workArea));
  };
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
      <Button variant="outlined" onClick={handleClickDlgOpen}>
        Options
      </Button>
      <Dialog open={dlgOpen} onClose={handleClickDlgCancel}>
        <DialogTitle>Select a Work Area</DialogTitle>
        <DialogContent>
          <DialogContentText>
            District
          </DialogContentText>
          <FormControl variant="filled">
            <Select
              value={selectedDistrictCode}
              onChange={(e) => {
                setSelectedDistrictCode(e.target.value);
              }}
              displayEmpty
              name="district"
              classes={{ select: 'py-8' }}
            >
              {districts.map((x) => (
                <MenuItem key={x.districtCode} value={x.districtCode}>
                  {x.districtName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogContentText>
            School
          </DialogContentText>
          <FormControl variant="filled">
            <Select
              value={selectedSchoolCode}
              onChange={(e) => {
                setSelectedSchoolCode(e.target.value);
              }}
              displayEmpty
              name="school"
              classes={{ select: 'py-8' }}
            >
              {schools.map((x) => (
                <MenuItem key={x.schoolCode} value={x.schoolCode}>
                  {x.schoolName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DialogContentText>Work Area</DialogContentText>
          <FormControl variant="filled">
            <Select
              value={selectedWorkAreaContextId}
              displayEmpty
              name="workArea"
              onChange={(e) => {
                setSelectedWorkAreaContextId(parseInt(e.target.value, 10));
              }}
              classes={{ select: 'py-8' }}
            >
              {filteredWorkAreaContexts.map((x) => (
                <MenuItem key={x.id} value={x.id}>
                  {x.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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