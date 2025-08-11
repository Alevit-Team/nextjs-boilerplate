import { ForgotPasswordForm } from '@/auth/nextjs/components/forgot-password-form';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <section className='flex h-full w-full items-center justify-center'>
      <div className='w-full max-w-sm px-4'>
        <h1 className='mb-8 text-center text-2xl font-bold'>Forgot Password</h1>
        <p className='text-muted-foreground mb-8 text-center text-sm'>
          Enter your email to reset your password
        </p>
        <ForgotPasswordForm />
        <div className='mt-4 flex justify-center'>
          <Link
            href='/sign-in'
            className='text-muted-foreground inline-flex items-center gap-2 text-sm'
          >
            <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
