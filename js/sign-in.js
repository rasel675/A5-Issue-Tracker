  function handleLogin() {
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      const errEl = document.getElementById('error-msg');

      if (username === 'admin' && password === 'admin123') {
        errEl.classList.add('hidden');
        window.location.href = 'dashboard.html';
      } else {
        errEl.classList.remove('hidden');
      }
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') 
        handleLogin();
    });