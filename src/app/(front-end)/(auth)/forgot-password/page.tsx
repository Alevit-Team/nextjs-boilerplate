import { ForgotPasswordForm } from '@/auth/nextjs/components/forms/forgot-password-form';
import { Container, Section } from '@/components';

export default function ForgotPasswordPage() {
  return (
    <Section>
      <Container className='max-w-md'>
        <ForgotPasswordForm />
      </Container>
    </Section>
  );
}
