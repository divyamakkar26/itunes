/*
 *
 * iTunesContainer reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { createActions } from 'reduxsauce';
import _ from 'lodash';

export const {
  Types: itunesContainerTypes,
  Creators: itunesContainerCreators
} = createActions({
  requestGetSongs: ['songName'],
  successGetSongs: ['data'],
  failureGetSongs: ['error'],
  clearSongs: []
});
export const initialState = fromJS({});

/* eslint-disable default-case, no-param-reassign */
export const itunesContainerReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case itunesContainerTypes.REQUEST_GET_SONGS:
        return initialState.set('songName', action.songName);
      case itunesContainerTypes.CLEAR_SONGS:
        return initialState.set('songName', null).set('songsData', null);
      case itunesContainerTypes.SUCCESS_GET_SONGS:
        return state.set('songsData', action.data);
      case itunesContainerTypes.FAILURE_GET_SONGS:
        return state.set(
          'songsError',
          _.get(action.error, 'message', 'something_went_wrong')
        );
    }
    return state;
  });

export default itunesContainerReducer;
