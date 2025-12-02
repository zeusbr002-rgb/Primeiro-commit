
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ServiceOrder, UserRole, OSStatus, OSPriority, ScheduleItem } from './types';
import { MOCK_ORDERS, MOCK_SCHEDULES } from './lib/mockData';

interface OmniContextType {
  user: User | null;
  orders: ServiceOrder[];
  schedules: ScheduleItem[];
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  updateOrder: (id: string, updates: Partial<ServiceOrder>) => void;
  createOrder: (order: Omit<ServiceOrder, 'id' | 'createdAt' | 'status'>) => void;
  addSchedule: (title: string, file: File) => Promise<void>;
  completeOrder: (id: string, notes: string, evidenceFile: File) => Promise<void>;
}

const OmniContext = createContext<OmniContextType | undefined>(undefined);

export const OmniProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);

  // INITIALIZATION & PERSISTENCE
  useEffect(() => {
    // Load User
    const storedUser = localStorage.getItem('omni_user');
    if (storedUser) setUser(JSON.parse(storedUser));

    // Load Data (or Mock)
    const storedOrders = localStorage.getItem('omni_orders');
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    } else {
      setOrders(MOCK_ORDERS);
      localStorage.setItem('omni_orders', JSON.stringify(MOCK_ORDERS));
    }

    const storedSchedules = localStorage.getItem('omni_schedules');
    if (storedSchedules) {
      setSchedules(JSON.parse(storedSchedules));
    } else {
      setSchedules(MOCK_SCHEDULES);
      localStorage.setItem('omni_schedules', JSON.stringify(MOCK_SCHEDULES));
    }
  }, []);

  // Sync Data on Change
  useEffect(() => {
    if (orders.length > 0) localStorage.setItem('omni_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (schedules.length > 0) localStorage.setItem('omni_schedules', JSON.stringify(schedules));
  }, [schedules]);


  // --- AUTH LOGIC ---
  const login = async (username: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500)); // Fake latency
    
    let newUser: User;
    if (username.trim() === 'X') {
      newUser = {
        id: 'admin-x',
        name: 'Administrator',
        role: UserRole.ADMIN,
        initials: 'AD'
      };
    } else {
      newUser = {
        id: `worker-${Date.now()}`,
        name: username,
        role: UserRole.CONTRACTOR,
        initials: username.substring(0, 2).toUpperCase()
      };
    }
    
    setUser(newUser);
    localStorage.setItem('omni_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('omni_user');
  };

  // --- DATA LOGIC ---

  // Helper: File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const updateOrder = (id: string, updates: Partial<ServiceOrder>) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
  };

  const createOrder = (orderData: Omit<ServiceOrder, 'id' | 'createdAt' | 'status'>) => {
    const newOrder: ServiceOrder = {
      ...orderData,
      id: `OS-${Math.floor(Math.random() * 10000)}`,
      createdAt: new Date().toISOString(),
      status: OSStatus.OPEN,
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const addSchedule = async (title: string, file: File) => {
    try {
      const base64 = await fileToBase64(file);
      const newItem: ScheduleItem = {
        id: `SCH-${Date.now()}`,
        title,
        imageUrl: base64,
        uploadedAt: new Date().toISOString(),
        uploadedBy: user?.name || 'Admin'
      };
      setSchedules(prev => [newItem, ...prev]);
    } catch (e) {
      console.error("Failed to process schedule image", e);
    }
  };

  const completeOrder = async (id: string, notes: string, evidenceFile: File) => {
    try {
      const base64 = await fileToBase64(evidenceFile);
      updateOrder(id, {
        status: OSStatus.COMPLETED,
        completedAt: new Date().toISOString(),
        notes,
        evidenceImage: base64
      });
    } catch (e) {
      console.error("Failed to upload evidence", e);
    }
  };

  return (
    <OmniContext.Provider value={{
      user, orders, schedules, login, logout, 
      updateOrder, createOrder, addSchedule, completeOrder
    }}>
      {children}
    </OmniContext.Provider>
  );
};

export const useOmni = () => {
  const context = useContext(OmniContext);
  if (!context) throw new Error('useOmni must be used within OmniProvider');
  return context;
};
