import { SignInForm } from '@/auth/nextjs/components/forms/signin-form';
import { Container, Section } from '@/components';

export default function SignInPage() {
  return (
    <Section>
      <Container className='max-w-md'>
        <SignInForm />
      </Container>
    </Section>
  );
}
