
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AdminLogin from '@/components/admin/AdminLogin';
import AdminDashboard from '@/components/admin/AdminDashboard';
import { getCurrentUser, isAdmin } from '@/lib/db';

const Admin = () => {
  const [user, setUser] = useState(getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(isAdmin());
  
  const handleLoginSuccess = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  if (isAuthenticated && user) {
    return (
      <Layout>
        <AdminDashboard user={user} onLogout={() => setIsAuthenticated(false)} />
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="py-12">
        <div className="cafe-container max-w-md mx-auto">
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    </Layout>
  );
};

export default Admin;
