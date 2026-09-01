const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  username: string;
  password: string;
  full_name?: string;
  role?: 'admin' | 'editor' | 'viewer';
}

export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: 'admin' | 'editor' | 'viewer';
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'An error occurred' }));
    throw new ApiError(response.status, errorData.detail || 'An error occurred');
  }

  return response.json();
}

export const api = {
  // Authentication
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetchApi<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    // Store token
    localStorage.setItem('access_token', response.access_token);
    
    return response;
  },

  async register(data: RegisterData): Promise<User> {
    return fetchApi<User>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getCurrentUser(): Promise<User> {
    return fetchApi<User>('/api/auth/me');
  },

  logout() {
    localStorage.removeItem('access_token');
  },

  // Users
  async getUsers(): Promise<User[]> {
    return fetchApi<User[]>('/api/users/');
  },

  async getUser(userId: number): Promise<User> {
    return fetchApi<User>(`/api/users/${userId}`);
  },

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    return fetchApi<User>(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async deleteUser(userId: number): Promise<{ message: string }> {
    return fetchApi<{ message: string }>(`/api/users/${userId}`, {
      method: 'DELETE',
    });
  },

  async deactivateUser(userId: number): Promise<User> {
    return fetchApi<User>(`/api/users/${userId}/deactivate`, {
      method: 'POST',
    });
  },

  async activateUser(userId: number): Promise<User> {
    return fetchApi<User>(`/api/users/${userId}/activate`, {
      method: 'POST',
    });
  },
};

export { ApiError };
