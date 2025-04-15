document.addEventListener('DOMContentLoaded', () => {
    const reaction = document.getElementById('reaction');
    const buttons = document.querySelectorAll('.choice');
    const animationLayer = document.getElementById('animationLayer');
    const body = document.body;
  
    const reactions = {
        nature: "🌿 So good to hear you're heading back to nature. Breathe deep and heal your soul.",
        city: "🌆 Bright lights, new sights, and city strolls—sounds like the perfect adventure!",
        rural: "🌾 I love places like this. Peace, open space, and quiet roads help clear one's mind."        
    };
  
    const backgroundMap = {
      nature: '#DFF5DC',
      city: '#E0E4F6',
      rural: '#FFF5D1'
    };
  
    const emojiMap = {
      nature: ['🍃', '🌿', '🍂'],
      city: ['💡', '🚕', '🏙️'],
      rural: ['🌾', '🧺', '🐄']
    };
  
    function clearAnimation() {
      animationLayer.innerHTML = '';
    }
  
    function createFloatingEmoji(type) {
      for (let i = 0; i < 15; i++) {
        const span = document.createElement('span');
        span.classList.add(type === 'nature' ? 'leaf' : type === 'city' ? 'light' : 'cloud');
        span.style.left = `${Math.random() * 100}%`;
        span.style.animationDuration = `${4 + Math.random() * 4}s`;
        span.style.fontSize = `${1 + Math.random() * 2}rem`;
        span.textContent = emojiMap[type][Math.floor(Math.random() * emojiMap[type].length)];
        animationLayer.appendChild(span);
      }
    }
  
    buttons.forEach(button => {
        button.addEventListener('click', () => {
          const selected = button.dataset.choice;
           localStorage.setItem('destinationType', selected); // Save the answer

  
      
          reaction.textContent = reactions[selected] || "Have a great trip!";
          body.style.backgroundColor = backgroundMap[selected] || '#fdfdfd';
      
          clearAnimation();
          createFloatingEmoji(selected);
    
          setTimeout(() => {
            window.location.href = 'quiz_3_clothes.html';
          }, 3000); 
        });
      });
      
  });
  