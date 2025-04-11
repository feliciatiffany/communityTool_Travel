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
  });
  