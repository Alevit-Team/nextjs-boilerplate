import { SignUpForm } from '@/auth/nextjs/components/signup-form';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <section className='flex h-screen w-full items-center justify-center'>
      <div className='w-full max-w-xs px-4'>
        <h1 className='mb-8 text-center text-2xl font-bold'>Sign Up</h1>
        <p className='text-muted-foreground mb-8 text-center text-sm'>
          Create an account to get started
        </p>
        <SignUpForm />
      </div>
    </section>
  );
}
