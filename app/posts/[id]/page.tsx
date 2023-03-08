'use client';

import Post from '../../components/Post';
import Image from 'next/image';
import { useGetPostById } from '@/app/hooks/posts';
import AddComment from '@/app/components/AddComment';

type URL = {
  params: {
    id: string;
  };
  searchParams: string;
};

export default function PostDetail(url: URL) {
  debugger
  const { data, isLoading } = useGetPostById(url.params.id);
  if (isLoading) return 'Loading';

  return (
    <div>
      <Post
        id={data?.id as string}
        name={data?.user.name as string}
        avatar={data?.user.image as string}
        title={data?.title as string}
        comments={data?.Comment}
      />

      <AddComment id={data?.id} />
      {data?.Comment?.map((comment) => (
        <div
          className='my-6 bg-white p-8 rounded-md'
          key={comment.id}
        >
          <div className='flex items-center gap-2'>
            <Image
              width={24}
              height={24}
              src={comment.user?.image}
              alt='avatar'
            />
            <h3 className='font-bold'>{comment?.user?.name}</h3>
            <h2 className='text-sm'>{comment.createdAt}</h2>
          </div>
          <div className='py-4'>{comment.message}</div>
        </div>
      ))}
    </div>
  );
}
