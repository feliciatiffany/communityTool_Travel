document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('checklistForm');
    const statusMsg = document.getElementById('statusMsg');
    const cardFlash = document.getElementById('cardFlash');
    const category = form.dataset.category;
    const nextPage = form.dataset.next;
   

    const checklistData = JSON.parse(localStorage.getItem('checklistData')) || {};
    const statusSummary = {};

    const defaultCategories = ['document', 'electronics', 'clothes', 'toiletries', 'health', 'other'];
    defaultCategories.forEach(cat => {
    const items = checklistData[cat] || {};
    const values = Object.values(items);
    statusSummary[cat] = values.length > 0 && values.every(Boolean); // complete if all are true
    });

    
    

    // Load saved checklist for this category
    const saved = checklistData[category] || {};
    Object.keys(saved).forEach(key => {
    const checkbox = form.elements[key];
    if (checkbox) checkbox.checked = saved[key];
    });
    // Submit handler
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const updatedCategoryData = {};
      for (const el of form.elements) {
        if (el.type === 'checkbox') {
          updatedCategoryData[el.name] = el.checked;
        }
      }
  
      // Save updated checklist
      checklistData[category] = updatedCategoryData;
      localStorage.setItem('checklistData', JSON.stringify(checklistData));
  
      // Evaluate and update status summary
      const allChecked = Object.values(updatedCategoryData).every(Boolean);
      statusSummary[category] = allChecked;
      localStorage.setItem('checklistStatus', JSON.stringify(statusSummary));
  
      // Feedback and redirect
      const page = window.location.pathname.split('/').pop();
        const messageMap = {
        'quiz_1_document.html': '✅ Saved! 5 more to go...',
        'quiz_2_electronic.html': 'Pack light. Travel far. Live fully.',
        'quiz_3_clothes.html': '✅ Saved! 3 more to go...',
        'quiz_4_toiletries.html': 'You’re 80% packed!',
        'quiz_5_health.html': '✅ Saved! 1 more to go...',
        'quiz_6_other.html': '✅ All packed! Packing Perk Unlocked! 🎉'
        };

        statusMsg.textContent = messageMap[page] || '✅ Saved!';
        cardFlash.classList.add('slide-in');


      // Navigate after the animation is done
      setTimeout(() => {
        window.location.href = nextPage;
      }, 1500); // Match the transition duration
    });
 

    debugChecklistStatus();


    //DISPLAY INCOMPLETE/COMPLETE
   
    // const statusSummary = JSON.parse(localStorage.getItem('checklistStatus')) || {};

    const incompleteBadges = document.getElementById('incompleteBadges');
    const completeBadges = document.getElementById('completeBadges');
    const incompleteLabel = document.getElementById('incompleteLabel');
    const completeLabel = document.getElementById('completeLabel');
    const instruction = document.getElementById('instruction');
    
    const emojiBadges = {
      document: '📄',
      electronics: '💻',
      clothes: '👕',
      toiletries: '🧴',
      health: '💊',
      other: '📦'
    };
    
    const styleMap = {
        document: {
          backgroundColor: '#F7A97B',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        },
        electronics: {
          backgroundColor: '#FAD994',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        },
        clothes: {
          backgroundColor: '#B5D2C0',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        },
        toiletries: {
          backgroundColor: '#B6D2D6',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        },
        health: {
          backgroundColor: '#CBBCCF',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        },
        other: {
          backgroundColor: '#F2C6C7',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
        }
      };
      

    const nextMap = {
        document: 'quiz_1_document.html',
        electronics: 'quiz_2_electronic.html',
        clothes: 'quiz_3_clothes.html',
        toiletries: 'quiz_4_toiletries.html',
        health: 'quiz_5_health.html',
        other: 'quiz_6_other.html'
      };
    
    let hasIncomplete = false;
    let hasComplete = false;
    
    Object.entries(emojiBadges).forEach(([category, emoji]) => {
        const isComplete = statusSummary[category];
        const badge = document.createElement('div');
        badge.classList.add('status-badge');
        badge.textContent = emoji;
        badge.style.cursor = 'pointer';
        badge.title = `Go to ${category} checklist`;

        // Apply inline style instead of class
        const styles = styleMap[category];
        if (styles) {
            Object.entries(styles).forEach(([prop, value]) => {
            badge.style[prop] = value;
            });
        }
        
      
        const targetPage = nextMap[category];
        if (targetPage) {
          badge.addEventListener('click', () => {
            window.location.href = targetPage;
          });
        }
      
        if (isComplete === false) {
          incompleteBadges.appendChild(badge);
          hasIncomplete = true;
        } else if (isComplete === true) {
          completeBadges.appendChild(badge);
          hasComplete = true;
        }
      });
    
    if (hasIncomplete) {
        instruction.textContent = 'Press emoji to go back for unfinished checklist';
      incompleteLabel.textContent = 'Incomplete';
    }
    
    if (hasComplete) {
        
      completeLabel.textContent = 'Complete';
    }
    
      

    // DEBUG
    function debugChecklistStatus() {
    const checklist = JSON.parse(localStorage.getItem('checklistData')) || {};
    const statusSummary = JSON.parse(localStorage.getItem('checklistStatus')) || {};
  
    console.group('🛠️ Checklist Debug');
  
    console.group('🧩 Category Status');
    Object.entries(statusSummary).forEach(([category, isComplete]) => {
      console.log(`${category}: ${isComplete ? '✅ complete' : '❌ incomplete'}`);
    });
    console.groupEnd();
  
    console.group('📋 Item Status by Category');
    Object.entries(checklist).forEach(([category, items]) => {
      console.group(`[${category.toUpperCase()}]`);
      Object.entries(items).forEach(([item, checked]) => {
        console.log(`${item}: ${checked ? '✅' : '❌'}`);
      });
      console.groupEnd();
    });
    console.groupEnd();
  
    console.groupEnd();
  }
  

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
  