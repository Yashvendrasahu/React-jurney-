const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Frontend folder ko static files ke liye serve karna
app.use(express.static(path.join(__dirname, 'frontend')));

// Default route par index.html load karna
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    // 1. Supabase Auth Verify 
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email, password,
    });

    if (authError) return res.status(401).json({ success: false, message: `Auth Failed: ${authError.message}` });

    const userId = authData.user.id;

    // 2. Role Check (Naye schema me column ka naam 'user_id' hai)
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();

    if (roleError || !roleData) {
      return res.status(403).json({ success: false, message: 'Profile/Role not found.' });
    }
    
    if (roleData.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access Denied: Admin only.' });
    }

    // 3. Admin ka naam profiles table se fetch karna 
    // (Taaki Dashboard header me naam dikh sake)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', userId)
      .maybeSingle();

    const fullName = profile ? profile.full_name : 'Admin User';

    // 4. Success Response with updated user details
    return res.status(200).json({
      success: true,
      token: authData.session.access_token,
      user: { 
        id: userId, 
        email: authData.user.email, 
        full_name: fullName, 
        role: roleData.role 
      }
    });
  } catch (err) {
    console.error('Login Route Error:', err);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
});

// ==========================================
// DASHBOARD STATS API
// ==========================================
app.get('/api/admin/dashboard-stats', async (req, res) => {
  try {
    // 1. Total Customers count fetch karna
    const { count: totalCustomers } = await supabase
      .from('user_roles')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'customer');

    // 2. Total Shops count fetch karna
    const { count: totalShops } = await supabase
      .from('businesses')
      .select('*', { count: 'exact', head: true });

    // 3. Pending Verifications count (applications table se)
    const { count: pendingVerifications } = await supabase
      .from('partner_applications')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'draft'); // Database me default status 'draft' hai, use change karna ho to 'pending' kar lena

    // 4. Today's Orders count
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Aaj ki date raat 12:00 AM se shuru
    const { count: todaysOrders } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    // 5. Recent Shop Verification List (Top 3)
    const { data: recentApps, error: recentError } = await supabase
      .from('partner_applications')
      .select(`
        id,
        business_name,
        business_type,
        status,
        created_at,
        profiles ( full_name ) 
      `)
      .order('created_at', { ascending: false })
      .limit(3);

    if (recentError) throw recentError;

    // Frontend ko data bhej dena
    return res.status(200).json({
      success: true,
      stats: {
        totalCustomers: totalCustomers || 0,
        totalShops: totalShops || 0,
        pendingVerifications: pendingVerifications || 0,
        todaysOrders: todaysOrders || 0
      },
      recentApplications: recentApps || []
    });

  } catch (err) {
    console.error('Dashboard Error:', err);
    return res.status(500).json({ success: false, message: 'Failed to fetch dashboard data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
