import { EmailVerificationForm } from '@/auth/nextjs/components/forms/email-verification-form';
import { Container, Section } from '@/components';

export default function VerifyEmailPage() {
  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        <EmailVerificationForm />
      </Container>
    </Section>
  );
}
