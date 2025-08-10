import { SignInForm } from '@/auth/nextjs/components/signin-form';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <section className='flex h-screen w-full items-center justify-center'>
      <div className='w-full max-w-xs px-4'>
        <h1 className='mb-8 text-center text-2xl font-bold'>Sign In</h1>
        <p className='text-muted-foreground mb-8 text-center text-sm'>
          Enter your email and password to sign in
        </p>
        <SignInForm />
      </div>
    </section>
  );
}
