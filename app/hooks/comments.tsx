import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';

type Comment = {
  postId?: string;
  message: string;
};

export const useAddComment = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (data: Comment) => {
      return axios.post('/api/comments', { data });
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['detail-post']);
        toast.success('Added your comment');
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message);
        }
      },
    }
  );
};
