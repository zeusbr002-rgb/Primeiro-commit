
import React, { useState } from 'react';
import { OmniProvider, useOmni } from './context';
import { UserRole, ServiceOrder } from './types';
import { Login } from './components/Login';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminSchedule } from './components/admin/AdminSchedule';

// Contractor Components
import { ContractorLayout } from './components/contractor/ContractorLayout';
import { ContractorDashboard } from './components/contractor/ContractorDashboard';
import { ContractorSchedule } from './components/contractor/ContractorSchedule';
import { ContractorExecution } from './components/contractor/ContractorExecution';

const AppContent: React.FC = () => {
  const { user } = useOmni();
  
  // Navigation State
  const [adminPage, setAdminPage] = useState<'dashboard' | 'schedule'>('dashboard');
  const [contractorPage, setContractorPage] = useState<'dashboard' | 'schedule'>('dashboard');
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);

  if (!user) {
    return <Login />;
  }

  // --- ADMIN ROUTING ---
  if (user.role === UserRole.ADMIN) {
    return (
      <AdminLayout activePage={adminPage} onNavigate={setAdminPage}>
        {adminPage === 'dashboard' ? <AdminDashboard /> : <AdminSchedule />}
      </AdminLayout>
    );
  }

  // --- CONTRACTOR ROUTING ---
  if (user.role === UserRole.CONTRACTOR) {
    // If viewing specific order detail/execution
    if (selectedOrder) {
      return <ContractorExecution order={selectedOrder} onBack={() => setSelectedOrder(null)} />;
    }

    // Main layout
    return (
      <ContractorLayout activePage={contractorPage} onNavigate={setContractorPage}>
        {contractorPage === 'dashboard' ? (
           <ContractorDashboard onSelectOrder={setSelectedOrder} />
        ) : (
           <ContractorSchedule />
        )}
      </ContractorLayout>
    );
  }

  return <div>Unknown Role</div>;
};

const App: React.FC = () => {
  return (
    <OmniProvider>
      <div className="antialiased text-slate-900 bg-slate-50 min-h-screen font-sans">
        <AppContent />
      </div>
    </OmniProvider>
  );
};

export default App;
