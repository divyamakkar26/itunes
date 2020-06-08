import { itunesContainerTypes, itunesContainerCreators } from '../reducer';

describe('iTunesContainer action tests', () => {
  it('has a type of REQUEST_GET_SONGS', () => {
    const expected = {
      type: itunesContainerTypes.REQUEST_GET_SONGS,
      songName: 'songName'
    };
    expect(itunesContainerCreators.requestGetSongs('songName')).toEqual(
      expected
    );
  });
});
