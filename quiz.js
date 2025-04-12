document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('docForm');
    const statusMsg = document.getElementById('statusMsg');
  
    // Load previously saved data
    const saved = JSON.parse(localStorage.getItem('docChecklist')) || {};
    Object.keys(saved).forEach(key => {
      const checkbox = form.elements[key];
      if (checkbox) checkbox.checked = saved[key];
    });
  
    // Save data on submit
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const checklist = {
        passport: form.elements.passport.checked,
        tickets: form.elements.tickets.checked,
        boarding: form.elements.boarding.checked
      };
      localStorage.setItem('docChecklist', JSON.stringify(checklist));
      statusMsg.textContent = "✅ Checklist saved!";
    });


    // MUSIC
    
    const trackLabel = document.getElementById('trackLabel');
    const emojiSpan = document.querySelector('.music-emoji');

    const emojiMap = {
      lofi: '🌿',
      pop: '🎉',
      chill: '🌊',
      adventure: '⛰️'
    };

    const trackId = localStorage.getItem('selectedTrack');

    if (trackId) {
      trackLabel.textContent = `${trackId} is playing`;
      emojiSpan.textContent = emojiMap[trackId] || '🎵';
    } else {
      trackLabel.textContent = `nothing is playing`;
      emojiSpan.textContent = '🎵';
    }
    
    // CLOSE OPEN MUSIC

  let musicTab = null;
  const toggleBtn = document.getElementById('toggleMusicTab');

  function updateButton(isPlaying) {
    toggleBtn.textContent = isPlaying ? '⏸' : '▶';
  }

  toggleBtn.addEventListener('click', () => {
    const savedTrack = localStorage.getItem('selectedTrack') || 'lofi';
    const musicURL = `musicPlayer.html?track=${savedTrack}`;

    if (musicTab && !musicTab.closed) {
      // Pause
      musicTab.close();
      musicTab = null;
      updateButton(false);
      console.log("⏸ Music paused");
    } else {
      // Play
      musicTab = window.open(musicURL, 'musicPlayer', 'width=300,height=100');
      updateButton(true);
      console.log("▶ Music playing");
    }
  });

  // Detect manual tab close
  setInterval(() => {
    if (musicTab && musicTab.closed) {
      musicTab = null;
      updateButton(false);
    }
  }, 1000);

      
      
  });
  