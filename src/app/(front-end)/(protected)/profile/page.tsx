import { LogOutButton } from '@/auth/nextjs/components/logout-button';
import { getCurrentUser } from '@/auth/nextjs/current-user';
import { Button } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export default async function ProfilePage() {
  const fullUser = await getCurrentUser({ withFullUser: true });

  if (!fullUser) {
    return <div className='container mx-auto p-4'>User not found</div>;
  }

  return (
    <div className='container mx-auto flex min-h-[60vh] items-center justify-center p-4'>
      <Card className='w-full max-w-[640px]'>
        <CardHeader>
          <CardTitle className='text-2xl'>Your Profile</CardTitle>
          <CardDescription>Manage your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid gap-4 sm:grid-cols-2'>
            <div>
              <div className='text-muted-foreground text-xs uppercase'>
                Name
              </div>
              <div className='font-medium'>{fullUser.name}</div>
            </div>
            <div>
              <div className='text-muted-foreground text-xs uppercase'>
                Email
              </div>
              <div className='font-medium break-words'>{fullUser.email}</div>
            </div>
            <div className='sm:col-span-2'>
              <div className='text-muted-foreground text-xs uppercase'>
                Role
              </div>
              <span className='bg-secondary text-secondary-foreground inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium'>
                {fullUser.role}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter className='flex flex-wrap gap-3'>
          <Button asChild variant='outline'>
            <Link href='/'>Home</Link>
          </Button>
          {fullUser.role === 'admin' && (
            <Button asChild variant='secondary'>
              <Link href='/admin'>Admin</Link>
            </Button>
          )}
          <LogOutButton />
        </CardFooter>
      </Card>
    </div>
  );
}
