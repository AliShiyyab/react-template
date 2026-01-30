import { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { NotificationCard } from '@/components/notifications/NotificationCard';
import { NotificationFiltersComponent } from '@/components/notifications/NotificationFilters';
import type { Notification, NotificationFilters } from '@/types/notification';

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'User Created Successfully',
      message: 'New user "john.doe" has been added to the system.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      isRead: false,
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Memory Usage',
      message: 'System memory usage has reached 85%. Consider optimizing your application.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      isRead: false,
    },
    {
      id: '3',
      type: 'error',
      title: 'Failed Login Attempt',
      message: 'Multiple failed login attempts detected from IP 192.168.1.100.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      isRead: true,
    },
    {
      id: '4',
      type: 'info',
      title: 'System Update Available',
      message: 'A new version of the application is available. Please update at your earliest convenience.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      isRead: true,
    },
    {
      id: '5',
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup completed successfully. All data has been secured.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
      isRead: true,
    },
    {
      id: '6',
      type: 'warning',
      title: 'SSL Certificate Expiring',
      message: 'Your SSL certificate will expire in 30 days. Please renew it to avoid service disruption.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      isRead: false,
    },
  ]);

  const [filters, setFilters] = useState<NotificationFilters>({
    type: 'all',
    status: 'all',
  });

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, isRead: true } : notif))
    );
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this notification?')) {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, isRead: true })));
  };

  const handleDeleteAll = () => {
    if (confirm('Are you sure you want to delete all notifications?')) {
      setNotifications([]);
    }
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (filters.type !== 'all' && notif.type !== filters.type) return false;
    if (filters.status === 'read' && !notif.isRead) return false;
    if (filters.status === 'unread' && notif.isRead) return false;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Bell className="w-8 h-8" style={{ color: '#ff6200' }} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-orange-100 to-white animate-gradient bg-clip-text text-transparent">
                Notifications
              </h1>
            </div>
            {unreadCount > 0 && (
              <span className="px-4 py-2 text-lg font-semibold rounded-full" style={{ backgroundColor: '#ff6200', color: 'black' }}>
                {unreadCount} New
              </span>
            )}
          </div>
          <p style={{ color: '#ff8e47' }}>Stay updated with system events and activities</p>
        </div>

        <NotificationFiltersComponent filters={filters} onChange={setFilters} />

        {notifications.length > 0 && (
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#ffc39a', color: 'black' }}
            >
              <CheckCheck className="w-4 h-4" />
              Mark All as Read
            </button>
            <button
              onClick={handleDeleteAll}
              disabled={notifications.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              Delete All
            </button>
          </div>
        )}

        {filteredNotifications.length === 0 ? (
          <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-12 text-center">
            <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: '#ff6200' }} />
            <h3 className="text-xl font-semibold mb-2 text-white">No Notifications</h3>
            <p style={{ color: '#ff8e47' }}>You're all caught up! No notifications to display.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
