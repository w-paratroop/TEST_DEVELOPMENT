class YouTubePlayer {
  constructor(dom, option) {
    this.dom = dom;
    this.option = option;
    this.option.events = this.option.events || {};
    this._player = null;
    this.events = this.option.events;

    if (!window.onYouTubeIframeAPIReady || !window.YT?.Player) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
      window.onYouTubeIframeAPIReady = () => (this._player = this.apply());
    } else {
      this._player = this.apply();
    }
  }

  get player() {
    return this._player;
  }
  apply = () => new window.YT.Player(this.dom, this.option);
  onReady = (callback) => (this.option.events.onReady = callback);
  onStateChange = (callback) => (this.option.events.onStateChange = callback);
  onPlaybackQualityChange = (callback) => (this.option.events.onPlaybackQualityChange = callback);
  onPlaybackRateChange = (callback) => (this.option.events.onPlaybackRateChange = callback);
  onError = (callback) => (this.option.events.onError = callback);
  onApiChange = (callback) => (this.option.events.onApiChange = callback);
}
export default YouTubePlayer;
