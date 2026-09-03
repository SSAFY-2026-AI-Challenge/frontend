import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AuthUser = {
  id: string;
  name: string;
  role: 'STUDENT' | 'TEACHER';
  job?: string;
  avatar_url?: string;
  class?: string;
};

interface AuthState {
  isAuthenticated: boolean;
  userId: string | null;
  user: AuthUser | null;
  token: string | null;
  login: (userOrId: string | AuthUser, token?: string) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      userId: null,
      user: null,
      token: null,

      login: (userOrId: string | AuthUser, token?: string) => {
        let authUser: AuthUser;

        if (typeof userOrId === 'string') {
          const isTeacher = userOrId.toLowerCase().includes('teacher');
          authUser = {
            id: userOrId,
            name: isTeacher ? '김선생님' : '황건우',
            role: isTeacher ? 'TEACHER' : 'STUDENT',
            job: isTeacher ? '담임교사' : '정리 반장',
            class: '6학년 4반',
          };
        } else {
          authUser = userOrId;
        }

        if (typeof window !== 'undefined' && token) {
          localStorage.setItem('accessToken', token);
        }

        set({
          isAuthenticated: true,
          userId: authUser.id,
          user: authUser,
          token: token || null,
        });
      },

      setUser: (user: AuthUser) =>
        set({
          user,
          userId: user.id,
          isAuthenticated: true,
        }),

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('token');
        }
        set({
          isAuthenticated: false,
          userId: null,
          user: null,
          token: null,
        });
      },
    }),
    {
      name: 'seed-auth-storage',
    }
  )
);
