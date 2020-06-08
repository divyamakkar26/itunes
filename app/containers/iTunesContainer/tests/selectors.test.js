import { fromJS } from 'immutable';
import {
  selectiTunesContainer,
  selectSongName,
  selectSongsData,
  selectSongsError
} from '../selectors';

describe('iTunesContainer selector tests', () => {
  let mockedState;
  let songName;
  let songsData;
  let songsError;

  beforeEach(() => {
    songName = 'hey';
    songsData = { resultCount: 1, results: [{ songName }] };
    songsError = 'There was some error while fetching the song details';

    mockedState = {
      itunesContainer: fromJS({
        songName,
        songsData,
        songsError
      })
    };
  });
  it('should select the itunesContainer state', () => {
    const itunesContainerSelector = selectiTunesContainer();
    expect(itunesContainerSelector(mockedState)).toEqual(
      mockedState.itunesContainer.toJS()
    );
  });
  it('should select the songName', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songsData', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(songsError);
  });
});
