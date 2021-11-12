import { createSlice } from '@reduxjs/toolkit';
import jwtService from 'app/services/jwtService';
import { setCurrentUser } from '../../store/stateEval/userContextSlice';

export const submitLocalLogin =
  ({ userName, password = 'password' }) =>
  async (dispatch) => {
    return jwtService
      .signInWithUsernameAndPassword(userName, password)
      .then((user) => {
        dispatch(setCurrentUser(user));

        return dispatch(loginSuccess());
      })
      .catch((errors) => {
        return dispatch(loginError(errors));
      });
  };

const initialState = {
  success: false,
  errors: [],
};

const loginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.success = true;
      state.errors = [];
    },
    loginError: (state, action) => {
      state.success = false;
      state.errors = action.payload;
    },
  },
  extraReducers: {},
});

export const { loginSuccess, loginError } = loginSlice.actions;

export default loginSlice.reducer;
