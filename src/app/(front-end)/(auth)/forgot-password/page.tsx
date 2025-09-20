import { ForgotPasswordForm } from '@/auth/nextjs/components/forms/forgot-password-form';
import { Container, Section } from '@/components';

export default function ForgotPasswordPage() {
  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        <ForgotPasswordForm />
      </Container>
    </Section>
  );
}
