import { SignUpForm } from '@/auth/nextjs/components/signup-form';
import { SocialLogin } from '@/auth/nextjs/components/social-login';
import { FormHeader, Separator } from '@/components';

export default function SignUpPage() {
  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center py-8'>
      <div className='w-full max-w-sm px-4'>
        <FormHeader
          title='Sign up'
          description='Create an account to get started'
        />
        <SignUpForm />
        <Separator label='Or continue with' className='my-6' />
        <SocialLogin />
      </div>
    </section>
  );
}
