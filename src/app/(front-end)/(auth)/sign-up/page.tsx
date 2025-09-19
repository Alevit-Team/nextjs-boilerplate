import { SignUpForm } from '@/auth/nextjs/components/forms/signup-form';
import { Container, Section } from '@/components';

export default function SignUpPage() {
  return (
    <Section>
      <Container className='max-w-md'>
        <SignUpForm />
      </Container>
    </Section>
  );
}
