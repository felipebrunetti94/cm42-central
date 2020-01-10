import actionTypes from 'actions/actionTypes';

const initialState = {
  isFetched: false,
  error: null,
  search: {
    loading: false
  },
  reverse: false,
  visibleColumns: {
    chillyBin: true,
    backlog: true,
    done: true
  }
};

const projectBoardReducer = (state = initialState, action) => {
  switch(action.type) {
  case actionTypes.REQUEST_PROJECT_BOARD:
    console.log("REQUEST_PROJECT_BOARD")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      isFetched: false,
      error: null
    };
  case actionTypes.RECEIVE_PROJECT_BOARD:
    console.log("RECEIVE_PROJECT_BOARD")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      projectId: action.data,
      isFetched: true
    };
  case actionTypes.ERROR_REQUEST_PROJECT_BOARD:
    console.log("ERROR_REQUEST_PROJECT_BOARD")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      error: action.error
    };
  case actionTypes.SEARCH_STORIES_SUCCESS:
    console.log("SEARCH_STORIES_SUCCESS")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      search: {
        ...state.search,
        keyWord: action.keyWord
      }
    }
  case actionTypes.CLOSE_SEARCH:
    console.log("CLOSE_SEARCH")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      search: {
        ...state.search,
        keyWord: ''
      },
    }
  case actionTypes.LOADING_SEARCH:
    console.log("LOADING_SEARCH")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      search: {
        ...state.search,
        loading: action.loading
      }
    }
  case actionTypes.REVERSE_COLUMNS:
    console.log("REVERSE_COLUMNS")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      reverse: !state.reverse
    }
  case actionTypes.TOGGLE_COLUMN_VISIBILITY:
    console.log("TOGGLE_COLUMN_VISIBILITY")

    console.log("state",state)
    console.log("action",action)
    return {
      ...state,
      visibleColumns: {
        ...state.visibleColumns,
        [action.column]: !state.visibleColumns[action.column]
      }
    }
  default:
    return state;
  }
};

export default projectBoardReducer;
