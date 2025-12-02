
import { User, UserRole, ServiceOrder, OSStatus, OSPriority, ScheduleItem } from '../types';

export const MOCK_USERS: User[] = [
  { id: 'admin-1', name: 'System Admin', role: UserRole.ADMIN, initials: 'AD' },
  { id: 'u2', name: 'John Doe', role: UserRole.CONTRACTOR, initials: 'JD' },
  { id: 'u3', name: 'Jane Smith', role: UserRole.CONTRACTOR, initials: 'JS' },
];

export const MOCK_ORDERS: ServiceOrder[] = [
  {
    id: 'OS-1001',
    title: 'HVAC Unit 4B - Vibration Analysis',
    description: 'Unit is making excessive noise during spin-up cycle. Check bearings and belt tension immediately.',
    location: 'Building A, Roof Access',
    priority: OSPriority.HIGH,
    status: OSStatus.OPEN,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() + 86400000).toISOString(), // +1 Day
    sla: '24h Resolution',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OS-1002',
    title: 'Server Room Cooling Failure',
    description: 'CRITICAL: AC unit in Server Room B is offline. Ambient temperature rising above threshold. Immediate intervention required.',
    location: 'HQ, Floor 2, Server Room B',
    priority: OSPriority.CRITICAL,
    status: OSStatus.IN_PROGRESS,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() + 3600000).toISOString(), // +1 Hour
    sla: '4h Response',
    createdAt: new Date(Date.now() - 7200000).toISOString(), // -2 Hours
  },
  {
    id: 'OS-1003',
    title: 'Lobby Recessed Lighting',
    description: '3 Recessed lights flickering in the main lobby waiting area. Replace with LED equivalents.',
    location: 'Lobby, Main Entrance',
    priority: OSPriority.LOW,
    status: OSStatus.COMPLETED,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    sla: '72h Resolution',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: new Date(Date.now() - 43200000).toISOString(),
    evidenceImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: 'OS-1004',
    title: 'Perimeter Gate 3 Sensor',
    description: 'Gate 3 proximity sensor failing to detect delivery trucks. Recalibrate or replace sensor unit.',
    location: 'Perimeter Fence, North Gate',
    priority: OSPriority.MEDIUM,
    status: OSStatus.OPEN,
    assigneeId: 'u3',
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    sla: '48h Resolution',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OS-1005',
    title: 'Hydraulic Lift Inspection',
    description: 'Monthly preventative maintenance on Freight Elevator #2.',
    location: 'Warehouse Loading Dock',
    priority: OSPriority.MEDIUM,
    status: OSStatus.OPEN,
    assigneeId: null, // Unassigned
    dueDate: new Date(Date.now() + 259200000).toISOString(),
    sla: '1 Week',
    createdAt: new Date().toISOString(),
  }
];

export const MOCK_SCHEDULES: ScheduleItem[] = [
  {
    id: 'sch-1',
    title: 'November Shift Rotation - Week 4',
    imageUrl: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600',
    uploadedAt: new Date().toISOString(),
    uploadedBy: 'System Admin'
  },
  {
    id: 'sch-2',
    title: 'Emergency Contact Protocol',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600',
    uploadedAt: new Date(Date.now() - 86400000).toISOString(),
    uploadedBy: 'System Admin'
  }
];
