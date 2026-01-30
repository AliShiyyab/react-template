import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Menu, X, LayoutDashboard, MapPin, Settings, Bell, User, LogOut, ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/login');
  };

  return (
    <div className="dark min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
        >
          <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between border-b border-border px-6">
              <h1 className="text-xl font-bold text-white">App</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white hover:opacity-80"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
              {/* Main */}
              <div className="mb-6">
                <h2 className="mb-2 px-3 text-xs font-semibold text-white uppercase tracking-wider">
                  Main
                </h2>
                <Link
                  to="/app"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-accent hover:text-white transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
              </div>

              {/* Administration */}
              <div className="mb-6">
                <h2 className="mb-2 px-3 text-xs font-semibold text-white uppercase tracking-wider">
                  Administration
                </h2>
                <Link
                  to="/app/admin/users"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-accent hover:text-white transition-colors"
                >
                  <Users className="h-5 w-5" />
                  Admin Users
                </Link>
                <Link
                  to="/app/admin/roles"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-accent hover:text-white transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  Admin Roles
                </Link>
                <Link
                  to="/app/admin/configurations"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-accent hover:text-white transition-colors"
                >
                  <Settings className="h-5 w-5" />
                  Configurations
                </Link>
              </div>

              {/* Users */}
              <div className="mb-6">
                <h2 className="mb-2 px-3 text-xs font-semibold text-white uppercase tracking-wider">
                  Locations
                </h2>
                <Link
                  to="/app/locations"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-accent hover:text-white transition-colors"
                >
                  <MapPin className="h-5 w-5" />
                  Locations
                </Link>
                <Link
                  to="/app/notifications"
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-white hover:bg-accent hover:text-white transition-colors"
                >
                  <Bell className="h-5 w-5" />
                  Notifications
                </Link>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header */}
          <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white hover:opacity-80"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex-1" />
            
            {/* User Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                  JD
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-white">John Doe</div>
                  <div className="text-xs" style={{ color: '#ff8e47' }}>john.doe@example.com</div>
                </div>
                <ChevronDown className="h-4 w-4 text-white" />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-card shadow-lg z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-border">
                      <div className="text-sm font-medium" style={{ color: '#ff6200' }}>John Doe</div>
                      <div className="text-xs" style={{ color: '#ff8e47' }}>john.doe@example.com</div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                      <Link
                        to="/app/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        style={{ color: '#ff6200' }}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-accent transition-colors"
                        style={{ color: '#ff6200' }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto bg-background p-6">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
