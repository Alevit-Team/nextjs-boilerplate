import { SignInForm } from '@/auth/nextjs/components/signin-form';
import { SocialLogin } from '@/auth/nextjs/components/social-login';
import { Divider } from '@/components';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <section className='flex h-full w-full items-center justify-center'>
      <div className='w-full max-w-sm px-4'>
        <h1 className='mb-8 text-center text-2xl font-bold'>Sign In</h1>
        <p className='text-muted-foreground text-center text-sm'>
          Enter your email and password to sign in
        </p>
        <SignInForm />
        <p className='text-muted-foreground my-5 text-center text-sm'>
          Dont have an account?{' '}
          <Link href='/sign-up' className='text-primary'>
            Sign up
          </Link>
        </p>
        <Divider label='Or continue with' className='my-6' />
        <SocialLogin />
      </div>
    </section>
  );
}
