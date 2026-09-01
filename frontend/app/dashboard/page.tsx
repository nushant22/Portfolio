'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      case 'editor':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'viewer':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Welcome, {user.full_name || user.username}!
                </h1>
                <p className="text-gray-400">Manage your account and access role-based features</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold border uppercase ${getRoleBadgeColor(user.role)}`}>
                {user.role}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Email</p>
                <p className="text-white font-medium">{user.email}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Username</p>
                <p className="text-white font-medium">{user.username}</p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Account Status</p>
                <p className="text-white font-medium">
                  {user.is_active ? (
                    <span className="text-green-400">✓ Active</span>
                  ) : (
                    <span className="text-red-400">✗ Inactive</span>
                  )}
                </p>
              </div>
              <div className="bg-gray-900 p-6 rounded-lg border border-gray-700">
                <p className="text-gray-400 text-sm mb-1">Member Since</p>
                <p className="text-white font-medium">
                  {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a
                href="/"
                className="bg-gray-900 hover:bg-gray-700 p-6 rounded-lg border border-gray-700 transition text-center group"
              >
                <div className="text-4xl mb-3">🏠</div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition">
                  Home
                </h3>
                <p className="text-gray-400 text-sm">Back to portfolio</p>
              </a>

              {(user.role === 'admin' || user.role === 'editor') && (
                <a
                  href="/dashboard/users"
                  className="bg-gray-900 hover:bg-gray-700 p-6 rounded-lg border border-gray-700 transition text-center group"
                >
                  <div className="text-4xl mb-3">👥</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-blue-400 transition">
                    Manage Users
                  </h3>
                  <p className="text-gray-400 text-sm">View and manage users</p>
                </a>
              )}

              {user.role === 'admin' && (
                <a
                  href="/dashboard/admin"
                  className="bg-gray-900 hover:bg-red-900/30 p-6 rounded-lg border border-red-700/50 transition text-center group"
                >
                  <div className="text-4xl mb-3">⚙️</div>
                  <h3 className="text-white font-semibold mb-2 group-hover:text-red-400 transition">
                    Admin Panel
                  </h3>
                  <p className="text-gray-400 text-sm">Full system control</p>
                </a>
              )}
            </div>
          </div>

          {/* Role Permissions */}
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Your Permissions</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-green-400">
                <span className="text-xl">✓</span>
                <span>View portfolio content</span>
              </div>
              {(user.role === 'editor' || user.role === 'admin') && (
                <>
                  <div className="flex items-center gap-3 text-green-400">
                    <span className="text-xl">✓</span>
                    <span>View user list</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400">
                    <span className="text-xl">✓</span>
                    <span>Edit content</span>
                  </div>
                </>
              )}
              {user.role === 'admin' && (
                <>
                  <div className="flex items-center gap-3 text-green-400">
                    <span className="text-xl">✓</span>
                    <span>Manage all users</span>
                  </div>
                  <div className="flex items-center gap-3 text-green-400">
                    <span className="text-xl">✓</span>
                    <span>Full administrative access</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
