import { fromJS } from 'immutable';

import {
  CHANGE_USERNAME,
  SEARCH_USERS_REPO,
  GITHUB_REPO_LOADED,
  GITHUB_REPO_ERROR,
} from './constant';

const initialState = fromJS({
  name: 'godotdotdot',
  repoData: null,
  loading: false,
  error: false,
});
function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state.set('name', action.name);
    case SEARCH_USERS_REPO:
      return state.set('loading', true).set('error', false);
    case GITHUB_REPO_ERROR:
      return state.set('loading', false).set('error', true);
    case GITHUB_REPO_LOADED:
      return state
        .set('repoData', action.repoData)
        .set('loading', false)
        .set('error', false);
    default:
      return state;
  }
}
export default homeReducer;
