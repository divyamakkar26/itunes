import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import {
  selectiTunesContainer,
  selectSongsData,
  selectSongsError,
  selectSongName
} from './selectors';
import { itunesContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function iTunesContainer({
  dispatchSongs,
  dispatchClearSongs,
  intl,
  songsData = {},
  songsError = null,
  songName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'itunesContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(songsData, 'results', null) || songsError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [songsData]);

  const history = useHistory();

  const handleOnChange = rName => {
    if (!isEmpty(rName)) {
      dispatchSongs(rName);
      setLoading(true);
    } else {
      dispatchClearSongs();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderSongList = () => {
    const results = get(songsData, 'results', []);
    const resultCount = get(songsData, 'resultCount', 0);
    return (
      (results.length !== 0 || loading) && (
        <CustomCard>
          <Skeleton loading={loading} active>
            {songName && (
              <div>
                <T id="search_query_song" values={{ songName }} />
              </div>
            )}
            {resultCount !== 0 && (
              <div>
                <T id="matching_songs" values={{ resultCount }} />
              </div>
            )}
            {results.map((item, index) => (
              <CustomCard key={index}>
                <div>Artist Name: {item.artistName}</div>
                <div>Country : {item.country}</div>
                <div>Collection Name: {item.collectionName}</div>
              </CustomCard>
            ))}
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let songError;
    if (songsError) {
      songError = songsError;
    } else if (!get(songsData, 'resultCount', 0)) {
      songError = 'song_search_default';
    }
    return (
      !loading &&
      songError && (
        <CustomCard
          color={songsError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'song_list' })}
        >
          <T id={songError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('/');
    // window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="repo_list" onClick={refreshPage} />
      </RightContent>
      <CustomCard
        title={intl.formatMessage({ id: 'iTunes_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="search_songs" />
        <Search
          data-testid="search-bar"
          defaultValue={songName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderSongList()}
      {renderErrorState()}
    </Container>
  );
}

iTunesContainer.propTypes = {
  dispatchSongs: PropTypes.func,
  dispatchClearSongs: PropTypes.func,
  intl: PropTypes.object,
  songsData: PropTypes.shape({
    resultCount: PropTypes.number,
    // incompleteResults: PropTypes.bool,
    results: PropTypes.array
  }),
  songsError: PropTypes.object,
  songName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

iTunesContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  itunesContainer: selectiTunesContainer(),
  songsData: selectSongsData(),
  songsError: selectSongsError(),
  songName: selectSongName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetSongs, clearSongs } = itunesContainerCreators;
  return {
    dispatchSongs: songName => dispatch(requestGetSongs(songName)),
    dispatchClearSongs: () => dispatch(clearSongs())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(iTunesContainer);

export const iTunesContainerTest = compose(injectIntl)(iTunesContainer);
