import { useState } from 'react';
import { User, Lock, Calendar, Shield, Activity } from 'lucide-react';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { PasswordChangeForm } from '@/components/profile/PasswordChangeForm';
import type { UserProfile, ProfileFormValues, PasswordChangeValues } from '@/types/userProfile';

export default function UserProfilePage() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    phone: '+1 (555) 123-4567',
    bio: 'System administrator with full access to all features and settings.',
    role: 'Administrator',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: new Date().toISOString(),
  });

  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

  const handleProfileSubmit = (values: ProfileFormValues) => {
    setProfile((prev) => ({ ...prev, ...values }));
    alert('Profile updated successfully!');
  };

  const handlePasswordSubmit = (_values: PasswordChangeValues) => {
    alert('Password changed successfully!');
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-orange-100 to-white animate-gradient bg-clip-text text-transparent">
            User Profile
          </h1>
          <p style={{ color: '#ff8e47' }}>Manage your account settings and preferences</p>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-6 mb-6 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ff6200' }}>
              <User className="w-12 h-12 text-black" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {profile.firstName} {profile.lastName}
                </h2>
                <span className="px-3 py-1 text-sm font-semibold rounded-full" style={{ backgroundColor: '#ff6200', color: 'black' }}>
                  {profile.role}
                </span>
              </div>
              <p className="mb-4" style={{ color: '#ff8e47' }}>
                @{profile.username}
              </p>
              {profile.bio && (
                <p className="text-sm mb-4" style={{ color: '#fff5ee' }}>
                  {profile.bio}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: '#ff6200' }} />
                  <div>
                    <div className="text-xs" style={{ color: '#fff5ee' }}>
                      Joined
                    </div>
                    <div className="text-white">{new Date(profile.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" style={{ color: '#ff6200' }} />
                  <div>
                    <div className="text-xs" style={{ color: '#fff5ee' }}>
                      Last Login
                    </div>
                    <div className="text-white">{new Date(profile.lastLogin).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" style={{ color: '#ff6200' }} />
                  <div>
                    <div className="text-xs" style={{ color: '#fff5ee' }}>
                      Status
                    </div>
                    <div className="text-green-500 font-semibold">Active</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-1 mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex-1 ${
                activeTab === 'profile' ? 'shadow-lg' : 'bg-transparent hover:bg-gray-800'
              }`}
              style={
                activeTab === 'profile'
                  ? { backgroundColor: '#ff6200', color: 'black' }
                  : { color: '#fff5ee' }
              }
            >
              <User className="w-5 h-5" />
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex-1 ${
                activeTab === 'password' ? 'shadow-lg' : 'bg-transparent hover:bg-gray-800'
              }`}
              style={
                activeTab === 'password'
                  ? { backgroundColor: '#ff6200', color: 'black' }
                  : { color: '#fff5ee' }
              }
            >
              <Lock className="w-5 h-5" />
              Change Password
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
          {activeTab === 'profile' && (
            <ProfileForm
              initialValues={{
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                phone: profile.phone,
                bio: profile.bio || '',
              }}
              onSubmit={handleProfileSubmit}
            />
          )}

          {activeTab === 'password' && (
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2" style={{ color: '#ff6200' }}>
                  Change Your Password
                </h3>
                <p className="text-sm" style={{ color: '#ff8e47' }}>
                  Password must be at least 8 characters and include uppercase, lowercase, and numbers.
                </p>
              </div>
              <PasswordChangeForm onSubmit={handlePasswordSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
