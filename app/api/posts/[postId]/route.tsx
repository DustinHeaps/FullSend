import { NextResponse } from 'next/server';
import prisma from '@/prisma/client';


type Props = {
  postId: string;
}
export async function GET(request: Request, {params}: {params: Props}) {

  const {postId} = params

  try {
    const data = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      include: {
        user: true,
        Comment: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    NextResponse.json(
      { err: 'Error has occured while deleting this post' },
      { status: 403 }
    );
  }
}
