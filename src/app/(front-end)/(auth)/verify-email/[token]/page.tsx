import { verifyEmail } from '@/auth/nextjs/actions';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { Button, IconBadge, Section, Container } from '@/components';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { Body, Headline } from '@/components/ui/typography';

interface VerifyEmailTokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function VerifyEmailTokenPage({
  params,
}: VerifyEmailTokenPageProps) {
  const { token } = await params;

  const result = await verifyEmail(token);

  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        <div className='flex flex-col items-center justify-center gap-6 text-center'>
          {result.ok ? (
            <>
              <IconBadge>
                <CheckCircleIcon />
              </IconBadge>
              <Headline>Email verified</Headline>
              <Body>
                Your email address has been successfully verified.
                <br />
                You can now sign in to your account.
              </Body>
              <Button asChild className='w-full'>
                <Link href='/sign-in'>Back to sign in</Link>
              </Button>
            </>
          ) : (
            <>
              <IconBadge>
                <XCircleIcon />
              </IconBadge>
              <Headline>Verification failed</Headline>
              <Body>{getFormErrorMessage(result.errorCode)}</Body>
              <Button asChild className='w-full'>
                <Link href='/verify-email'>Back to email verification</Link>
              </Button>
            </>
          )}
        </div>
      </Container>
    </Section>
  );
}
