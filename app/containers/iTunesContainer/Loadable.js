/**
 *
 * Asynchronously loads the component for iTunesContainer
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
