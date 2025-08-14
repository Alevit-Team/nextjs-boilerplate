import { SignUpForm } from '@/auth/nextjs/components/signup-form';
import { SocialLogin } from '@/auth/nextjs/components/social-login';
import { Divider, FormHeader } from '@/components';

export default function SignUpPage() {
  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center py-8'>
      <div className='w-full max-w-sm px-4'>
        <FormHeader
          title='Sign Up'
          description='Create an account to get started'
        />
        <SignUpForm />
        <Divider label='Or continue with' className='my-6' />
        <SocialLogin />
      </div>
    </section>
  );
}
