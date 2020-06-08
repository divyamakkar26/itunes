import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongsData } from '@services/iTunesApi';
import { itunesContainerTypes, itunesContainerCreators } from './reducer';

const { REQUEST_GET_SONGS } = itunesContainerTypes;
const { successGetSongs, failureGetSongs } = itunesContainerCreators;
export function* getSongs(action) {
  const response = yield call(getSongsData, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetSongs(data));
  } else {
    yield put(failureGetSongs(data));
  }
}
// Individual exports for testing
export default function* itunesContainerSaga() {
  yield takeLatest(REQUEST_GET_SONGS, getSongs);
}
