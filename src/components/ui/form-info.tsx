import React from 'react';

interface FormInfoProps {
  items: string[];
  title?: string;
}

const FormInfo = ({ title, items }: FormInfoProps) => {
  return (
    <div className='mt-6 rounded-lg bg-gray-50 p-4'>
      <div className='text-left text-sm'>
        {title && <p className='font-medium text-amber-900'>{title}</p>}
        <ul className='mt-2 space-y-1'>
          {items.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export { FormInfo };
