'use client';

import { useState, useEffect } from 'react';
import { useRequireAuth } from '@/hooks/useRequireAuth';
import { api, User } from '@/lib/api';
import Link from 'next/link';

export default function UsersPage() {
  const { user: currentUser, loading: authLoading } = useRequireAuth({
    roles: ['admin', 'editor'],
    redirectTo: '/login',
  });

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && currentUser) {
      loadUsers();
    }
  }, [authLoading, currentUser]);

  const loadUsers = async () => {
    try {
      setError('');
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId: number) => {
    if (!confirm('Are you sure you want to deactivate this user?')) return;

    try {
      await api.deactivateUser(userId);
      loadUsers();
    } catch (err) {
      alert('Failed to deactivate user');
      console.error(err);
    }
  };

  const handleActivate = async (userId: number) => {
    try {
      await api.activateUser(userId);
      loadUsers();
    } catch (err) {
      alert('Failed to activate user');
      console.error(err);
    }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      await api.deleteUser(userId);
      loadUsers();
    } catch (err) {
      alert('Failed to delete user');
      console.error(err);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
            <p className="text-gray-400">View and manage all users</p>
          </div>
          <Link
            href="/dashboard"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl border border-gray-700 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">User</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Joined</th>
                  {currentUser?.role === 'admin' && (
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-700/50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium">{user.username}</p>
                        {user.full_name && (
                          <p className="text-gray-400 text-sm">{user.full_name}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {user.is_active ? (
                        <span className="text-green-400">● Active</span>
                      ) : (
                        <span className="text-red-400">● Inactive</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-300 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    {currentUser?.role === 'admin' && (
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {user.id !== currentUser.id && (
                            <>
                              {user.is_active ? (
                                <button
                                  onClick={() => handleDeactivate(user.id)}
                                  className="px-3 py-1 text-xs bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded border border-yellow-600/50 transition"
                                >
                                  Deactivate
                                </button>
                              ) : (
                                <button
                                  onClick={() => handleActivate(user.id)}
                                  className="px-3 py-1 text-xs bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded border border-green-600/50 transition"
                                >
                                  Activate
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="px-3 py-1 text-xs bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded border border-red-600/50 transition"
                              >
                                Delete
                              </button>
                            </>
                          )}
                          {user.id === currentUser.id && (
                            <span className="text-gray-500 text-xs italic">Current user</span>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No users found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
