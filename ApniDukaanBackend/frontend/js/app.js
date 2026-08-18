document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('adminLoginForm');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.getElementById('togglePassword');
  const alertBox = document.getElementById('alertBox');
  const loginBtn = document.getElementById('loginBtn');

  togglePassword.addEventListener('click', () => {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePassword.classList.toggle('fa-eye');
    togglePassword.classList.toggle('fa-eye-slash');
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value.trim();

    // Box ko initially chupao
    alertBox.style.display = 'none';
    loginBtn.innerText = 'Verifying...';
    loginBtn.disabled = true;

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data.success) {
        alertBox.textContent = 'Login Successful!';
        alertBox.className = 'alert-box alert-success';
        alertBox.style.display = 'block'; // 👉 Box ko wapas show karo
        
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', JSON.stringify(data.user));
         // 2. Dashboard par redirect karne ka main code
        setTimeout(() => {
          window.location.href = 'dashboard.html'; // Ye line page change karegi
        }, 1000); // 1000 ms (1 second
      } else {
        alertBox.textContent = data.message;
        alertBox.className = 'alert-box alert-error';
        alertBox.style.display = 'block'; // 👉 Box ko wapas show karo
      }
    } catch (error) {
      alertBox.textContent = 'Server connection error.';
      alertBox.className = 'alert-box alert-error';
      alertBox.style.display = 'block'; // 👉 Box ko wapas show karo
    } finally {
      loginBtn.innerText = 'Login';
      loginBtn.disabled = false;
    }
  });
});
