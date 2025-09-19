import { SignInForm } from '@/auth/nextjs/components/forms/signin-form';
import { SocialLogin } from '@/auth/nextjs/components/social-login';
import { AccountPrompt, Separator } from '@/components';

export default function SignInPage() {
  return (
    <section className='flex min-h-full w-full items-center justify-center py-8'>
      <div className='w-full max-w-sm px-4'>
        <SignInForm />
        <AccountPrompt
          text="Don't have an account?"
          linkText='Sign up'
          href='/sign-up'
        />
        <Separator label='Or continue with' className='my-6' />
        <SocialLogin />
      </div>
    </section>
  );
}
