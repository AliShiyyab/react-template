import { useState } from 'react';
import { Settings, Mail, Shield, Server } from 'lucide-react';
import { GeneralConfigForm } from '@/components/config/GeneralConfigForm';
import { EmailConfigForm } from '@/components/config/EmailConfigForm';
import { SecurityConfigForm } from '@/components/config/SecurityConfigForm';
import { SystemConfigForm } from '@/components/config/SystemConfigForm';
import type { GeneralConfig, EmailConfig, SecurityConfig, SystemConfig } from '@/types/config';

type ConfigTab = 'general' | 'email' | 'security' | 'system';

export default function Configurations() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('general');

  const [generalConfig, setGeneralConfig] = useState<GeneralConfig>({
    siteName: 'Admin Dashboard',
    siteUrl: 'https://admin.example.com',
    adminEmail: 'admin@example.com',
    timezone: 'America/New_York',
    language: 'en',
  });

  const [emailConfig, setEmailConfig] = useState<EmailConfig>({
    smtpHost: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: 'noreply@example.com',
    smtpPassword: '',
    smtpEncryption: 'tls',
    fromEmail: 'noreply@example.com',
    fromName: 'Admin Dashboard',
  });

  const [securityConfig, setSecurityConfig] = useState<SecurityConfig>({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireLowercase: true,
    passwordRequireNumbers: true,
    passwordRequireSpecialChars: false,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorEnabled: false,
  });

  const [systemConfig, setSystemConfig] = useState<SystemConfig>({
    maintenanceMode: false,
    debugMode: false,
    cacheEnabled: true,
    loggingLevel: 'info',
    backupFrequency: 'daily',
    maxFileUploadSize: 10,
  });

  const handleGeneralSubmit = (values: GeneralConfig) => {
    setGeneralConfig(values);
    alert('General settings saved successfully!');
  };

  const handleEmailSubmit = (values: EmailConfig) => {
    setEmailConfig(values);
    alert('Email settings saved successfully!');
  };

  const handleSecuritySubmit = (values: SecurityConfig) => {
    setSecurityConfig(values);
    alert('Security settings saved successfully!');
  };

  const handleSystemSubmit = (values: SystemConfig) => {
    setSystemConfig(values);
    alert('System settings saved successfully!');
  };

  const tabs = [
    { id: 'general' as ConfigTab, label: 'General', icon: Settings },
    { id: 'email' as ConfigTab, label: 'Email', icon: Mail },
    { id: 'security' as ConfigTab, label: 'Security', icon: Shield },
    { id: 'system' as ConfigTab, label: 'System', icon: Server },
  ];

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white via-orange-100 to-white animate-gradient bg-clip-text text-transparent">
            System Configurations
          </h1>
          <p style={{ color: '#ff8e47' }}>Manage your application settings and preferences</p>
        </div>

        {/* Tabs */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-1 mb-6 overflow-x-auto">
          <div className="flex gap-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'shadow-lg'
                      : 'bg-transparent hover:bg-gray-800'
                  }`}
                  style={
                    activeTab === tab.id
                      ? { backgroundColor: '#ff6200', color: 'black' }
                      : { color: '#fff5ee' }
                  }
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-gradient-to-br from-black via-gray-900 to-black border border-gray-800 rounded-lg p-6 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300">
          {activeTab === 'general' && (
            <GeneralConfigForm
              initialValues={generalConfig}
              onSubmit={handleGeneralSubmit}
            />
          )}

          {activeTab === 'email' && (
            <EmailConfigForm
              initialValues={emailConfig}
              onSubmit={handleEmailSubmit}
            />
          )}

          {activeTab === 'security' && (
            <SecurityConfigForm
              initialValues={securityConfig}
              onSubmit={handleSecuritySubmit}
            />
          )}

          {activeTab === 'system' && (
            <SystemConfigForm
              initialValues={systemConfig}
              onSubmit={handleSystemSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
