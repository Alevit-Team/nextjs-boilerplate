import { EmailVerificationInstructions } from '@/auth/nextjs/components/email-verification-instructions';

export default function VerifyEmailPage() {
  return (
    <section className='flex h-full w-full items-center justify-center'>
      <div className='w-full max-w-md px-4'>
        <EmailVerificationInstructions />
      </div>
    </section>
  );
}
