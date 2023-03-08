'use client';

import { useState } from 'react';
import { useAddComment } from '../hooks/comments';

type PostProps = {
  id?: string;
};

export default function AddComment({ id }: PostProps) {
  const [message, setMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const { mutate } = useAddComment();

  const submitPost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(
      { message, postId: id },
      {
        onSuccess: () => {
          setMessage('');
          setIsDisabled(false);
        },
        onError: () => {
          setIsDisabled(false);
        },
      }
    );
  };

  return (
    <form onSubmit={submitPost} className='my-8'>
      <h3 className='text-xl'>Add a comment</h3>

      <div className='flex flex-col my-2'>
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          type='text'
          name='message'
          className='p-4 text-lg rounded-md my-2'
        />
      </div>
      <div className='flex items-center gap-2'>
        <button
          disabled={isDisabled}
          className=' text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25'
          type='submit'
        >
          Add Comment 🚀
        </button>
        <p
          className={`font-bold  ${
            message.length > 300 ? 'text-red-700' : 'text-gray-700'
          } `}
        >{`${message.length}/300`}</p>
      </div>
    </form>
  );
}
