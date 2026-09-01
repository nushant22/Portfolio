'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface UseRequireAuthOptions {
  roles?: string[];
  redirectTo?: string;
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { roles = [], redirectTo = '/login' } = options;
  const { user, loading, hasRole } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      // User is not authenticated
      router.push(redirectTo);
      return;
    }

    if (roles.length > 0 && !hasRole(roles)) {
      // User doesn't have the required role
      router.push('/unauthorized');
    }
  }, [user, loading, hasRole, roles, redirectTo, router]);

  return { user, loading };
}
