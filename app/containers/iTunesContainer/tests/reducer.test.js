import {
  itunesContainerReducer,
  initialState,
  itunesContainerTypes
} from '../reducer';

/* eslint-disable default-case, no-param-reassign */
describe('iTunesContainer reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state', () => {
    expect(itunesContainerReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type FETCH_USER is dispatched', () => {
    const songName = 'Hey';
    const expectedResult = state.set('songName', songName);
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.REQUEST_GET_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the user data is present and userLoading = false when FETCH_USER_SUCCESS is dispatched', () => {
    const data = { name: 'Mohammed Ali Chherawalla' };
    const expectedResult = state.set('songsData', data);
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.SUCCESS_GET_SONGS,
        data
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the userErrorMessage has some data and userLoading = false when FETCH_USER_FAILURE is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = state.set('songsError', error);
    expect(
      itunesContainerReducer(state, {
        type: itunesContainerTypes.FAILURE_GET_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
});
