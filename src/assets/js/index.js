console.log('Date.now', Date.now);

const addingImg = (src) => {
  const div = document.createElement('div');
  div.className = 'adding-img';
  const img = new Image();
  img.src = src;

  div.appendChild(img);
  document.body.appendChild(div);
};

const ready = () => {
  window.removeEventListener('DOMContentLoaded', ready);
  addingImg('assets/img/A005_C037_09255G_001.png');
};

window.addEventListener('DOMContentLoaded', ready, false);

const load = () => {
  window.removeEventListener('load', load);
  console.log('load');
};

window.addEventListener('load', load, false);
console.log('process.env', process.env.NODE_ENV);
