import React from 'react';

interface FormHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

const FormHeader = ({
  title,
  description,
  className,
  children,
}: FormHeaderProps) => {
  return (
    <div className={className}>
      <h1 className='mb-8 text-center text-2xl font-bold'>{title}</h1>
      {description && (
        <p className='text-muted-foreground text-center text-sm'>
          {description}
        </p>
      )}
      {children}
    </div>
  );
};

export { FormHeader };
