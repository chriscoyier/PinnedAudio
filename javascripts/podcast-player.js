import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.2.1/lit-element.js?module";

class PodcastPlayer extends LitElement {
  static get properties() {
    return {
      currentTime: { type: String },
      currentSpeedIdx: { type: Number },
      duration: { type: String },
    };
  }

  static get styles() {
    return css`
      .podcast-player {
        background: #202225;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.5rem;
        box-sizing: border-box;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .title-and-scrubber {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        padding: 0 1rem;
      }
      .title {
        width: 100%;
        text-align: center;
        font-size: 0.7rem;
        font-weight: normal;
        margin: 0;
      }

      .podcast-player > button,
      .podcast-player > span {
        padding: 0.5rem 1rem;
        white-space: nowrap;
        text-align: center;
      }

      .postcast-player > span {
        font-variant: tabular-nums;
      }

      :focus {
        outline: 2px solid var(--mainColor);
      }

      .podcast-player button {
        -webkit-appearance: none;
        font-family: inherit;
        border: 0;
        background: var(--mainColor);
        border-radius: 0;
        cursor: pointer;
        color: currentColor;
        min-height: 3rem;
      }

      .podcast-player button + button {
        margin-left: 0.5rem;
      }

      .podcast-player button svg {
        width: 2rem;
        height: 2rem;
      }

      .podcast-player .progress-meter {
        grid-row: 2;
        grid-column: 1 / -1;
      }

      .podcast-player input[type="range"] {
        -webkit-appearance: none;
        flex: 1;
        background: transparent;
        margin: 0 0.5rem;
      }

      .podcast-player input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 0.5rem;
        cursor: pointer;
        animate: 0.2s;
        border: 1px solid #333;
        border-radius: 0;
      }

      .podcast-player input[type="range"]::-webkit-slider-thumb {
        border: none;
        height: 1rem;
        width: 1rem;
        border-radius: 0;
        background: var(--mainColor);
        cursor: pointer;
        -webkit-appearance: none;
        margin-top: -0.25rem;
      }

      .podcast-player input[type="range"]::-ms-fill-lower {
        background: var(--orange);
      }

      .podcast-player input[type="range"]::-ms-fill-upper {
        background: white;
      }

      .podcast-player time {
        grid-row: 3;
      }

      .podcast-player .duration {
        grid-column: 3;
        justify-self: end;
      }

      /* Speed */
      .podcast-player .button-speed {
        min-width: 6em;
      }

      .podcast-player .button-speed:after {
        content: "×";
      }

      .podcast-player .button-mute {
        display: none;
      }

      /* Play/Pause */
      .button-play .pause {
        display: none;
      }

      :host(.is-playing) .button-play .pause {
        display: inline;
      }
      :host(.is-playing) .button-play .play {
        display: none;
      }

      /* Mute/Unmute */
      .button-mute .muted {
        display: none;
      }

      :host(.is-muted) .button-mute .muted {
        display: inline;
      }

      :host(.is-muted) .button-mute .unmuted {
        display: none;
      }
    `;
  }

  constructor() {
    super();

    // HTMLAudioElement
    this.audio = this.querySelector("audio");
    this.audio.controls = false; // remove controls if it has 'em

    this.speeds = [1, 1.25, 1.5, 1.75, 2];
    this.currentSpeedIdx = 0;
    this.currentTime = 0;
    this.duration = 0;

    this.audio.addEventListener("timeupdate", this.handleTimeUpdate.bind(this));
    this.audio.addEventListener(
      "loadedmetadata",
      this.handleLoadedMetadata.bind(this)
    );

    window.addEventListener(
      "DOMContentLoaded",
      this.timeJump.bind(this),
      false
    );
    window.addEventListener("hashchange", this.timeJump.bind(this), false);
  }

  handleLoadedMetadata() {
    this.duration = this.audio.duration;
  }

  handleTimeUpdate(e) {
    this.currentTime = this.audio.currentTime;
  }

  setTitle(title) {
    this.shadowRoot.querySelector(".title").innerText = title;
  }

