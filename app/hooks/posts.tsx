import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { PostType } from '../types/Post';
import { UserPostType } from '../types/UserPost';



const allPosts = async () => {
  const response = await axios.get('/api/posts');
  return response.data;
};

export const useGetAllPosts = () => {
  return useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: () => allPosts(),
  });
};

const fetchPost = async (id: string) => {
  const response = await axios.get(`/api/posts/${id}`)
  return response.data
}

export const useGetPostById = (id: string) => {
  return useQuery<PostType>({
    queryKey: ["post"],
    queryFn: () => fetchPost(id),
  });
};


const getPostsByUser = async () => {
  const response = await axios.get('/api/userPosts');
  return response.data;
};

export const useGetPostsByUser = () => {
  return useQuery<UserPostType>({
    queryKey: ['postsByUser'],
    queryFn: () => getPostsByUser(),
  });
};

const addPost = async (title: string) => {
  await axios.post('/api/posts', { title });
};

export const useAddPost = () => {
  const queryClient = useQueryClient();

  return useMutation(addPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post has been made 🔥');
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error?.response?.data.message);
      }
    },
  });
};

const deletePost = async (id: string) => {
  await axios.delete('/api/posts', { data: {id} } );
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postsByUser'] });
      toast.success('Post has been deleted');
    },
    onError: (error) => {
      console.log(error)
    },
  });
};
