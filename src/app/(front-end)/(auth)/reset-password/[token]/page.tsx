import { ResetPasswordForm } from '@/auth/nextjs/components/forms/reset-password-form';
import { tokenService } from '@/lib/services/token-service';
import { Button, IconBadge, Section, Container } from '@/components';
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
      <Section>
        <Container className='max-w-md'>
          {!validation.isValid ? (
            <div className='space-y-4 text-center'>
              <IconBadge>
                <AlertCircleIcon />
              </IconBadge>
              <h1 className='text-2xl font-bold'>Invalid reset link</h1>
              <p className='text-muted-foreground text-sm'>
                {validation.error === 'EXPIRED'
                  ? 'This password reset link has expired. Please request a new one.'
                  : validation.error === 'ALREADY_USED'
                    ? 'This password reset link has already been used.'
                    : 'This password reset link is invalid or malformed.'}{' '}
                Make sure you’re using the correct email and check that the link
                hasn’t expired.
              </p>
              <div className='space-y-4 text-center'>
                <Button asChild className='w-full'>
                  <Link href='/forgot-password'>Request new reset link</Link>
                </Button>
                <Link
                  href='/sign-in'
                  className='text-muted-foreground inline-flex items-center gap-2 text-sm hover:text-gray-900'
                >
                  <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
                </Link>
              </div>
            </div>
          ) : (
            <ResetPasswordForm token={token} />
          )}
        </Container>
      </Section>
    );
  }
}
