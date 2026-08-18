document.addEventListener('DOMContentLoaded', () => {
  // 1. Auth Check
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser'));

  if (!token || !user) {
    window.location.href = '/index.html';
    return;
  }

  // Header me Admin naam set karna
  const adminNameEl = document.getElementById('adminName');
  if (adminNameEl && user.full_name) {
    adminNameEl.textContent = user.full_name;
  }

  // Logout Logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/index.html';
    });
  }

  // 2. Action Buttons Handling
  const approveBtn = document.getElementById('approveShopBtn');
  const rejectBtn = document.getElementById('rejectShopBtn');

  if(approveBtn) {
    approveBtn.addEventListener('click', async () => {
      // Yahan confirm dialog add kar sakte ho
      const confirmApprove = confirm("Are you sure you want to approve this shop?");
      if(confirmApprove) {
        approveBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';
        approveBtn.disabled = true;

        // Simulate API Request wait
        setTimeout(() => {
          alert("Shop successfully approved!");
          // Optional: redirect back to shop list page
          window.location.href = 'dashboard.html'; 
        }, 1000);
      }
    });
  }

  if(rejectBtn) {
    rejectBtn.addEventListener('click', () => {
      const notes = document.querySelector('.notes-card textarea').value;
      if(notes.trim() === "") {
        alert("Please add a reason in the Admin Internal Notes before rejecting.");
        return;
      }

      const confirmReject = confirm("Are you sure you want to reject this application?");
      if(confirmReject) {
        rejectBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Rejecting...';
        rejectBtn.disabled = true;

        setTimeout(() => {
          alert("Shop application rejected.");
          window.location.href = 'dashboard.html'; 
        }, 1000);
      }
    });
  }
  
    // ==========================================
  // MOBILE SIDEBAR TOGGLE LOGIC
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.querySelector('.sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (mobileMenuBtn && sidebar && sidebarOverlay) {
    // Menu button pe click karke kholna
    mobileMenuBtn.addEventListener('click', () => {
      sidebar.classList.add('active');
      sidebarOverlay.classList.add('active');
    });

    // Dark overlay pe click karke band karna
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

});
