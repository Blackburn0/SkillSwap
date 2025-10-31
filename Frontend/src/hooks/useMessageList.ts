import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';

export const useMessageList = () => {
  return useQuery({
    queryKey: ['messageList'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/messages/');
      return data;
    },
  });
};
