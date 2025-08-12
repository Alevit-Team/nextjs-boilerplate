import { ResetPasswordForm } from '@/auth/nextjs/components/reset-password-form';
import { tokenService } from '@/lib/token-service';
import { Card } from '@/components';
import { XCircleIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface ResetPasswordTokenPageProps {
  params: { token: string };
}

export default async function ResetPasswordTokenPage({
  params,
}: ResetPasswordTokenPageProps) {
  // Validate the token before showing the form
  const validation = await tokenService.validatePasswordResetToken(
    params.token
  );

  if (!validation.isValid) {
    return (
      <section className='flex h-full w-full items-center justify-center'>
        <div className='w-full max-w-md px-4'>
          <Card className='p-6'>
            <div className='text-center'>
              <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
                <XCircleIcon className='h-8 w-8 text-red-600' />
              </div>

              <h1 className='mb-2 text-2xl font-bold text-red-900'>
                Invalid Reset Link
              </h1>

              <p className='text-muted-foreground mb-6 text-sm'>
                {validation.error === 'EXPIRED'
                  ? 'This password reset link has expired. Please request a new one.'
                  : validation.error === 'ALREADY_USED'
                    ? 'This password reset link has already been used.'
                    : 'This password reset link is invalid or malformed.'}
              </p>

              <div className='mb-6 rounded-lg bg-red-50 p-4'>
                <div className='text-left text-sm'>
                  <p className='font-medium text-red-900'>What you can do:</p>
                  <ul className='mt-2 space-y-1 text-red-700'>
                    <li>• Request a new password reset link</li>
                    <li>• Make sure you're using the latest email</li>
                    <li>• Check that the link hasn't expired (15 minutes)</li>
                  </ul>
                </div>
              </div>

              <div className='space-y-3'>
                <Link
                  href='/forgot-password'
                  className='inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                >
                  Request New Reset Link
                </Link>

                <Link
                  href='/sign-in'
                  className='text-muted-foreground inline-flex w-full items-center justify-center gap-2 text-sm hover:text-gray-900'
                >
                  <ArrowLeftIcon className='h-4 w-4' />
                  Back to Sign In
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className='flex h-full w-full items-center justify-center'>
      <div className='w-full max-w-sm px-4'>
        <h1 className='mb-8 text-center text-2xl font-bold'>Reset Password</h1>
        <p className='text-muted-foreground mb-6 text-center text-sm'>
          Enter your new password below
        </p>
        <ResetPasswordForm token={params.token} />
        <div className='mt-4 flex justify-center'>
          <Link
            href='/sign-in'
            className='text-muted-foreground inline-flex items-center gap-2 text-sm hover:text-gray-900'
          >
            <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
          </Link>
        </div>
      </div>
    </section>
  );
}
