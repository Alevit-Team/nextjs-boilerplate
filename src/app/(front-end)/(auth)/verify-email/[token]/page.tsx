import Link from 'next/link';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import { Button, IconBadge, Section, Container } from '@/components';
import { Body, Headline } from '@/components/ui/typography';
import { verifyEmail } from '@/auth/nextjs/actions';
import { getFormErrorMessage } from '@/lib/get-form-error-message';

interface VerifyEmailTokenPageProps {
  params: { token: string };
}

export default async function VerifyEmailTokenPage({
  params,
}: VerifyEmailTokenPageProps) {
  const { token } = params;

  const result = await verifyEmail(token);

  const content = {
    success: {
      title: 'Email verified',
      description: 'Your email address has been successfully verified.',
      button: {
        text: 'Back to sign in',
        link: '/sign-in',
      },
    },
    error: {
      title: 'Verification failed',
      description: 'Unknown error',
      button: {
        text: 'Back to email verification',
        link: '/verify-email',
      },
    },
  };

  const isSuccess = result.ok;
  const errorDescription =
    !isSuccess && result.errorCode
      ? getFormErrorMessage(result.errorCode)
      : content.error.description;
  const view = isSuccess
    ? content.success
    : { ...content.error, description: errorDescription };

  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        <div className='space-y-8 text-center'>
          <IconBadge>
            {isSuccess ? <CheckCircleIcon /> : <XCircleIcon />}
          </IconBadge>
          <Headline>{view.title}</Headline>
          <Body color='muted-foreground'>{view.description}</Body>
          <Button asChild className='w-full'>
            <Link href={view.button.link}>{view.button.text}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
