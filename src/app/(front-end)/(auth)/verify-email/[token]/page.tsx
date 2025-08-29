import { verifyEmail } from '@/auth/nextjs/actions';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { Button, IconBadge, FormHeader } from '@/components';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import Link from 'next/link';

interface VerifyEmailTokenPageProps {
  params: Promise<{ token: string }>;
}

export default async function VerifyEmailTokenPage({
  params,
}: VerifyEmailTokenPageProps) {
  // Await the params promise
  const { token } = await params;

  const result = await verifyEmail(token);

  return (
    <section className='flex min-h-full w-full flex-col items-center justify-center py-8'>
      <div className='w-full max-w-md px-4'>
        <div className='flex flex-col items-center justify-center gap-6'>
          {result.ok ? (
            <>
              <IconBadge>
                <CheckCircleIcon />
              </IconBadge>
              <FormHeader title='Email verified'>
                <p className='text-muted-foreground text-sm'>
                  Your email address has been successfully verified.
                  <br />
                  You can now sign in to your account.
                </p>
              </FormHeader>
              <Button asChild className='w-full'>
                <Link href='/sign-in'>Back to sign in</Link>
              </Button>
            </>
          ) : (
            <>
              <IconBadge>
                <XCircleIcon />
              </IconBadge>
              <FormHeader
                title='Verification failed'
                description={getFormErrorMessage(result.errorCode)}
              />
              <Button asChild className='w-full'>
                <Link href='/verify-email'>Back to email verification</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
