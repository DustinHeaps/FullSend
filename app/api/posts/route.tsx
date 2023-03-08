import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: 'Please signin to create a post.' },
      { status: 401 }
    );
  }
  // try {
  const { title } = await request.json();

  //Get User
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email as string },
  });

  //Check title length
  if (title.length > 300) {
    return NextResponse.json(
      { message: 'Please write a shorter post' },
      { status: 403 }
    );
  }

  if (!title.length) {
    return NextResponse.json(
      { message: 'Please write something before we can post it.' },
      { status: 403 }
    );
  }

  //Create Post
  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        userId: user?.id as string,
      },
    });

    return NextResponse.json({ data: newPost }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { err: 'Error has occured while making a post' },
      { status: 403 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const data = await prisma.post.findMany({
      include: {
        user: true,
        Comment: true,
        //   hearts: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    NextResponse.json(
      { err: 'Error has occured while getting posts' },
      { status: 403 }
    );
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { err: 'You must be signed in to delete a post' },
      { status: 403 }
    );
  }

  const { id } = await request.json();

  try {
    const result = await prisma.post.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    NextResponse.json(
      { err: 'Error has occured while deleting this post' },
      { status: 403 }
    );
  }
}
