(function() {
  const $audioPlayer = document.querySelector("#audio-player");
  const $audioElement = document.querySelector("#audio-player-audio-element");

  function updateAudio(play) {
    $audioPlayer.setTitle(window.audioInit.title);
    $audioElement.setAttribute("src", window.audioInit.src);
    if (play) $audioPlayer.play();
  }

  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("click", (e) => {
      console.log("play button pressed");
      const { target } = e;
      if (target.matches("button.play-episode-button")) {
        // TODO: Don't start the show over if it's the current show already.
        updateAudio(true);
      }
    });

    // Do once on page load.
    updateAudio(false);
  });
})();
