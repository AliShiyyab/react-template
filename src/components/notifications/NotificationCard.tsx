import { CheckCircle, Info, AlertTriangle, XCircle, Trash2, Eye } from 'lucide-react';
import type { Notification } from '@/types/notification';

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

export function NotificationCard({ notification, onMarkAsRead, onDelete }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBorderColor = () => {
    switch (notification.type) {
      case 'success':
        return 'border-green-500/20';
      case 'warning':
        return 'border-yellow-500/20';
      case 'error':
        return 'border-red-500/20';
      default:
        return 'border-blue-500/20';
    }
  };

  return (
    <div
      className={`bg-gradient-to-br from-black via-gray-900 to-black border ${getBorderColor()} rounded-lg p-4 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 ${
        !notification.isRead ? 'border-l-4' : ''
      }`}
      style={{ borderLeftColor: !notification.isRead ? '#ff6200' : undefined }}
    >
      <div className="flex items-start gap-4">
        <div className="mt-1">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold text-white">{notification.title}</h3>
            {!notification.isRead && (
              <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-500/20 text-orange-500 whitespace-nowrap">
                New
              </span>
            )}
          </div>
          <p className="text-sm mb-2" style={{ color: '#ff8e47' }}>
            {notification.message}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: '#fff5ee' }}>
              {new Date(notification.timestamp).toLocaleString()}
            </span>
            <div className="flex items-center gap-2">
              {!notification.isRead && (
                <button
                  onClick={() => onMarkAsRead(notification.id)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
                  title="Mark as read"
                >
                  <Eye className="w-4 h-4" style={{ color: '#ff6200' }} />
                </button>
              )}
              <button
                onClick={() => onDelete(notification.id)}
                className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
