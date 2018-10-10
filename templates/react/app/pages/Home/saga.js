import { takeLatest, put } from 'redux-saga/effects';
import { message } from 'antd';
import request from 'utils/request';
import { SEARCH_USERS_REPO } from './constant';
import { githubRepoLoaded, githubRepoError } from './action';

function parseRepoDataToList(data) {
  // return Array.prototype.map.call(data, (ele) => ele.full_name)
  return data;
}

function* getGithubReps(action) {
  try {
    const data = yield request(
      `https://api.github.com/users/${action.name}/repos?type=all&sort=updated`,
    );
    yield put(githubRepoLoaded(parseRepoDataToList(data)));
  } catch (err) {
    yield put(githubRepoError(err.message));
    message.error(err.message);
  }
}

export default function* homeSaga() {
  yield takeLatest(SEARCH_USERS_REPO, getGithubReps);
}
