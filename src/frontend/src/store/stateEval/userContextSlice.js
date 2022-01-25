import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { get } from '@lib/api';
import { ThunkState } from '@lib/enums';
import convertArrayToHashMap from '@lib/convertArrayToHashMap';
import { clearState } from '@lib/persist';

const getFramework = async (frameworkId) => {
  const response = await get(`frameworks/${frameworkId}`);
  const data = await response.data.data;
  return data;
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
    ...state,
    ids: {
      ...state.ids,
      activeWorkAreaContextId: workAreaContext.id,
      activeFrameworkId: workAreaContext.defaultFrameworkId,
      stateFrameworkId: workAreaContext.stateFrameworkId,
      instructionalFrameworkId: workAreaContext.instructionalFrameworkId,
      activeEvaluationId: '0',
      activeDistrictViewerSchoolCode: '0',
      activeDistrictViewerEvaluatorId: '0',
      activeFrameworkNodeId: null,
      activeRubricRowId: null,
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

export const logout = createAsyncThunk(
  'userContext/logout',
  async (user, { dispatch, getState }) => {
    clearState();
    return initialState;
  }
);

export const setCurrentUser = createAsyncThunk(
  'userContext/setCurrentUser',
  async (data, { dispatch, getState }) => {
    const workAreaContexts = data.workAreaContexts;
    const defaultWorkAreaContext = workAreaContexts[0];
   
    const { userContext: state } = getState().stateEval;

    let newState = {
      ...state,
      currentUser: data.user,
      ids: {
        ...state.ids,
        activeWorkAreaContextId: defaultWorkAreaContext.id,
      },
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
  ecViewMode: 'node',
  ids: {
    activeWorkAreaContextId: null,
    activeFrameworkId: null,
    stateFrameworkId: null,
    instructionalFrameworkId: null,
    // these need to be zero for select element defaults
    activeEvaluationId: '0',
    activeDistrictViewerSchoolCode: '0',
    activeDistrictViewerEvaluatorId: '0',
    activeFrameworkNodeId: null,
    activeRubricRowId: null,
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
      const activeFrameworkId = action.payload;
      const { frameworks } = state.entities;
      const activeFramework = frameworks[activeFrameworkId];
      const activeFrameworkNode = activeFramework.frameworkNodes[0];
      const activeRubricRow = activeFrameworkNode.rubricRows[0];
      return {
        ...state,
        ids: {
          ...state.ids,
          activeFrameworkId: activeFrameworkId,
          activeFrameworkNodeId: activeFrameworkNode.id,
          activeRubricRowId: activeRubricRow.id
        },
      };
    },
    setActiveEvaluation: (state, action) => {
      return {
        ...state,
        ids: {
          ...state.ids,
          activeEvaluationId: action.payload?action.payload.id:"0",
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
    setEvidenceCollectionViewMode: (state, action) => {
      return {
        ...state,
        ecViewMode: 'node',
      };
    },
    setActiveFrameworkNodeId: (state, action) => {
      return {
        ...state,
        ecViewMode: 'node',
        ids: {
          ...state.ids,
          activeFrameworkNodeId: action.payload,
          activeRubricRowId: null,
        },
      };
    },
    setActiveRubricRowId: (state, action) => {
      return {
        ...state,
        ecViewMode: 'row',
        ids: {
          ...state.ids,
          activeRubricRowId: action.payload,
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

const getEntities = (state) => (state.stateEval.userContext.entities);
const getIds = (state) => (state.stateEval.userContext.ids);

export const selectCurrentUser = createSelector([getCurrentUser], (user) => {
  return user;
});

const getWorkAreaContextsAll = (state) => {
  const { workAreaContexts } = getEntities(state);
  return Object.entries(workAreaContexts).map((x) => x[1]);
};

const getActiveWorkAreaContext = (state) => {
  const { activeWorkAreaContextId } = getIds(state);
  const { workAreaContexts } = getEntities(state);
  return workAreaContexts[activeWorkAreaContextId];
};

const getActiveWorkAreaContextId = (state) => {
  const { activeWorkAreaContextId } = getIds(state);
  return activeWorkAreaContextId;
};

const getActiveFramework = (state) => {
  const { activeFrameworkId } = getIds(state);
  const { frameworks } = getEntities(state);
  return frameworks[activeFrameworkId];
};

const getStateFramework = (state) => {
  const { stateFrameworkId } = getIds(state);
  const { frameworks } = getEntities(state);
  return frameworks[stateFrameworkId];
};

const getInstructionalFramework = (state) => {
  const { instructionalFrameworkId } = getIds(state);
  const { frameworks } = getEntities(state);
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
  const { activeEvaluation } = getEntities(state);
  return activeEvaluation;
};

export const selectActiveEvaluation = createSelector(
  [getActiveEvaluation], (evaluation) => {
  return evaluation;
});
const getActiveEvaluationId = (state) => {
  const { activeEvaluationId } = getIds(state);
  return activeEvaluationId;
};

export const selectActiveEvaluationId = createSelector(
  [getActiveEvaluationId], (id) => {
  return id;
});

const getActiveDistrictViewerSchoolCode = (state) => {
  const { activeDistrictViewerSchoolCode } = getIds(state);
  return activeDistrictViewerSchoolCode;
};

export const selectActiveDistrictViewerSchoolCode = createSelector(
  [getActiveDistrictViewerSchoolCode], (schoolCode) => {
  return schoolCode;
});

const getActiveDistrictViewerEvaluatorId = (state) => {
  const { activeDistrictViewerEvaluatorId } =  getIds(state);
  return activeDistrictViewerEvaluatorId;
};

export const selectActiveDistrictViewerEvaluatorId = createSelector(
  [getActiveDistrictViewerEvaluatorId], (id) => {
  return id;
});

/*** Rubric Navigator ***/
const getActiveFrameworkNode = (state) => {
  const { activeFrameworkNodeId } = getIds(state);
  if (!activeFrameworkNodeId) return null;
  const { activeFrameworkId } = getIds(state);
  const { frameworks } = getEntities(state);
  const framework = frameworks[activeFrameworkId];
  return framework.frameworkNodes.find(x=>x.id===activeFrameworkNodeId);
};

const getEvidenceCollectionViewMode = (state) => {
  const {ecViewMode } = state.stateEval.userContext;
  return ecViewMode;
}

export const selectEvidenceCollectionViewMode = createSelector(
  [getEvidenceCollectionViewMode], (ecViewMode) => {
    return ecViewMode;
  }
)

export const selectActiveFrameworkNode = createSelector(
  [getActiveFrameworkNode], (frameworkNode) => {
  return frameworkNode;
});

export const selectActiveFrameworkNodeId = createSelector(
  [getActiveFrameworkNode], (frameworkNode) => {
  return frameworkNode?.id;
});

const getActiveRubricRow = (state) => {
  const { activeFrameworkNodeId, activeRubricRowId } = getIds(state);
  if (!activeFrameworkNodeId || !activeRubricRowId) return null;
  const { activeFrameworkId } = getIds(state);
  const { frameworks } = getEntities(state);
  const framework = frameworks[activeFrameworkId];
  let frameworkNode = framework.frameworkNodes.find(x=>x.id===activeFrameworkNodeId);
  if (frameworkNode) {
    return frameworkNode.rubricRows.find(x=>x.id===activeRubricRowId);
  }
  else {
    frameworkNode = framework.frameworkNodes[0];
    return frameworkNode.rubricRows[0];
  }
};

export const selectActiveRubricRow = createSelector(
  [getActiveRubricRow], (rubricRow) => {
  return rubricRow;
});

const getActiveRubricRowId = (state) => {
  const { activeRubricRowId } = getIds(state);
  return activeRubricRowId;
};

export const selectActiveRubricRowId = createSelector(
  [getActiveRubricRowId], (id) => {
  return id;
});

export const { 
  setActiveFrameworkId, 
  setActiveEvaluation,
  setActiveDistrictViewerSchoolCode,
  setActiveDistrictViewerEvaluatorId,
  setPageTitle,
  setActiveFrameworkNodeId, 
  setActiveRubricRowId, 
  setEvidenceCollectionViewMode,
} = userContextSlice.actions;

export default userContextSlice.reducer;
