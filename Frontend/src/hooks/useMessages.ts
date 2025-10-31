import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';

// export const useMessages = (chatId?: string | number | null) => {
//   const queryClient = useQueryClient();

//   const messagesQuery = useQuery({
//     queryKey: ['messages', chatId],
//     queryFn: async () => {
//       const { data } = await axiosInstance.get(`/messages/${chatId}/`);
//       return data;
//     },
//     enabled: !!chatId, // don't run if chatId is null
//   });

//   const sendMessage = useMutation({
//     mutationFn: async (payload: { text: string; recipient: number }) => {
//       const { data } = await axiosInstance.post('/messages/', payload);
//       return data;
//     },
//     onSuccess: () => {
//       if (chatId) {
//         queryClient.invalidateQueries({ queryKey: ['messages', chatId] });
//       }
//       queryClient.invalidateQueries({ queryKey: ['messageList'] });
//     },
//   });

//   return { ...messagesQuery, sendMessage };
// };


export const useMessages = (userId?: string | number | null) => {
    const queryClient = useQueryClient();
  
    const messagesQuery = useQuery({
      queryKey: ["messages", userId],
      queryFn: async () => {
        const res = await axiosInstance.get(`/messages/conversation/${userId}/`);
        return res.data;
      },
      enabled: !!userId,
    });
  
    const sendMessage = useMutation({
      mutationFn: async (payload: { content: string; receiver: number }) => {
        const res = await axiosInstance.post("/messages/", payload);
        return res.data;
      },
      onSuccess: () => {
        if (userId)
          queryClient.invalidateQueries({ queryKey: ["messages", userId] });
      },
    });
  
    return { ...messagesQuery, sendMessage };
  };
  




