document.addEventListener('DOMContentLoaded', () => {
    const finalTitle = document.getElementById('finalTitle');
    const finalSubtitle = document.getElementById('finalSubtitle');
    const incompleteBadges = document.getElementById('incompleteBadges');
    const completeBadges = document.getElementById('completeBadges');
  
    const statusSummary = JSON.parse(localStorage.getItem('checklistStatus')) || {};
  
    const emojiBadges = {
      document: '📄',
      electronics: '💻',
      clothes: '👕',
      toiletries: '🧴',
      health: '💊',
      other: '📦'
    };
  
    const styleMap = {
      document: { backgroundColor: '#F7A97B' },
      electronics: { backgroundColor: '#FAD994' },
      clothes: { backgroundColor: '#B5D2C0' },
      toiletries: { backgroundColor: '#B6D2D6' },
      health: { backgroundColor: '#CBBCCF' },
      other: { backgroundColor: '#F2C6C7' }
    };
  
    const nextMap = {
      document: 'quiz_1_document.html',
      electronics: 'quiz_2_electronic.html',
      clothes: 'quiz_3_clothes.html',
      toiletries: 'quiz_4_toiletries.html',
      health: 'quiz_5_health.html',
      other: 'quiz_6_other.html'
    };
  
    const categories = Object.keys(emojiBadges);
  
    const isAnyIncomplete = categories.some(cat => statusSummary[cat] === false);
    const isAllComplete = categories.every(cat => statusSummary[cat] === true);
  
    categories.forEach(category => {
      const emoji = emojiBadges[category];
      const isComplete = statusSummary[category];
      const targetPage = nextMap[category];
  
      const badge = document.createElement('div');
      badge.classList.add('status-badge');
      badge.textContent = emoji;
      badge.title = `Go to ${category} checklist`;
  
      const styles = styleMap[category];
      Object.entries(styles).forEach(([prop, value]) => {
        badge.style[prop] = value;
      });
  
      badge.addEventListener('click', () => {
        if (targetPage) {
          window.location.href = targetPage;
        }
      });
  
      if (isAnyIncomplete && isComplete === false) {
        incompleteBadges.appendChild(badge);
      } else if (isAllComplete && isComplete === true) {
        completeBadges.appendChild(badge);
      }
    });
  
    // Update titles
    if (isAnyIncomplete) {
      finalTitle.textContent = "Are you sure you want to finish?";
      finalSubtitle.textContent = "You don't want to miss this stuff out";
    } else if (isAllComplete) {
      finalTitle.textContent = "All packed up!";
      finalSubtitle.textContent = "Look at this journey—you’ve packed with care";
    }

    const finishBtn = document.getElementById('finishBtn');

    finishBtn.addEventListener('click', () => {
      window.location.href = 'finish.html';
    });
    
  });
  


  