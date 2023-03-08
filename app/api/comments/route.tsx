import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { message: 'Please signin to post a comment.' },
      { status: 401 }
    );
  }
  //Get User
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  const { data } = await request.json();
  const { message, postId } = data;

  if (!message.length) {
    return NextResponse.json(
      { message: 'Please enter some text.' },
      { status: 401 }
    );
  }
  try { 
    const result = await prisma.comment.create({
      data: {
        message,
        userId: user?.id as string,
        postId,
        },
    });
    return NextResponse.json({ data: result }, { status: 200 });
  } catch (err) {
    NextResponse.json(
      { err: 'Error has occured while making a comment' },
      { status: 403 }
    );
  }
}
