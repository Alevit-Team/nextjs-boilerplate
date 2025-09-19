import { ResetPasswordForm } from '@/auth/nextjs/components/reset-password-form';
import { tokenService } from '@/lib/services/token-service';
import { Button, FormBadge, FormHeader } from '@/components';
import { AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';

interface ResetPasswordTokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordTokenPage({
  params,
}: ResetPasswordTokenPageProps) {
  const { token } = await params;
  const validation = await tokenService.validatePasswordResetToken(token);

  if (!validation.isValid) {
    return (
      <section className='flex min-h-full w-full flex-col items-center justify-center gap-6 py-8'>
        <FormBadge>
          <AlertCircleIcon />
        </FormBadge>
        <div className='w-full max-w-sm px-4'>
          <FormHeader
            title='Invalid reset link'
            description={`${
              validation.error === 'EXPIRED'
                ? 'This password reset link has expired. Please request a new one.'
                : validation.error === 'ALREADY_USED'
                  ? 'This password reset link has already been used.'
                  : 'This password reset link is invalid or malformed.'
            } Make sure you’re using the correct email and check that the link hasn’t expired.`}
          />
          <div className='mt-8 flex flex-col items-center'>
            <Button asChild className='w-full'>
              <Link href='/forgot-password'>Request new reset link</Link>
            </Button>
            <Link
              href='/sign-in'
              className='text-muted-foreground my-5 inline-flex items-center gap-2 text-sm hover:text-gray-900'
            >
              <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return <ResetPasswordForm token={token} />;
}
