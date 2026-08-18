document.addEventListener('DOMContentLoaded', () => {
  // 1. Check if user is logged in
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser'));

  if (!token || !user) {
    // Agar login nahi hai, to wapas login page par bhej do
    window.location.href = '/index.html';
    return;
  }

  // 2. Set Admin Name in Header dynamically
  const adminNameEl = document.getElementById('adminName');
  if (adminNameEl && user.full_name) {
    adminNameEl.textContent = user.full_name;
  }

  // 3. Logout Logic
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/index.html';
    });
  }
  
    // ==========================================
  // FETCH DASHBOARD DATA FROM API
  // ==========================================
  async function loadDashboardData() {
    try {
      const response = await fetch('/api/admin/dashboard-stats', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
          // Yahan authorization header bhi daal sakte ho if required:
          // 'Authorization': `Bearer ${token}` 
        }
      });
      
      const data = await response.json();

      if (data.success) {
        // 1. Stats update karna
        document.getElementById('totalCustomersCount').innerText = data.stats.totalCustomers.toLocaleString();
        document.getElementById('totalShopsCount').innerText = data.stats.totalShops.toLocaleString();
        document.getElementById('pendingVerificationsCount').innerText = data.stats.pendingVerifications;
        document.getElementById('todaysOrdersCount').innerText = data.stats.todaysOrders;

        // 2. Table Update karna
        const tableBody = document.getElementById('verificationTableBody');
        tableBody.innerHTML = ''; // Pehle purana hardcoded data clear karo

        if (data.recentApplications.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No recent applications found.</td></tr>';
          return;
        }

        // Database se aayi nayi list ko table me loop karna
        data.recentApplications.forEach(app => {
          // Date formatting
          const dateObj = new Date(app.created_at);
          const formattedDate = dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
          
          // Badge color logic
          let badgeClass = app.business_type === 'product' ? 'badge-product' : 'badge-service';
          
          // Owner Name null check
          const ownerName = app.profiles ? app.profiles.full_name : 'Unknown';

          const row = `
            <tr>
              <td>
                <div class="store-info">
                  <div class="store-img"><i class="fa-solid fa-store"></i></div>
                  <div class="store-details">
                    <span class="store-name">${app.business_name || 'Unnamed Business'}</span>
                    <span class="store-id">ID: ${app.id.substring(0, 8)}...</span>
                  </div>
                </div>
              </td>
              <td>${ownerName}</td>
              <td><span class="badge ${badgeClass}">${app.business_type || 'N/A'}</span></td>
              <td>${formattedDate}</td>
              <td>
                <div class="status-indicator">
                  <span class="dot pending-dot"></span> ${app.status}
                </div>
              </td>
              <td><button class="btn-primary" onclick="window.location.href='shop-details.html?id=${app.id}'">View Details</button></td>
            </tr>
          `;
          tableBody.innerHTML += row;
        });
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  }

  // Page load hote hi function ko call kar dena
  loadDashboardData();


  // Yaha future me Supabase Fetch API calls aayenge data load karne ke liye
  
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
