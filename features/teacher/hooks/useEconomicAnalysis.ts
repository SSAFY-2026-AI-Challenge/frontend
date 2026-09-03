import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEconomicAnalysis,
  getLatestEconomicAnalysis,
  getPolicyProposals,
} from '../api';

export function useLatestEconomicAnalysis(classroomId: string = 'cls_001') {
  return useQuery({
    queryKey: ['economic-analysis-latest', classroomId],
    queryFn: () => getLatestEconomicAnalysis(classroomId),
    retry: false,
  });
}

export function useCreateEconomicAnalysis(classroomId: string = 'cls_001') {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createEconomicAnalysis(classroomId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['economic-analysis-latest', classroomId],
      });
      queryClient.invalidateQueries({
        queryKey: ['classroom-dashboard', classroomId],
      });
    },
  });
}

export function usePolicyProposals(classroomId: string = 'cls_001') {
  return useQuery({
    queryKey: ['policy-proposals', classroomId],
    queryFn: () => getPolicyProposals(classroomId),
    retry: false,
  });
}
