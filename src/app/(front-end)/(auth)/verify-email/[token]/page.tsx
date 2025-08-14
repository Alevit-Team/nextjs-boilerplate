import { verifyEmail } from '@/auth/nextjs/actions';
import { getFormErrorMessage } from '@/lib/get-form-error-message';
import { Card } from '@/components';
import { CheckCircleIcon, XCircleIcon, ArrowLeftIcon } from 'lucide-react';
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
    <section className='flex h-full w-full items-center justify-center'>
      <div className='w-full max-w-md px-4'>
        <Card className='p-6'>
          <div className='text-center'>
            {result.ok ? (
              <>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
                  <CheckCircleIcon className='h-8 w-8 text-green-600' />
                </div>

                <h1 className='mb-2 text-2xl font-bold text-green-900'>
                  Email verified!
                </h1>

                <p className='text-muted-foreground mb-6 text-sm'>
                  Your email address has been successfully verified. You can now
                  sign in to your account.
                </p>

                <div className='mb-6 rounded-lg bg-green-50 p-4'>
                  <p className='text-sm text-green-700'>
                    🎉 Welcome! Your account is now fully activated and ready to
                    use.
                  </p>
                </div>

                <Link
                  href='/sign-in'
                  className='inline-flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none'
                >
                  Continue to sign in
                </Link>
              </>
            ) : (
              <>
                <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100'>
                  <XCircleIcon className='h-8 w-8 text-red-600' />
                </div>

                <h1 className='mb-2 text-2xl font-bold text-red-900'>
                  Verification Failed
                </h1>

                <p className='text-muted-foreground mb-6 text-sm'>
                  {getFormErrorMessage(result.errorCode)}
                </p>

                <div className='mb-6 rounded-lg bg-red-50 p-4'>
                  <div className='text-left text-sm'>
                    <p className='font-medium text-red-900'>What you can do:</p>
                    <ul className='mt-2 space-y-1 text-red-700'>
                      <li>• Request a new verification email</li>
                      <li>• Check if you’re using the latest email</li>
                      <li>• Contact support if the problem persists</li>
                    </ul>
                  </div>
                </div>

                <div className='space-y-3'>
                  <Link
                    href='/verify-email'
                    className='inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none'
                  >
                    Request new verification email
                  </Link>

                  <Link
                    href='/sign-in'
                    className='text-muted-foreground inline-flex w-full items-center justify-center gap-2 text-sm hover:text-gray-900'
                  >
                    <ArrowLeftIcon className='h-4 w-4' />
                    Back to sign in
                  </Link>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
