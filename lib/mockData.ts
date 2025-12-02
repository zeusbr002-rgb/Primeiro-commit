
import { User, UserRole, ServiceOrder, OSStatus, OSPriority, ScheduleItem } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'admin-1', name: 'System Admin', role: UserRole.ADMIN, initials: 'AD' },
  { id: 'u2', name: 'John Doe', role: UserRole.CONTRACTOR, initials: 'JD' },
  { id: 'u3', name: 'Jane Smith', role: UserRole.CONTRACTOR, initials: 'JS' },
];

export const MOCK_ORDERS: ServiceOrder[] = [
  {
    id: 'OS-1001',
    title: 'HVAC Unit 4B - Vibration',
    description: 'Unit is making excessive noise. Check bearings and belt tension.',
    location: 'Building A, Roof',
    priority: OSPriority.HIGH,
    status: OSStatus.OPEN,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OS-1002',
    title: 'Server Room Cooling Failure',
    description: 'AC unit in Server Room B is offline. Temperature rising.',
    location: 'HQ, Floor 2, Server Room B',
    priority: OSPriority.CRITICAL,
    status: OSStatus.IN_PROGRESS,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() + 3600000).toISOString(),
    createdAt: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: 'OS-1003',
    title: 'Lobby Light Replacement',
    description: '3 Recessed lights flickering in the main lobby.',
    location: 'Lobby, Main Entrance',
    priority: OSPriority.LOW,
    status: OSStatus.COMPLETED,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: new Date(Date.now() - 43200000).toISOString(),
    evidenceImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'OS-1004',
    title: 'Security Gate Repair',
    description: 'Gate 3 not responding to badge scan intermittently.',
    location: 'Perimeter Fence, Gate 3',
    priority: OSPriority.MEDIUM,
    status: OSStatus.OPEN,
    assigneeId: null, // Unassigned
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: 'sch-1',
    title: 'Week 42 Shift Plan',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
    uploadedAt: new Date().toISOString(),
    uploadedBy: 'System Admin'
  }
];
