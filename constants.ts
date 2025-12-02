
import { User, UserRole, ServiceOrder, OSStatus, OSPriority, Log } from './types';

// Users
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Connor',
    role: UserRole.ADMIN,
    initials: 'SC'
  },
  {
    id: 'u2',
    name: 'John Doe',
    role: UserRole.CONTRACTOR,
    initials: 'JD'
  },
  {
    id: 'u3',
    name: 'Jane Smith',
    role: UserRole.CONTRACTOR,
    initials: 'JS'
  }
];

// Initial Service Orders
export const MOCK_ORDERS: ServiceOrder[] = [
  {
    id: 'OS-2024-001',
    title: 'HVAC Maintenance - Sector 7',
    description: 'Routine inspection of the cooling tower and filter replacement required. Check for leakages in the primary pipe.',
    location: 'Building A, Roof Access',
    priority: OSPriority.HIGH,
    status: OSStatus.OPEN,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: 'OS-2024-002',
    title: 'Network Cabling Repair',
    description: 'Cat6 cable severed in server room B. Splice or replace.',
    location: 'Server Room B, Floor 2',
    priority: OSPriority.CRITICAL,
    status: OSStatus.IN_PROGRESS,
    assigneeId: 'u2',
    dueDate: new Date(Date.now() + 43200000).toISOString(),
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    evidenceImage: 'https://picsum.photos/400/300?random=10'
  },
  {
    id: 'OS-2024-003',
    title: 'General Cleaning',
    description: 'Post-construction cleaning of the new wing lobby.',
    location: 'West Wing Lobby',
    priority: OSPriority.LOW,
    status: OSStatus.COMPLETED,
    assigneeId: 'u3',
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    completedAt: new Date(Date.now() - 43200000).toISOString(),
    evidenceImage: 'https://picsum.photos/400/300?random=11'
  },
    {
    id: 'OS-2024-004',
    title: 'Security Camera Alignment',
    description: 'Camera 4 feeds are blurry. Re-align and focus lens.',
    location: 'Parking Lot C, Light Pole 4',
    priority: OSPriority.MEDIUM,
    status: OSStatus.OPEN,
    assigneeId: null, // Unassigned
    dueDate: new Date(Date.now() + 172800000).toISOString(),
    createdAt: new Date().toISOString(),
  }
];

// Initial Logs
export const MOCK_LOGS: Log[] = [
  {
    id: 'l1',
    osId: 'OS-2024-002',
    userId: 'u1',
    userName: 'Sarah Connor',
    action: 'Created OS',
    timestamp: new Date(Date.now() - 3600000).toISOString()
  },
  {
    id: 'l2',
    osId: 'OS-2024-002',
    userId: 'u2',
    userName: 'John Doe',
    action: 'Started Job',
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];
