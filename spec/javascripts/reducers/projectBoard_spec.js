import actionTypes from "../../../app/assets/javascripts/actions/actionTypes";
import reducer from "../../../app/assets/javascripts/reducers/projectBoard";

describe("Project Board Reducer", () => {
  describe("REQUEST_PROJECT_BOARD", () => {
    it("formats the state", () => {
      const action = {
        type: actionTypes.REQUEST_PROJECT_BOARD
      }

      const state = {}

      expect(reducer(state, action)).toEqual({
        isFetched: false,
        error: null
      });
    });
  });

  describe("RECEIVE_PROJECT_BOARD", () => {
    it("adds data from action to the state", () => {
      const action = {
        type: actionTypes.RECEIVE_PROJECT_BOARD,
        data: "data"
      }

      const state = {}

      expect(reducer(state, action)).toEqual({
        projectId: action.data,
        isFetched: true
      });
    });
  });

  describe("ERROR_REQUEST_PROJECT_BOARD", () => {
    it("adds error to the state", () => {
      const action = {
        type: actionTypes.ERROR_REQUEST_PROJECT_BOARD,
        error: new Error('Error')
      }

      const state = {}

      expect(reducer(state, action)).toEqual({
        error: new Error('Error')
      });
    });
  });

  describe("SEARCH_STORIES_SUCCESS", () => {
    it("adds keyWord from action to search from state", () => {
      const action = {
        type: actionTypes.SEARCH_STORIES_SUCCESS,
        keyWord: "A"
      }

      const state = {
        search: {}
      }

      expect(reducer(state, action)).toEqual({
        search: {
          keyWord: "A"
        }
      });
    });
  });

  describe("CLOSE_SEARCH", () => {
    it("turns search keyWord into empty string", () => {
      const action = {
        type: actionTypes.CLOSE_SEARCH,
      }

      const state = {
        search: {
          keyWord: "A"
        }
      }

      expect(reducer(state, action)).toEqual({
        search: {
          keyWord: ""
        }
      });
    });
  });

  describe("LOADING_SEARCH", () => {
    it("turns state search loading to true", () => {
      const action = {
        type: actionTypes.LOADING_SEARCH,
        loading: true
      }

      const state = {
        search: {
          loading: false
        }
      }

      expect(reducer(state, action)).toEqual({
        search: {
          loading: true
        }
      });
    });
  });

  describe("REVERSE_COLUMNS", () => {
    it("reverses the reverse from state ", () => {
      const action = {
        type: actionTypes.REVERSE_COLUMNS
      }


      const state = {
        reverse: false
      }

      expect(reducer(state, action)).toEqual({
        reverse: true
      });
    });
  });

  describe("TOGGLE_COLUMN_VISIBILITY", () => {
    it("reverses to false the visibility from the selected column", () => {
      const action = {
        type: actionTypes.TOGGLE_COLUMN_VISIBILITY,
        column: "backlog"
      }

      const state = {
        visibleColumns: {
          backlog: true,
          chillyBin: true,
          done: true
        }
      }

      expect(reducer(state, action)).toEqual({
        visibleColumns: {
          backlog: false,
          chillyBin: true,
          done: true
        }
      })
    });
  });

  describe("DEFAULT", () => {
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
    it("returns initialState", () => {
      expect(reducer(undefined, {})).toEqual(initialState);
    });
  });
});
