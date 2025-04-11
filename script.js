document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  if (startBtn) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default just in case

      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = 'opening.html'; // redirect after fade
      }, 800); // match transition duration
    });
  }

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  const emojiButtons = document.querySelectorAll('.emoji-btn');

  emojiButtons.forEach(button => {
    button.addEventListener('click', () => {
      const trackId = button.dataset.track;

      // Pause all tracks first
      document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });

      // Play selected track
      const selectedAudio = document.getElementById(trackId);
      if (selectedAudio) {
        selectedAudio.play();
      }
    });
  });
});
