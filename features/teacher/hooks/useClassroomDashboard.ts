import { useQuery } from '@tanstack/react-query';
import { getClassroomDashboard } from '../api';

export function useClassroomDashboard(classroomId: string = 'cls_001') {
  return useQuery({
    queryKey: ['classroom-dashboard', classroomId],
    queryFn: () => getClassroomDashboard(classroomId),
  });
}
