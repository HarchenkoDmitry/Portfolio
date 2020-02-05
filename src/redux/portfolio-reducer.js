import {projectAPI} from '../api/api.js';

const ADD_LIKE_PROJECT = 'ADD_LIKE_PROJECT';
const REMOVE_LIKE_PROJECT = 'REMOVE_LIKE_PROJECT';
const SET_PORTFOLIO = 'SET_PORTFOLIO';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_ID_LIKE_FETCHING = 'SET_ID_LIKE_FETCHING';

let initialState = {
  projects: [],
  pageSize: 8,
  currentPage: 1,
  totalCount: 0,
  isFetching: false,
  idLikeFetching: []
};

const portfolioReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKE_PROJECT: {
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project.id === action.id) {
            project.likesAmount++;
            project.userLike = true;
          }
          return project;
        })
      };
    }
    case REMOVE_LIKE_PROJECT: {
      return {
        ...state,
        projects: state.projects.map(project => {
          if (project.id === action.id) {
            project.likesAmount--;
            project.userLike = false;
          }
          return project;
        })
      };
    }
    case SET_PORTFOLIO: {
      return {
        ...state,
        projects: [
          ...action.projects
        ],
        totalCount: action.totalCount
      }
    }
    case SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage
      }
    }
    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching
      }
    }
    case SET_ID_LIKE_FETCHING: {
      return {
        ...state,
        idLikeFetching: action.idLikeFetching
      }
    }
    default:
      return state;
  }
};

export const addLikeSuccess = (id) => {
  return ({
    type: ADD_LIKE_PROJECT,
    id
  })
};

export const removeLikeSuccess = (id) => {
  return ({
    type: REMOVE_LIKE_PROJECT,
    id
  })
};

export const setPortfolio = (projects, totalCount) => {
  return ({
    type: SET_PORTFOLIO,
    projects,
    totalCount
  })
};

export const setCurrentPage = (currentPage) => {
  return ({
    type: SET_CURRENT_PAGE,
    currentPage
  })
};

export const setIsFetching = (isFetching) => {
  return ({
    type: SET_IS_FETCHING,
    isFetching
  })
};

export const setIdLikeFetching = (idLikeFetching) => {
  return ({
    type: SET_ID_LIKE_FETCHING,
    idLikeFetching
  })
};

export const getPortfolio = (currentPage) => (dispatch) => {
  dispatch(setIsFetching(true));
  projectAPI.getProjects(currentPage)
    .then(data => {
      dispatch(setIsFetching(false));
      dispatch(setPortfolio(data.projects, data.totalCount));
    });
};

export const addLike = (id) => (dispatch, getState) => {
  let state = getState();
  dispatch(setIdLikeFetching([...state.portfolio.idLikeFetching, id]));
  projectAPI.addLike(id)
    .then((isOk) => {
      if (isOk)  {
        dispatch(addLikeSuccess(id));
        dispatch(setIdLikeFetching(state.portfolio.idLikeFetching.filter(idItem => idItem !== id)));
      }
    })
};

export const removeLike = (id) => (dispatch, getState) => {
  let state = getState();
  dispatch(setIdLikeFetching([...state.portfolio.idLikeFetching, id]));
  projectAPI.removeLike(id)
    .then((isOk) => {
      if (isOk)  {
        dispatch(removeLikeSuccess(id));
        dispatch(setIdLikeFetching(state.portfolio.idLikeFetching.filter(idItem => idItem !== id)));
      }
    })
};


export default portfolioReducer;
