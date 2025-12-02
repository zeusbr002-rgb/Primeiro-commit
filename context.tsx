
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, ServiceOrder, UserRole, OSStatus, OSPriority, ScheduleItem } from './types';
import { MOCK_ORDERS, MOCK_SCHEDULES, MOCK_USERS } from './lib/mockData';

interface OmniContextType {
  user: User | null;
  orders: ServiceOrder[];
  schedules: ScheduleItem[];
  isMounted: boolean;
  login: (username: string) => Promise<boolean>;
  logout: () => void;
  updateOrder: (id: string, updates: Partial<ServiceOrder>) => void;
  createOrder: (order: Omit<ServiceOrder, 'id' | 'createdAt' | 'status'>) => void;
  addSchedule: (title: string, file: File) => Promise<void>;
  completeOrder: (id: string, notes: string, evidenceFile: File) => Promise<void>;
}

const OmniContext = createContext<OmniContextType | undefined>(undefined);

export const OmniProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // HYDRATION GUARD
  const [isMounted, setIsMounted] = useState(false);

  // STATE INITIALIZATION (Use Mocks immediately to prevent flicker)
  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<ServiceOrder[]>(MOCK_ORDERS);
  const [schedules, setSchedules] = useState<ScheduleItem[]>(MOCK_SCHEDULES);

  // SAFE STORAGE LOADING
  useEffect(() => {
    setIsMounted(true);
    
    if (typeof window !== 'undefined') {
        // Load User
        const storedUser = localStorage.getItem('omni_user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }

        // Load Orders (Sync with LS or Init LS with Mock)
        const storedOrders = localStorage.getItem('omni_orders');
        if (storedOrders) {
            try {
                setOrders(JSON.parse(storedOrders));
            } catch (e) {
                console.error("Failed to parse orders", e);
            }
        } else {
            // First run: Seed LS with Mocks
            localStorage.setItem('omni_orders', JSON.stringify(MOCK_ORDERS));
        }

        // Load Schedules
        const storedSchedules = localStorage.getItem('omni_schedules');
        if (storedSchedules) {
            try {
                setSchedules(JSON.parse(storedSchedules));
            } catch (e) {
                console.error("Failed to parse schedules", e);
            }
        } else {
            localStorage.setItem('omni_schedules', JSON.stringify(MOCK_SCHEDULES));
        }
    }
  }, []);

  // PERSISTENCE (Sync State -> LocalStorage)
  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
        localStorage.setItem('omni_orders', JSON.stringify(orders));
    }
  }, [orders, isMounted]);

  useEffect(() => {
    if (isMounted && typeof window !== 'undefined') {
        localStorage.setItem('omni_schedules', JSON.stringify(schedules));
    }
  }, [schedules, isMounted]);

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
    if (typeof window !== 'undefined') {
        localStorage.setItem('omni_user', JSON.stringify(newUser));
    }
    return true;
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
        localStorage.removeItem('omni_user');
    }
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

  // PREVENT SERVER RENDER MISMATCH
  if (!isMounted) {
    return null; // Or a loading spinner if preferred
  }

  return (
    <OmniContext.Provider value={{
      user, orders, schedules, isMounted, login, logout, 
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
