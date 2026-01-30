export interface GeneralConfig {
  siteName: string;
  siteUrl: string;
  adminEmail: string;
  timezone: string;
  language: string;
}

export interface EmailConfig {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  smtpEncryption: 'none' | 'ssl' | 'tls';
  fromEmail: string;
  fromName: string;
}

export interface SecurityConfig {
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireLowercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSpecialChars: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorEnabled: boolean;
}

export interface SystemConfig {
  maintenanceMode: boolean;
  debugMode: boolean;
  cacheEnabled: boolean;
  loggingLevel: 'error' | 'warning' | 'info' | 'debug';
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maxFileUploadSize: number;
}

export type ConfigSection = 'general' | 'email' | 'security' | 'system';
