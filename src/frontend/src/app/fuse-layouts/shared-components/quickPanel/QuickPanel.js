import FuseScrollbars from '@fuse/core/FuseScrollbars';
import { styled } from '@mui/material/styles';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import withReducer from 'app/store/withReducer';
import { memo, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import reducer from './store';
import { toggleQuickPanel } from './store/stateSlice';
import {
  selectWorkAreaContextsAll,
  setActiveWorkAreaContext,
} from '../../../store/stateEval/userContextSlice';

const StyledSwipeableDrawer = styled(SwipeableDrawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: 280,
  },
}));

function QuickPanel(props) {

  const dispatch = useDispatch();
  const state = useSelector(({ quickPanel }) => quickPanel.state);
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

  return (
    <StyledSwipeableDrawer
      open={state}
      anchor="right"
      onOpen={(ev) => {}}
      onClose={(ev) => dispatch(toggleQuickPanel())}
      disableSwipeToOpen
    >
      <FuseScrollbars>
        <h1>Select a WorkArea</h1>
        <div className="mb-28">
          <Typography className="text-18 font-semibold">District</Typography>
          <FormControl className="" variant="filled">
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
        </div>

        <div className="mb-28">
        <Typography className="text-18 font-semibold">School</Typography>
          <FormControl className="" variant="filled">
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
        </div>

        <div className="mb-28">
        <Typography className="text-18 font-semibold">Work Area</Typography>
          <FormControl className="" variant="filled">
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
          <Button
            variant="contained"
            color="primary"
            className="w-full mx-auto mt-16"
            aria-label="Change Work Area"
            value="legacy"
            onClick={onClickChangeWorkArea}
          >
            Change Work Area
          </Button>
        </div>
      </FuseScrollbars>
    </StyledSwipeableDrawer>
  );
}

export default withReducer('quickPanel', reducer)(memo(QuickPanel));
