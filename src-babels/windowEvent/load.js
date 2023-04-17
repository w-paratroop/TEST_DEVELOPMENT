import Movie from '../movie/Movie';
import modalInit from '../modal/Modal';

/**
 * load callback
 */
function load() {
  Movie.init;
  modalInit();
  window.removeEventListener('loaded', load);
}

export default load;
