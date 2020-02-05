import {projectAPI} from '../api/api.js';

const ADD_LIKE_PROJECT_ID = 'ADD_LIKE_PROJECT_ID';
const REMOVE_LIKE_PROJECT_ID = 'REMOVE_LIKE_PROJECT_ID';
const SET_PROJECT = 'SET_PROJECT';
const SET_IS_FETCHING = 'SET_IS_FETCHING_PROJECT';

let initialState = {
  data: {
    name: null,
    photo: {
      small: null,
      large: null
    },
    description: null,
    url: null,
    stack: [],
    likesAmount: null,
    userLike: false
  },
  isFetching: false
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECT: {
      return {
        ...state,
        data: {...action.data}
      }
    }
    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case ADD_LIKE_PROJECT_ID: {
      return {
        ...state,
        data: {
          ...state.data,
          likesAmount: state.data.likesAmount + 1,
          userLike: true
        },
      };
    }
    case REMOVE_LIKE_PROJECT_ID: {
      return {
        ...state,
        data: {
          ...state.data,
          likesAmount: state.data.likesAmount - 1,
          userLike: false
        },
      };
    }
    default:
      return state;
  }
};

export const setProject = (data) => {
  return ({
    type: SET_PROJECT,
    data
  })
};

export const getProject = (id) => (dispatch) => {
  dispatch(setIsFetching(true));
  projectAPI.getProjectsItem(id)
    .then(data => {
      dispatch(setIsFetching(false));
      dispatch(setProject(data));
    });
};

export const setIsFetching = (isFetching) => {
  return ({
    type: SET_IS_FETCHING,
    isFetching
  })
};

export const addLikeProject = () => {
  return ({
    type: ADD_LIKE_PROJECT_ID
  })
};

export const removeLikeProject = () => {
  return ({
    type: REMOVE_LIKE_PROJECT_ID
  })
};

export default projectReducer
