'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import Link from 'next/link';

export default function AdminPage() {
  const { user, loading } = useRequireAuth({
    roles: ['admin'],
    redirectTo: '/login',
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Complete system control and configuration</p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* System Overview */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-white mb-2">System Overview</h2>
            <p className="text-gray-400 text-sm mb-4">View system statistics and metrics</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Status:</span>
                <span className="text-green-400">● Running</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Uptime:</span>
                <span>99.9%</span>
              </div>
            </div>
          </div>

          {/* User Management */}
          <Link
            href="/dashboard/users"
            className="bg-gray-800 hover:bg-gray-700 rounded-2xl p-6 border border-gray-700 shadow-xl transition group"
          >
            <div className="text-4xl mb-4">👥</div>
            <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition">
              User Management
            </h2>
            <p className="text-gray-400 text-sm">Manage user accounts and permissions</p>
          </Link>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="text-4xl mb-4">🔒</div>
            <h2 className="text-xl font-bold text-white mb-2">Security</h2>
            <p className="text-gray-400 text-sm">Configure security settings and policies</p>
          </div>

          {/* Database */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="text-4xl mb-4">💾</div>
            <h2 className="text-xl font-bold text-white mb-2">Database</h2>
            <p className="text-gray-400 text-sm">Database management and backups</p>
          </div>

          {/* API Settings */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-xl font-bold text-white mb-2">API Settings</h2>
            <p className="text-gray-400 text-sm">Configure API endpoints and rate limits</p>
          </div>

          {/* Logs */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-xl font-bold text-white mb-2">System Logs</h2>
            <p className="text-gray-400 text-sm">View system logs and activity</p>
          </div>
        </div>

        {/* Warning */}
        <div className="mt-8 bg-red-500/10 border border-red-500/50 rounded-lg p-6">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <h3 className="text-red-400 font-semibold mb-2">Administrator Access</h3>
              <p className="text-gray-300 text-sm">
                You have full administrative privileges. Use these features carefully as they can
                affect the entire system. All actions are logged and auditable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
