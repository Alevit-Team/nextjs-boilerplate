import { LogOutButton } from '@/auth/nextjs/components/logout-button';
import { getCurrentUser } from '@/auth/nextjs/current-user';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function HomePage() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  return (
    <div className='container mx-auto flex min-h-[60vh] items-center justify-center p-4'>
      {fullUser == null ? (
        <Card className='w-full max-w-[520px]'>
          <CardHeader>
            <CardTitle className='text-2xl'>Welcome</CardTitle>
            <CardDescription>
              Sign in or create an account to continue.
            </CardDescription>
          </CardHeader>
          <CardFooter className='flex gap-3'>
            <Button asChild>
              <Link href='/sign-in'>Sign In</Link>
            </Button>
            <Button asChild variant='outline'>
              <Link href='/sign-up'>Sign up</Link>
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card className='w-full max-w-[580px]'>
          <CardHeader>
            <CardTitle className='text-2xl'>
              Welcome back, {fullUser.name}
            </CardTitle>
            <CardDescription>Role: {fullUser.role}</CardDescription>
          </CardHeader>
          <CardFooter className='flex flex-wrap gap-3'>
            <Button asChild variant='outline'>
              <Link href='/profile'>Profile</Link>
            </Button>
            {fullUser.role === 'admin' && (
              <Button asChild variant='secondary'>
                <Link href='/admin'>Admin</Link>
              </Button>
            )}
            <LogOutButton />
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
