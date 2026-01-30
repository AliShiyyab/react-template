export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  bio?: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

export interface PasswordChangeValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
