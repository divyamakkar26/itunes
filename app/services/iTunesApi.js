import { generateApiClient } from '@utils/apiUtils';
const iTunesApi = generateApiClient('itunes');

export const getSongsData = searchTerm =>
  iTunesApi.get(`/search?term=${searchTerm}`);
