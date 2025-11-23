import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  required?: boolean;
  type?: 'text' | 'email';
  error?: string;
  placeholder?: string;
}

export default function TextInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  required = false,
  type = 'text',
  error,
  placeholder,
}: TextInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
