import { SignInForm } from '@/auth/nextjs/components/signin-form';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <section>
        <div className='flex gap-4 pb-4'>
          <p className='text-muted-foreground'>Sign In</p>
          <Link href='/sign-up'>Sign Up</Link>
        </div>
        <SignInForm />
      </section>
    </div>
  );
}
