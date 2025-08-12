import React from 'react';

interface FormErrorProps {
  label: string;
}

const FormError = ({ label }: FormErrorProps) => {
  return (
    <div className='text-destructive bg-destructive/10 rounded-md p-2 text-center text-sm'>
      {label}
    </div>
  );
};

export { FormError };
