import MicroModal from 'micromodal';
import youtubePlayer from 'youtube-player';
// Cannot access YT.PlayerState from youtube-player (?), so declare constant here.
const PlayerState = {
  ENDED: 0,
  PLAYING: 1,
  PAUSED: 2,
  BUFFERING: 3,
  CUED: 5,
};

const player2 = youtubePlayer('movie2', {
  videoId: 'QHKhyo70RIw',
});

const player4 = youtubePlayer('movie4', {
  videoId: 'QHKhyo70RIw',
});

const player5 = youtubePlayer('movie5', {
  videoId: 'p5k3Lu96UQQ',
});

let insertBtn = '<a class="poster-btn" href="https://www.youtube.com/">壁紙ボタン</a>';
let done = false;
let momoDone = false;
let ballDone = false;

player2.on('stateChange', (event) => {
  if (event.data === PlayerState.ENDED) {
    console.log('end');
    insertText();
    // setTimeout(closeModal,1000);
    done = true;
  }
});

player2.on('onReady', () => {
  player2.cuePlaylist({
    listType: 'playlist',
    playlist: ['QHKhyo70RIw'],
    index: 0,
    startSeconds: 0,
    suggestedQuality: 'small',
  });
});

player4.on('stateChange', (event) => {
  if (event.data === PlayerState.ENDED) {
    console.log('end');
    if (ballDone) {
      insertText4();
    }
    momoDone = true;
  }
});

player4.on('onReady', () => {
  player4.cuePlaylist({
    listType: 'playlist',
    playlist: ['QHKhyo70RIw'],
    index: 0,
    startSeconds: 0,
    suggestedQuality: 'small',
  });
});

player5.on('stateChange', (event) => {
  if (event.data === PlayerState.ENDED) {
    console.log('end');
    if (momoDone) {
      insertText4();
    }
    ballDone = true;
  }
});

player5.on('onReady', () => {
  player5.cuePlaylist({
    listType: 'playlist',
    playlist: ['QHKhyo70RIw'],
    index: 0,
    startSeconds: 0,
    suggestedQuality: 'small',
  });
});

const insertText = () => {
  let text1 = document.getElementById('modal-sample-insert1');
  let text2 = document.getElementById('modal-sample-insert2');
  text1.innerHTML = insertBtn;
  text2.innerHTML = insertBtn;
};

const insertText4 = () => {
  let text4 = document.getElementById('modal-sample-insert4');
  3;
  text4.innerHTML = insertBtn;
};

/**
 * microModalInit
 */
const microModalInit = () => {
  MicroModal.init({
    disableScroll: false,
    onClose: (modal) => {
      modal.querySelectorAll('.modal-movie').forEach((iframe) => {
        iframe.setAttribute('src', iframe.getAttribute('src'));
      });
    },
  });
};

/**
 * modalInit
 */
const modalInit = () => {
  player2;
  player4;
  player5;
  microModalInit();
};

export default modalInit;
