import { EmailVerificationForm } from '@/auth/nextjs/components/forms/email-verification-form';
import { IconBadge } from '@/components';
import { MailIcon } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center gap-6 py-8'>
      <IconBadge>
        <MailIcon />
      </IconBadge>
      <div className='w-full max-w-sm px-4'>
        <EmailVerificationForm />
      </div>
    </section>
  );
}
