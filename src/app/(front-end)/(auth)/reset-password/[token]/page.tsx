import { ResetPasswordForm } from '@/auth/nextjs/components/forms/reset-password-form';
import { tokenService } from '@/lib/services/token-service';
import { Button, IconBadge, Section, Container } from '@/components';
import { AlertCircleIcon, ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Body, Headline } from '@/components/ui/typography';

interface ResetPasswordTokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function ResetPasswordTokenPage({
  params,
}: ResetPasswordTokenPageProps) {
  const { token } = await params;
  const validation = await tokenService.validatePasswordResetToken(token);

  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        {!validation.isValid ? (
          <div className='space-y-8 text-center'>
            <IconBadge>
              <AlertCircleIcon />
            </IconBadge>
            <Headline>Invalid reset link</Headline>
            <Body color='muted-foreground'>
              {validation.error === 'EXPIRED'
                ? 'This password reset link has expired. Please request a new one.'
                : validation.error === 'ALREADY_USED'
                  ? 'This password reset link has already been used.'
                  : 'This password reset link is invalid or malformed.'}{' '}
              Make sure you’re using the correct email and check that the link
              hasn’t expired.
            </Body>
            <div className='space-y-4'>
              <Button asChild className='w-full'>
                <Link href='/forgot-password'>Request new reset link</Link>
              </Button>
              <Button variant='link' asChild>
                <Link href='/sign-in'>
                  <ArrowLeftIcon className='h-4 w-4' /> Back to sign in
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <ResetPasswordForm token={token} />
        )}
      </Container>
    </Section>
  );
}
