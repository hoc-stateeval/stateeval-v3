import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { get, post } from '../../core/api';
import ThunkState from '../../core/thunkState';
import { convertArrayToHashMap } from '../../core/utils';
import { clearState } from '../../core/persist';

const getFramework = async (frameworkId) => {
  const response = await get(`frameworks/${frameworkId}`);
  const data = await response.data;
  return data;
};

const getWorkAreaContextsForUser = async (userId) => {
  const response = await get(`workarea-contexts/user/${userId}`);
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

  const newState = {
    currentUser: state.currentUser,
    ids: {
      ...state.ids,
      activeWorkAreaContextId: workAreaContext.id,
      activeFrameworkId: workAreaContext.defaultFrameworkId,
      stateFrameworkId: workAreaContext.stateFrameworkId,
      instructionalFrameworkId: workAreaContext.instructionalFrameworkId,
      activeEvaluationId: '0',
      activeDistrictViewerSchoolCode: '0',
      activeDistrictViewerEvaluatorId: '0',
    },
    entities: {
      ...state.entities,
      frameworks: frameworksHashMap,
      activeEvaluation: null,
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
    const newState = await createWorkAreaContextState(state, workAreaContext);
    return newState;
  }
);

// const getEvaluatorsForDistrictViewerWorkArea = async (state) => {
//   else if (workAreaContext.tagName === WorkAreas.DV_DTE) {
//     url = `${urlRoot}/usersinrole/${RoleType.DTE}`
//   }
//   else if (workAreaContext.tagName === WorkAreas.DV_DE) {
//     url = `${urlRoot}/usersinrole/${RoleType.DE_PR}`
//   }

//   const response = await get(url);
//   return response.data;
// }

// TODO: 
// save out access token,
// add to header 
// expire, and check with each api call

export const submitLocalLogin =
  ({ userName, password = 'password' }) =>
  async (dispatch) => {
    const response = await post('auth', {
        grant_type: 'password',
        userName,
        password,
        client_id: 'ngSEAuthApp',
    });

    const data = await response.data;
    // const accessToken = data.access_token;
    return dispatch(setCurrentUser(data.user));

  };

  export const logout = createAsyncThunk(
    'userContext/logout',
    async (user, { dispatch, getState }) => {
      clearState();
      return initialState;
    }
  );

export const setCurrentUser = createAsyncThunk(
  'userContext/setCurrentUser',
  async (user, { dispatch, getState }) => {
    const workAreaContexts = await getWorkAreaContextsForUser(user.id);
    const defaultWorkAreaContext = workAreaContexts[0];

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
  pageTitle: '',
  ids: {
    activeWorkAreaContextId: null,
    activeFrameworkId: null,
    stateFrameworkId: null,
    instructionalFrameworkId: null,
    // these need to be zero for select element defaults
    activeEvaluationId: '0',
    activeDistrictViewerSchoolCode: '0',
    activeDistrictViewerEvaluatorId: '0'
  },
  entities: {
    workAreaContexts: {},
    frameworks: {},
    activeEvaluation: null,
  },
  thunkState: ThunkState.INIT,
  errorMessage: '',
};

const userContextSlice = createSlice({
  name: 'userContext',
  initialState,
  reducers: {
    setPageTitle: (state, action) => {
      return {
        ...state,
        pageTitle: action.payload,
      }
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
    setActiveEvaluation: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeEvaluationId: action.payload.id,
        },
        entities: {
          ...state.entities,
          activeEvaluation: action.payload
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
  },
  extraReducers: {
    [logout.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [logout.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [logout.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),

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

const getCurrentUser = (state) => {
  const { currentUser } = state.stateEval.userContext;
  return currentUser;
}

export const selectCurrentUser = createSelector([getCurrentUser], (user) => {
  return user;
});

const getWorkAreaContextsAll = (state) => {
  const { workAreaContexts } = state.stateEval.userContext.entities;
  return Object.entries(workAreaContexts).map((x) => x[1]);
};

const getActiveWorkAreaContext = (state) => {
  const { activeWorkAreaContextId } = state.stateEval.userContext.ids;
  const { workAreaContexts } = state.stateEval.userContext.entities;
  return workAreaContexts[activeWorkAreaContextId];
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

export const selectWorkAreaContextsAll = createSelector(
  [getWorkAreaContextsAll],
  (workAreaContexts) => {
    return workAreaContexts;
  }
);

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

export const selectActiveFrameworkId = createSelector(
  [getActiveFramework], (framework) => {
  return framework?.id;
});

export const selectActiveFramework = createSelector(
  [getActiveFramework], (framework) => {
  return framework;
});

export const selectStateFramework = createSelector(
  [getStateFramework], (framework) => {
  return framework;
});

export const selectInstructionalFramework = createSelector(
  [getInstructionalFramework],
  (framework) => {
    return framework;
  }
);

const getPageTitle = (state) => {
  const { pageTitle } = state.stateEval.userContext;
  return pageTitle;
};

export const selectPageTitle = createSelector(
  [getPageTitle], (title) => {
  return title;
});

const getActiveEvaluation = (state) => {
  const { activeEvaluation } = state.stateEval.userContext.entities;
  return activeEvaluation;
};

export const selectActiveEvaluation = createSelector(
  [getActiveEvaluation], (evaluation) => {
  return evaluation;
});
const getActiveEvaluationId = (state) => {
  const { activeEvaluationId } = state.stateEval.userContext.ids;
  return activeEvaluationId;
};

export const selectActiveEvaluationId = createSelector(
  [getActiveEvaluationId], (id) => {
  return id;
});

const getActiveDistrictViewerSchoolCode = (state) => {
  const { activeDistrictViewerSchoolCode } = state.stateEval.userContext.ids;
  return activeDistrictViewerSchoolCode;
};

export const selectActiveDistrictViewerSchoolCode = createSelector(
  [getActiveDistrictViewerSchoolCode], (schoolCode) => {
  return schoolCode;
});

const getActiveDistrictViewerEvaluatorId = (state) => {
  const { activeDistrictViewerEvaluatorId } = state.stateEval.userContext.ids;
  return activeDistrictViewerEvaluatorId;
};

export const selectActiveDistrictViewerEvaluatorId = createSelector(
  [getActiveDistrictViewerEvaluatorId], (id) => {
  return id;
});

export const { 
  setActiveFrameworkId, 
  setActiveEvaluation,
  setActiveDistrictViewerSchoolCode,
  setActiveDistrictViewerEvaluatorId,
  setPageTitle,
} = userContextSlice.actions;

export default userContextSlice.reducer;
