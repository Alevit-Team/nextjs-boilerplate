import { EmailVerification } from '@/auth/nextjs/components/email-verification';
import { FormBadge } from '@/components/ui/form-badge';
import { MailIcon } from 'lucide-react';

export default function VerifyEmailPage() {
  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center gap-6 py-8'>
      <FormBadge>
        <MailIcon />
      </FormBadge>
      <div className='w-full max-w-md px-4'>
        <EmailVerification />
      </div>
    </section>
  );
}
