document.addEventListener('DOMContentLoaded', () => {
  // FIRST PAGE
  const startBtn = document.getElementById('startBtn');
  const cardFlash = document.getElementById('cardFlash');

  if (startBtn && cardFlash) {
    startBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Add the slide-in class to the card wrapper
      cardFlash.classList.add('slide-in');

      // Navigate after the animation is done
      setTimeout(() => {
        window.location.href = 'opening.html';
      }, 800); // Match the transition duration
    });
  }

  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  // MUSIC
  document.querySelectorAll('.emoji-btn').forEach(button => {
    button.addEventListener('click', () => {
      const trackId = button.dataset.track;
      const nextPage = button.dataset.next;
      
      localStorage.setItem('selectedTrack', trackId);
      // ✅ Open mini music window if not already opened
      const musicWindow = window.open(
        `musicPlayer.html?track=${trackId}`,
        'musicPlayer',
        'width=200,height=100'
      );
  
      // ✅ Redirect to the quiz page
      setTimeout(() => {
        window.location.href = nextPage;
      }, 800);
    });
  });
  


});
