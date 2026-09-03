import { create } from 'zustand';

export type ClassroomMacroStatus = 'NORMAL' | 'INFLATION';
export type TeacherPolicyType =
  | 'CURRENCY_DECREASE'
  | 'TAX_INCREASE'
  | 'CONSUMPTION_LIMIT';

interface TeacherState {
  status: ClassroomMacroStatus;
  selectedPolicy: TeacherPolicyType;
  isPolicyApplied: boolean;
  setStatus: (status: ClassroomMacroStatus) => void;
  toggleStatus: () => void;
  setSelectedPolicy: (policy: TeacherPolicyType) => void;
  applyPolicy: () => void;
  resetPolicy: () => void;
}

export const useTeacherStore = create<TeacherState>((set) => ({
  status: 'NORMAL',
  selectedPolicy: 'TAX_INCREASE',
  isPolicyApplied: false,
  setStatus: (status) => set({ status }),
  toggleStatus: () =>
    set((state) => ({
      status: state.status === 'NORMAL' ? 'INFLATION' : 'NORMAL',
    })),
  setSelectedPolicy: (policy) => set({ selectedPolicy: policy }),
  applyPolicy: () =>
    set({
      isPolicyApplied: true,
      status: 'NORMAL',
    }),
  resetPolicy: () =>
    set({
      isPolicyApplied: false,
      status: 'INFLATION',
    }),
}));
