import { createSelector } from 'reselect';
import _ from 'lodash';
import { initialState } from './reducer';

/**
 * Direct selector to the itunesContainer state domain
 */

const selectiTunesContainerDomain = state =>
  (state.itunesContainer || initialState).toJS();

/**
 * Other specific selectors
 */

/**
 * Default selector used by iTunesContainer
 */

export const selectiTunesContainer = () =>
  createSelector(
    selectiTunesContainerDomain,
    substate => substate
  );

export const selectSongsData = () =>
  createSelector(
    selectiTunesContainerDomain,
    substate => _.get(substate, 'songsData', null)
  );

export const selectSongsError = () =>
  createSelector(
    selectiTunesContainerDomain,
    substate => _.get(substate, 'songsError', null)
  );

export const selectSongName = () =>
  createSelector(
    selectiTunesContainerDomain,
    substate => _.get(substate, 'songName', null)
  );

export default selectiTunesContainer;
