'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function UnauthorizedPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="text-8xl">🚫</div>
        <h1 className="text-4xl font-bold text-white">Access Denied</h1>
        <p className="text-gray-400 text-lg">
          You don't have permission to access this page.
        </p>
        {user && (
          <p className="text-sm text-gray-500">
            Your current role: <span className="text-blue-400 font-medium">{user.role}</span>
          </p>
        )}
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
