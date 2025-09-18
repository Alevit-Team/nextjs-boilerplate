import { SignInForm } from '@/auth/nextjs/components/signin-form';
import { SocialLogin } from '@/auth/nextjs/components/social-login';
import { Button, Separator } from '@/components';
import Link from 'next/link';

export default function SignInPage() {
  return (
    <section className='flex min-h-full w-full items-center justify-center py-8'>
      <div className='w-full max-w-sm px-4'>
        <SignInForm />
        <p className='text-muted-foreground my-5 text-center text-sm'>
          Dont have an account?
          <Button variant='link' asChild>
            <Link href='/sign-up'>Sign up</Link>
          </Button>
        </p>
        <Separator label='Or continue with' className='my-6' />
        <SocialLogin />
      </div>
    </section>
  );
}
