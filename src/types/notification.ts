export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationFilters {
  type: NotificationType | 'all';
  status: 'all' | 'read' | 'unread';
}
