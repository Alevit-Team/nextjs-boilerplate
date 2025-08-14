import { ForgotPasswordForm } from '@/auth/nextjs/components/forgot-password-form';

export default function ForgotPasswordPage() {
  return (
    <section className='flex min-h-full w-full items-center justify-center py-8'>
      <div className='w-full max-w-sm px-4'>
        <ForgotPasswordForm />
      </div>
    </section>
  );
}
