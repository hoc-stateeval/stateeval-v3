import { createSlice, createSelector } from '@reduxjs/toolkit';
import {
  EvaluateeWorkAreas,
} from "@lib/eval-helpers";

const initialState = {
  currentUser: null,
  activeWorkAreaContext: null,
  pageTitle: '',
  ids: {
    activeFrameworkId: null,
    // these need to be zero for select element defaults
    activeEvaluationId: '0',
    activeDistrictViewerSchoolCode: '0',
    activeDistrictViewerEvaluatorId: '0',
  }
};

const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    logout: (state) => {
      // handled by the root reducer
    },
    setPageTitle: (state, action) => {
      return {
        ...state,
        pageTitle: action.payload,
      }
    },
    setCurrentUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload
      };
    },
    setActiveWorkAreaContext: (state, action) => {
      const activeWorkAreaContext = action.payload;
      const isEvaluateeWorkArea = EvaluateeWorkAreas.includes(activeWorkAreaContext.tagName);
      return {
        ...state,
        activeWorkAreaContext: activeWorkAreaContext,
        ids: {
          ...state.ids,
          activeFrameworkId: activeWorkAreaContext.defaultFrameworkId,
          activeEvaluationId: isEvaluateeWorkArea? activeWorkAreaContext.evaluateeEvaluationId:'0'
        }
      };
    },
    setActiveFrameworkId: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeFrameworkId: action.payload,
        },
      };
    },
    setActiveEvaluationId: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeEvaluationId: action.payload
        }
      };
    },
    setActiveDistrictViewerSchoolCode: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeDistrictViewerSchoolCode: action.payload,
        },
      };
    },
    setActiveDistrictViewerEvaluatorId: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeDistrictViewerEvaluatorId: action.payload,
        },
      };
    },
  }
});

const getIds = (state) => (state.stateEval.userContext.ids);

export const selectCurrentUser = createSelector(
  [(state) => {
    const { currentUser } = state.stateEval.userContext;
    return currentUser;
  }], (user) => {
  return user;
});

export const selectActiveWorkAreaContext = createSelector(
  [(state) => {
    const { activeWorkAreaContext } = state.stateEval.userContext;
    return activeWorkAreaContext;
  }], (activeWorkAreaContext) => {
  return activeWorkAreaContext;
});

export const selectActiveFrameworkId = createSelector(
  [(state) => {
    const { activeFrameworkId } = getIds(state);
    return activeFrameworkId;
  }], (id) => {
  return id;
});

export const selectPageTitle = createSelector(
  [(state) => {
    const { pageTitle } = state.stateEval.userContext;
    return pageTitle;
  }], (title) => {
  return title;
});

export const selectActiveEvaluationId = createSelector(
  [(state) => {
    const { activeEvaluationId } = getIds(state);
    return activeEvaluationId;
  }], (id) => {
  return id;
});

export const selectActiveDistrictViewerSchoolCode = createSelector(
  [(state) => {
    const { activeDistrictViewerSchoolCode } = getIds(state);
    return activeDistrictViewerSchoolCode;
  }], (schoolCode) => {
  return schoolCode;
});

export const selectActiveDistrictViewerEvaluatorId = createSelector(
  [(state) => {
    const { activeDistrictViewerEvaluatorId } =  getIds(state);
    return activeDistrictViewerEvaluatorId;
  }], (id) => {
  return id;
});


export const { 
  logout,
  setCurrentUser,
  setActiveWorkAreaContext,
  setActiveFrameworkId, 
  setActiveEvaluationId,
  setActiveDistrictViewerSchoolCode,
  setActiveDistrictViewerEvaluatorId,
  setPageTitle,
} = userContextSlice.actions;

export default userContextSlice.reducer;

