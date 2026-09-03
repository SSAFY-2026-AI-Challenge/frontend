import { apiFetch } from '@/lib/api/fetcher';
import type { AuthUser } from '@/stores/useAuthStore';

export type LoginRequest = {
  loginId: string;
  password?: string;
};

export type LoginResponse = {
  user?: AuthUser;
  accessToken?: string;
  token?: string;
  message?: string;
};

export async function loginApi(request: LoginRequest): Promise<LoginResponse> {
  const payload = {
    loginId: request.loginId,
    password: request.password,
  };

  const response = await apiFetch<LoginResponse>('/api/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (typeof window !== 'undefined' && response) {
    const token = response.accessToken || response.token;
    if (token) {
      localStorage.setItem('accessToken', token);
    }
  }

  return response;
}

export async function logoutApi(): Promise<void> {
  try {
    await apiFetch<void>('/api/v1/auth/logout', {
      method: 'POST',
    });
  } finally {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('token');
    }
  }
}

export async function getMe(): Promise<AuthUser> {
  const res = await apiFetch<{ user?: AuthUser } | AuthUser>('/api/v1/me');
  if ('user' in res && res.user) {
    return res.user;
  }
  return res as AuthUser;
}
