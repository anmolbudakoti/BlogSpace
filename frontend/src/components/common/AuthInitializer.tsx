import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';

interface AuthInitializerProps {
  children: React.ReactNode;
}

export const AuthInitializer = ({ children }: AuthInitializerProps) => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    // Check if user is authenticated when app loads
    checkAuth();
  }, [checkAuth]);

  return <>{children}</>;
};