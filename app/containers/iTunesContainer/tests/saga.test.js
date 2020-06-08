/**
 * Test itunesContainer sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, call, put } from 'redux-saga/effects';
import { getSongsData } from '@services/iTunesApi';
import { apiResponseGenerator } from '@utils/testUtils';
import itunesContainerSaga, { getSongs } from '../saga';
import { itunesContainerTypes } from '../reducer';

describe('iTunesContainer saga tests', () => {
  const generator = itunesContainerSaga();
  const songName = 'hey';
  let getSongsGenerator = getSongs({ songName });

  it('should start task to watch for REQUEST_GET_SONGS action', () => {
    expect(generator.next().value).toEqual(
      takeLatest(itunesContainerTypes.REQUEST_GET_SONGS, getSongs)
    );
  });

  it('should ensure that the action FAILURE_GET_SONGS is dispatched when the api call fails', () => {
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(getSongsData, songName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching song informations.'
    };
    expect(
      getSongsGenerator.next(apiResponseGenerator(false, errorResponse)).value
    ).toEqual(
      put({
        type: itunesContainerTypes.FAILURE_GET_SONGS,
        error: errorResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_SONGS is dispatched when the api call succeeds', () => {
    getSongsGenerator = getSongs({ songName });
    const res = getSongsGenerator.next().value;
    expect(res).toEqual(call(getSongsData, songName));
    const songsResponse = {
      resultCount: 1,
      results: [{ songName: songName }]
    };
    expect(
      getSongsGenerator.next(apiResponseGenerator(true, songsResponse)).value
    ).toEqual(
      put({
        type: itunesContainerTypes.SUCCESS_GET_SONGS,
        data: songsResponse
      })
    );
  });
});
