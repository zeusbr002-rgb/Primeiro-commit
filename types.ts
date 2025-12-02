
export enum UserRole {
  ADMIN = 'ADMIN',
  CONTRACTOR = 'CONTRACTOR',
}

export enum OSStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum OSPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  initials: string;
}

export interface ServiceOrder {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: OSPriority;
  status: OSStatus;
  assigneeId: string | null;
  dueDate: string; // Required for Calendar/Due Date logic
  sla: string;     // Service Level Agreement target (e.g., "4h", "Next Day")
  createdAt: string;
  completedAt?: string;
  evidenceImage?: string; // Base64 string
  notes?: string;
}

export interface ScheduleItem {
  id: string;
  title: string;
  imageUrl: string; // Base64 string
  uploadedAt: string;
  uploadedBy: string;
}

export interface Log {
  id: string;
  osId: string;
  userId: string;
  userName: string;
  action: string;
  timestamp: string;
}
