import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { get, post } from '../../core/api';
import ThunkState from '../../core/thunkState';
import { convertArrayToHashMap } from '../../core/utils';
import { clearState } from '../../core/persist';
import { 
  WorkAreas,
  EvaluatorWorkAreas,
  DistrictViewerSchoolWorkAreas 
} from '../../core/workAreas';
import { RoleType } from '../../core/roleType';

const getEvaluationsForWorkAreaContext = async (workAreaContext) => {
  const response = await get(
    `users/${workAreaContext.userId}/workarea-contexts/${workAreaContext.id}/evaluations`
  );
  const data = await response.data;
  return data;
};

const getFramework = async (frameworkId) => {
  const response = await get(`frameworks/${frameworkId}`);
  const data = await response.data;
  return data;
};

const getWorkAreaContextsForUser = async (userId) => {
  const response = await get(`users/${userId}/workarea-contexts/`);
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

  let evaluations = [];
  let activeEvaluationId = null;
  if (EvaluatorWorkAreas.includes(workAreaContext.tagName)) {
    evaluations = await getEvaluationsForWorkAreaContext(workAreaContext);
    activeEvaluationId = workAreaContext.isEvaluatee ? evaluations[0].id : null;
  }

  let districtViewerSchools = [];
  if (DistrictViewerSchoolWorkAreas.includes(workAreaContext.tagName)) {
    const response = await get(`districts/${workAreaContext.districtCode}/schools`);
    districtViewerSchools = await response.data;
  }

  const newState = {
    currentUser: state.currentUser,
    ids: {
      activeWorkAreaContextId: workAreaContext.id,
      activeFrameworkId: workAreaContext.defaultFrameworkId,
      stateFrameworkId: workAreaContext.stateFrameworkId,
      instructionalFrameworkId: workAreaContext.instructionalFrameworkId,
      activeEvaluationId,
      activeDistrictViewerSchoolCode:null,
      activeDistrictViewerEvaluatorId:null,
    },
    entities: {
      ...state.entities,
      evaluations: convertArrayToHashMap(evaluations),
      frameworks: frameworksHashMap,
      districtViewerSchools: convertArrayToHashMap(districtViewerSchools, 'schoolCode'),
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

export const setActiveDistrictViewerSchool = createAsyncThunk(
  'userContext/setActiveDistrictViewerSchool',
  async (schoolCode, { dispatch, getState }) => {
    const workAreaContext = getActiveWorkAreaContext(getState());

    const urlRoot = `districts/${workAreaContext.districtCode}/usersinrole/${schoolCode}`;
    let url = "";
    if (workAreaContext.tagName === WorkAreas.DV_PR_TR) {
      url = `${urlRoot}/${RoleType.PR}`
    }
    else if (workAreaContext.tagName === WorkAreas.DV_PR_PR) {
      url = `${urlRoot}/${RoleType.HEAD_PR}`
    }
  
    const response = await get(url);
    const evaluators = response.data;

    const { userContext: state } = getState().stateEval;
    let newState = {
      ...state,
      ids: {
        ...state.ids,
        activeDistrictViewerSchoolCode: schoolCode,
        activeDistrictViewerEvaluatorId: null,
      },
      entities: {
        ...state.entities,
        districtViewerEvaluators: convertArrayToHashMap(evaluators),
      },
    };
    return newState;
  }
);

export const setActiveDistrictViewerEvaluator = createAsyncThunk(
  'userContext/setActiveDistrictViewerEvaluator',
  async (evaluatorId, { dispatch, getState }) => {
    const workAreaContext = getActiveWorkAreaContext(getState());
    const school = getActiveDistrictViewerSchool(getState());
    const schoolCode = school.schoolCode;

    const url = `evaluations/${workAreaContext.districtCode}/${schoolCode}/${workAreaContext.evaluationType}/${evaluatorId}`;
    const response = await get(url);
    const evaluations = response.data;

    const { userContext: state } = getState().stateEval;

    let newState = {
      ...state,
      ids: {
        ...state.ids,
        activeDistrictViewerEvaluatorId: evaluatorId,
      },
      entities: {
        ...state.entities,
        evaluations: convertArrayToHashMap(evaluations),
      },
    };
    return newState;
  }
);

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
  impersonating: false,
  ids: {
    activeWorkAreaContextId: null,
    activeFrameworkId: null,
    stateFrameworkId: null,
    instructionalFrameworkId: null,
    activeEvaluationId: null,
    activeDistrictViewerSchoolCode: null,
    activeDistrictViewerEvaluatorId: null
  },
  entities: {
    workAreaContexts: {},
    frameworks: {},
    evaluations: {},
    districtViewerSchools: {},
    districtViewerEvaluators: {}
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
    setActiveEvaluationId: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeEvaluationId: action.payload,
        },
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
    [setActiveDistrictViewerSchool.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [setActiveDistrictViewerSchool.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [setActiveDistrictViewerSchool.rejected]: (state, action) => ({
      ...state,
      thunkState: ThunkState.FAILED,
      errorMessage: action.payload,
    }),
    [setActiveDistrictViewerEvaluator.pending]: (state, action) => ({
      ...state,
      thunkState: ThunkState.RUNNING,
    }),
    [setActiveDistrictViewerEvaluator.fulfilled]: (state, action) => ({
      ...action.payload,
      thunkState: ThunkState.COMPLETE,
    }),
    [setActiveDistrictViewerEvaluator.rejected]: (state, action) => ({
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

const getEvaluationsAll = (state) => {
  const { evaluations } = state.stateEval.userContext.entities;
  return Object.entries(evaluations).map((x) => x[1]);
};

const getDistrictViewerSchoolsAll = (state) => {
  const { districtViewerSchools } = state.stateEval.userContext.entities;
  return Object.entries(districtViewerSchools).map((x) => x[1]);
};

const getDistrictViewerEvaluatorsAll = (state) => {
  const { districtViewerEvaluators } = state.stateEval.userContext.entities;
  return Object.entries(districtViewerEvaluators).map((x) => x[1]);
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

const getActiveDistrictViewerSchool = (state) => {
  const { activeDistrictViewerSchoolCode } = state.stateEval.userContext.ids;
  const { districtViewerSchools } = state.stateEval.userContext.entities;
  return districtViewerSchools[activeDistrictViewerSchoolCode];
};

const getActiveDistrictViewerEvaluator = (state) => {
  const { activeDistrictViewerEvaluatorId } = state.stateEval.userContext.ids;
  const { districtViewerEvaluators } = state.stateEval.userContext.entities;
  return districtViewerEvaluators[activeDistrictViewerEvaluatorId];
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

export const selectEvaluationsAll = createSelector(
  [getEvaluationsAll], (evaluations) => {
  return evaluations;
});

export const selectWorkAreaContextsAll = createSelector(
  [getWorkAreaContextsAll],
  (workAreaContexts) => {
    return workAreaContexts;
  }
);

export const selectDistrictViewerSchoolsAll = createSelector(
  [getDistrictViewerSchoolsAll], (schools) => {
  return schools;
});

export const selectDistrictViewerEvaluatorsAll = createSelector(
  [getDistrictViewerEvaluatorsAll], (evaluators) => {
  return evaluators;
});

export const selectActiveDistrictViewerSchool = createSelector(
  [getActiveDistrictViewerSchool], (school) => {
  return school;
});

export const selectActiveDistrictViewerEvaluator = createSelector(
  [getActiveDistrictViewerEvaluator], (evaluator) => {
  return evaluator;
});

export const selectActiveEvaluation = createSelector(
  [getActiveEvaluation], (evaluation) => {
  return evaluation;
});

export const selectActiveEvaluationId = createSelector(
  [getActiveEvaluation], (evaluation) => {
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

const getImpersonating = (state) => {
  const { impersonating } = state.stateEval.userContext;
  return impersonating;
};

export const selectImpersonating = createSelector(
  [getImpersonating], (impersonating) => {
  return impersonating;
});

const getPageTitle = (state) => {
  const { pageTitle } = state.stateEval.userContext;
  return pageTitle;
};

export const selectPageTitle = createSelector(
  [getPageTitle], (title) => {
  return title;
});

export const { 
  setActiveFrameworkId, 
  setActiveEvaluationId,
  setActiveDistrictViewerSchoolCode,
  setActiveDistrictViewerEvaluatorId,
  setPageTitle,
} = userContextSlice.actions;

export default userContextSlice.reducer;
