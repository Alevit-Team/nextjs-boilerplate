import React from 'react';

interface FormInfoProps {
  items: string[];
  title?: string;
}

const FormInfo = ({ title, items }: FormInfoProps) => {
  return (
    <div className='bg-muted w-full rounded-lg p-4'>
      <div className='text-left text-sm'>
        {title && <p className='text-info mb-2 font-medium'>{title}</p>}
        <ul className='space-y-1'>
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { FormInfo };
