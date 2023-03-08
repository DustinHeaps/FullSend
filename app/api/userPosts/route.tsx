import prisma from '../../../prisma/client';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const session = await getServerSession(
    authOptions
  );
  if (!session) {
    return NextResponse.json(
      { message: 'Please signin to get your posts.' },
      { status: 401 }
    );
  }

  try {
    const data = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        Post: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            Comment: true,
          },
        },
      },
    });
    return NextResponse.json(data , { status: 200 });
   } catch (err) {
      NextResponse.json({ err: "Error has occured while getting your posts"} , { status: 403 })
    }
}
