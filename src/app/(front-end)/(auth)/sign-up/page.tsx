import { SignUpForm } from '@/auth/nextjs/components/signup-form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <section>
        <div className='flex gap-4 pb-4'>
          <Link href='/sign-in'>Sign In</Link>
          <p className='text-muted-foreground'>Sign Up</p>
        </div>
        <SignUpForm />
      </section>{' '}
    </div>
  );
}
