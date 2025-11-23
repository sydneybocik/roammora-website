import React from 'react';

interface TextAreaProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
  rows?: number;
}

export default function TextArea({
  label,
  name,
  value,
  onChange,
  required = false,
  error,
  placeholder,
  rows = 4,
}: TextAreaProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        placeholder={placeholder}
        required={required}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
