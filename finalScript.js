document.addEventListener('DOMContentLoaded', () => {
  // FIRST PAGE
  const restartBtn = document.getElementById('restartBtn');
  const cardFlash = document.getElementById('cardFlash');

  if (restartBtn && cardFlash) {
    restartBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Add the slide-in class to the card wrapper
      cardFlash.classList.add('slide-in');

      // Navigate after the animation is done
      setTimeout(() => {
        window.location.href = 'index.html';
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
  
// RESTART
localStorage.removeItem('checklistData');
  localStorage.removeItem('checklistStatus');
  

  console.log("🧼 Checklist progress reset!");
  

});
