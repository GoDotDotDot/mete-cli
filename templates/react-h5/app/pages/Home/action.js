import {
  CHANGE_USERNAME,
  SEARCH_USERS_REPO,
  GITHUB_REPO_LOADED,
  GITHUB_REPO_ERROR,
} from './constant';

export function changeUsername(name) {
  console.log('action:', name);
  return {
    type: CHANGE_USERNAME,
    name,
  };
}
export function searchUsersGithubRepo(name) {
  return {
    type: SEARCH_USERS_REPO,
    name,
  };
}
export function githubRepoLoaded(repoData) {
  return {
    type: GITHUB_REPO_LOADED,
    repoData,
  };
}
export function githubRepoError(errMsg) {
  return {
    type: GITHUB_REPO_ERROR,
    errMsg,
  };
}
