import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import { ThunkState } from '../../main/core/enums';
import { convertArrayToHashMap } from '../../main/core/utils';
import { updateUserRole, setUserData } from '../../auth/store/userSlice';

const getEvaluationsForWorkAreaContext = async (workAreaContext) => {
  const response = await axios.get(
    `/api/users/${workAreaContext.userId}/work-area-contexts/${workAreaContext.id}/evaluations`
  );
  const data = await response.data;
  return data;
};

const getFramework = async (frameworkId) => {
  const response = await axios.get(`/api/frameworks/${frameworkId}`);
  const data = await response.data;
  return data;
};

const getWorkAreaContextsForUser = async (userId) => {
  const response = await axios.get(`/api/users/${userId}/work-area-contexts/`);
  const workAreaContexts = await response.data;
  return workAreaContexts;
};

const createWorkAreaContextState = async (state, workAreaContext) => {
  const promises = [];

  if (!state.entities.frameworks[workAreaContext.stateFrameworkId]) {
    promises.push(getFramework(workAreaContext.stateFrameworkId));
    if (workAreaContext.instructionalFrameworkId) {
      promises.push(getFramework(workAreaContext.instructionalFrameworkId));
    }
  }

  const frameworks = await Promise.all(promises);
  let frameworksHashMap = { ...state.entities.frameworks };
  frameworksHashMap = frameworks.reduce((map, framework) => {
    map[framework.id] = framework;
    return map;
  }, frameworksHashMap);

  const evaluations = await getEvaluationsForWorkAreaContext(workAreaContext);
  const activeEvaluationId = workAreaContext.isEvaluatee ? evaluations[0].id : null;

  const newState = {
    ...state.currentUser,
    ids: {
      activeWorkAreaContextId: workAreaContext.id,
      activeFrameworkId: workAreaContext.defaultFrameworkId,
      stateFrameworkId: workAreaContext.stateFrameworkId,
      instructionalFrameworkId: workAreaContext.instructionalFrameworkId,
      activeEvaluationId,
    },
    entities: {
      ...state.entities,
      evaluations: convertArrayToHashMap(evaluations),
      frameworks: frameworksHashMap,
    },
    thunkState: ThunkState.INIT,
    errorMessage: '',
  };

  return newState;
}

export const setActiveWorkAreaContext = createAsyncThunk(
  'userContext/setActiveWorkAreaContext',
  async (workAreaContext, { dispatch, getState }) => {
    const { userContext: state } = getState().stateEval;
    await dispatch(updateUserRole(workAreaContext.tagName));

    const newState = await createWorkAreaContextState(state, workAreaContext);
    return newState;
  }
);

export const setCurrentUser = createAsyncThunk(
  'userContext/setCurrentUser',
  async (user, { dispatch, getState }) => {
    const workAreaContexts = await getWorkAreaContextsForUser(user.id);
    const defaultWorkAreaContext = workAreaContexts[0];
    await dispatch(
      setUserData({
        role: defaultWorkAreaContext.tagName,
        data: {
          displayName: user.displayName,
          photoURL: user.profileImageURL,
          email: 'useremail@useremail.com',
          settings: {
            layout: {
              style: 'layout1',
            },
          },
        },
      })
    );

    const { userContext: state } = getState().stateEval;

    let newState = {
      ...state,
      currentUser: user,
      entities: {
        ...state.entities,
        workAreaContexts: convertArrayToHashMap(workAreaContexts),
      },
      thunkState: ThunkState.INIT,
      errorMessage: '',
    };

    newState = await createWorkAreaContextState(newState, defaultWorkAreaContext);
    return newState;
  }
);

const initialState = {
  currentUser: null,
  ids: {
    activeWorkAreaContextId: null,
    activeFrameworkId: null,
    stateFrameworkId: null,
    instructionalFrameworkId: null,
    activeEvaluationId: null,
  },
  entities: {
    workAreaContexts: {},
    frameworks: {},
    evaluations: {},
  },
  thunkState: ThunkState.INIT,
  errorMessage: '',
};

const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
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
          activeEvaluationId: action.payload,
        },
      };
    },
  },
  extraReducers: {
    [setCurrentUser.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [setCurrentUser.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [setCurrentUser.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),
    [setActiveWorkAreaContext.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [setActiveWorkAreaContext.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [setActiveWorkAreaContext.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),
  },
});

const getEvaluationsAll = (state) => {
  const { evaluations } = state.stateEval.userContext.entities;
  return Object.entries(evaluations).map((x) => x[1]);
};

const getWorkAreaContextsAll = (state) => {
  const { workAreaContexts } = state.stateEval.userContext.entities;
  return Object.entries(workAreaContexts).map((x) => x[1]);
};

const getActiveWorkAreaContext = (state) => {
  const { activeWorkAreaContextId } = state.stateEval.userContext.ids;
  const { workAreaContexts } = state.stateEval.userContext.entities;
  return workAreaContexts[activeWorkAreaContextId];
};

const getActiveEvaluation = (state) => {
  const { activeEvaluationId } = state.stateEval.userContext.ids;
  const { evaluations } = state.stateEval.userContext.entities;
  return evaluations[activeEvaluationId];
};

const getActiveWorkAreaContextId = (state) => {
  const { activeWorkAreaContextId } = state.stateEval.userContext.ids;
  return activeWorkAreaContextId;
};

const getActiveFramework = (state) => {
  const { activeFrameworkId } = state.stateEval.userContext.ids;
  const { frameworks } = state.stateEval.userContext.entities;
  return frameworks[activeFrameworkId];
};

const getStateFramework = (state) => {
  const { stateFrameworkId } = state.stateEval.userContext.ids;
  const { frameworks } = state.stateEval.userContext.entities;
  return frameworks[stateFrameworkId];
};

const getInstructionalFramework = (state) => {
  const { instructionalFrameworkId } = state.stateEval.userContext.ids;
  const { frameworks } = state.stateEval.userContext.entities;
  return frameworks[instructionalFrameworkId];
};

export const selectEvaluationsAll = createSelector([getEvaluationsAll], (evaluations) => {
  return evaluations;
});

export const selectWorkAreaContextsAll = createSelector(
  [getWorkAreaContextsAll],
  (workAreaContexts) => {
    return workAreaContexts;
  }
);

export const selectActiveEvaluation = createSelector([getActiveEvaluation], (evaluation) => {
  return evaluation;
});

export const selectActiveEvaluationId = createSelector([getActiveEvaluation], (evaluation) => {
  return evaluation?.id;
});

export const selectActiveWorkAreaContext = createSelector(
  [getActiveWorkAreaContext],
  (workAreaContext) => {
    return workAreaContext;
  }
);

export const selectActiveWorkAreaContextId = createSelector(
  [getActiveWorkAreaContextId],
  (workAreaContextId) => {
    return workAreaContextId;
  }
);

export const selectActiveFrameworkId = createSelector([getActiveFramework], (framework) => {
  return framework?.id;
});

export const selectActiveFramework = createSelector([getActiveFramework], (framework) => {
  return framework;
});

export const selectStateFramework = createSelector([getStateFramework], (framework) => {
  return framework;
});

export const selectInstructionalFramework = createSelector(
  [getInstructionalFramework],
  (framework) => {
    return framework;
  }
);

export const { setActiveFrameworkId, setActiveEvaluationId } = userContextSlice.actions;

export default userContextSlice.reducer;
