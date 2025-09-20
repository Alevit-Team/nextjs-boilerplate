import { SignUpForm } from '@/auth/nextjs/components/forms/signup-form';
import { Container, Section } from '@/components';

export default function SignUpPage() {
  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        <SignUpForm />
      </Container>
    </Section>
  );
}
