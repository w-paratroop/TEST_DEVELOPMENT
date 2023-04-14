import youtubePlayer from 'youtube-player';

// Cannot access YT.PlayerState from youtube-player (?), so declare constant here.
const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

const player = youtubePlayer('movie1', {
  videoId: 'p5k3Lu96UQQ',
  playerVars: { loop: 1, controls: 0 },
});

let insertBtn = '<a class="poster-btn" href="https://www.youtube.com/">壁紙ボタン</a>';
let done = false;
player.on('stateChange', (event) => {
  if (event.data === PlayerState.ENDED) {
    console.log('end');
    let text1 = document.getElementById('movie-sample-insert');
    text1.innerHTML = insertBtn;
    done = true;
  }
});

player.on('onReady', () => {
  player.cuePlaylist({
    listType: 'playlist',
    playlist: ['p5k3Lu96UQQ'],
    index: 0,
    startSeconds: 0,
    suggestedQuality: 'small',
  });
});

const player3 = youtubePlayer('movie3', {
  videoId: 'p5k3Lu96UQQ',
  playerVars: { loop: 1, controls: 0 },
});

player3.on('stateChange', (event) => {
  if (event.data === PlayerState.ENDED) {
    console.log('end');
    let togglePosterBtn = document.getElementById('toggle-poster-btn');
    togglePosterBtn.classList.add('active');
    done = true;
  }
});

player3.on('onReady', () => {
  player.cuePlaylist({
    listType: 'playlist',
    playlist: ['p5k3Lu96UQQ'],
    index: 0,
    startSeconds: 0,
    suggestedQuality: 'small',
  });
});

/**
 * init
 */
const init = () => {
  player;
  player3;
};

/**
 * movieModal
 * @type {{init: init}}
 */
const Movie = {
  init,
};

export default Movie;
