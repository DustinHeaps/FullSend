'use client';

import Image from 'next/image';
import { Inter } from 'next/font/google';

import CreatePost from './components/CreatePost';
import { useGetAllPosts } from './hooks/posts';
import Post from './components/Post';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { data, error, isLoading } = useGetAllPosts();
  if (error) return error;
  if (isLoading) return 'Loading.....';

  return (
    <main>
      <CreatePost />
      {data?.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          name={post.user.name}
          avatar={post.user.image}
          title={post.title}
          comments={post.Comment}
        />
      ))}
    </main>
  );
}
