import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Link from 'next/link';
import Login from '../auth/Login';
import Logout from '../auth/Logout';

export default async function Nav() {
  const session = await getServerSession(authOptions);

  return (
    <nav className='flex justify-between items-center py-8 '>
      <Link href={'/'}>
        <h1 className='font-bold text-lg'>FullSend.</h1>
      </Link>
      <ul className='flex items-center gap-6'></ul>

      {!session?.user && <Login />}
      {session?.user && <Logout image={session.user.image || ''} />}
    </nav>
  );
}
