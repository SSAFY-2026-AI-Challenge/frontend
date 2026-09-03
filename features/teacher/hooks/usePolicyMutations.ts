import { useMutation, useQueryClient } from '@tanstack/react-query';
import { applyPolicy, simulatePolicy } from '../api';
import type { ApplyPolicyRequest, PolicySimulationRequest } from '../types';

export function usePolicySimulation(classroomId: string = 'cls_001') {
  return useMutation({
    mutationFn: (request: PolicySimulationRequest) =>
      simulatePolicy(classroomId, request),
  });
}

export function useApplyPolicy(classroomId: string = 'cls_001') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: ApplyPolicyRequest) =>
      applyPolicy(classroomId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['classroom-dashboard', classroomId],
      });
    },
  });
}
