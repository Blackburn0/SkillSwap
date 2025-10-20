import React from 'react';
import clsx from 'clsx';

type InputProps = {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  textarea = false,
  className,
  ...props
}) => {
  const baseStyles =
    'border border-gray-300 rounded-lg py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition duration-200';

  return (
    <div className={clsx('flex flex-col gap-1', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}

      {textarea ? (
        <textarea
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={clsx(baseStyles, fullWidth && 'w-full', className)}
        />
      ) : (
        <input
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          className={clsx(baseStyles, fullWidth && 'w-full', className)}
        />
      )}

      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default Input;

// usage example:
/*
1. Text Input

<Input type="text" label="Full Name" />


2. Full Width Input

<Input type="email" label="Email Address" fullWidth />


3. Textarea

<Input textarea label="Message" rows={4} fullWidth />


4. With Error Message

<Input
  type="password"
  label="Password"
  error="Password is required"
/>

*/