  setAudioSrc() {}

  timeJump(event) {
    let params = new URLSearchParams(window.location.hash.substring(1));
    let t = params.get("t") || 0;

    var timestamp = this.parseTime(t);

    if (t) {
      // Preload the media
      this.audio.setAttribute("preload", "true");
      // Set the current time. Will update if playing. Will fail if paused.
      this.audio.currentTime = timestamp;
      // If the media is able to play, play.
      this.audio.addEventListener(
        "canplay",
        () => {
          /* only start the player if it is not already playing */
          if (!this.audio.paused) {
            return false;
          }

          this.audio.currentTime = timestamp;
          this.audio.play();
          this.classList.add("is-playing");
        },
        false
      );
    }
  }

  parseTime(str) {
    var plain = /^\d+(\.\d+)?$/g,
      npt = /^(?:npt:)?(?:(?:(\d+):)?(\d\d?):)?(\d\d?)(\.\d+)?$/,
      quirks = /^(?:(\d\d?)[hH])?(?:(\d\d?)[mM])?(\d\d?)[sS]$/,
      match;
    if (plain.test(str)) {
      return parseFloat(str);
    }
    match = npt.exec(str) || quirks.exec(str);
    if (match) {
      return (
        3600 * (parseInt(match[1], 10) || 0) +
        60 * (parseInt(match[2], 10) || 0) +
        parseInt(match[3], 10) +
        (parseFloat(match[4]) || 0)
      );
    }
    return 0;
  }

  toHHMMSS(totalsecs) {
    var sec_num = parseInt(totalsecs, 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - hours * 3600) / 60);
    var seconds = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    hours = hours > 0 ? hours + ":" : "";
    minutes = minutes + ":";

    var time = hours + minutes + seconds;
    return time;
  }

  changeSpeed() {
    this.currentSpeedIdx =
      this.currentSpeedIdx + 1 < this.speeds.length
        ? this.currentSpeedIdx + 1
        : 0;
    this.audio.playbackRate = this.speeds[this.currentSpeedIdx];
  }

  mute() {
    this.audio.muted = !this.audio.muted;
    this.classList.toggle("is-muted", this.audio.muted);
  }

  play() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
    this.classList.toggle("is-playing", !this.audio.paused);
  }

  rewind() {
    this.audio.currentTime -= 30;
  }

  ff() {
    this.audio.currentTime += 30;
  }

  seek(e) {
    this.audio.currentTime = e.target.value;
  }

  render() {
    return html`
      <div class="podcast-player">
        <button class="button-play" aria-label="Play" @click="${this.play}">
          <div class="play">▶️</div>
          <div class="pause">❘ ❘</div>
        </button>

        <div class="title-and-scrubber">
          <h2 class="title">Show Title</h2>
          <span class="sr-only">Current Time</span>
          <span class="currenttime time"
            >${this.toHHMMSS(this.currentTime)}</span
          >
          <input
            type="range"
            class="progress-meter"
            value="${this.currentTime}"
            max="${this.duration}"
            @click="${this.seek}"
          />
          <span class="sr-only">Duration</span>
          <span class="duration time">${this.toHHMMSS(this.duration)}</span>
        </div>

        <button class="button-speed" @click="${this.changeSpeed}">
          ${this.speeds[this.currentSpeedIdx]}
        </button>

        <!-- <button class="button-mute" aria-label="Mute" @click="${this
          .mute}">
          <svg class="unmuted">
            <use xlink:href="#icon-speaker-unmuted"></use>
          </svg>
          <svg class="muted"><use xlink:href="#icon-speaker-muted"></use></svg>
        </button> -->

        <button
          class="button-rewind"
          aria-label="Rewind 30 seconds"
          @click="${this.rewind}"
        >
          ←<br />30
        </button>

        <button
          class="button-ff"
          aria-label="Fast Forward 30 seconds"
          @click="${this.ff}"
        >
          →<br />30
        </button>
      </div>
    `;
  }
}

customElements.define("podcast-player", PodcastPlayer);
