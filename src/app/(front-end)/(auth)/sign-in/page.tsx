import { SignInForm } from '@/auth/nextjs/components/forms/signin-form';
import { Container, Section } from '@/components';

export default function SignInPage() {
  return (
    <Section className='flex min-h-screen items-center justify-center'>
      <Container fullWidth className='max-w-sm'>
        <SignInForm />
      </Container>
    </Section>
  );
}
