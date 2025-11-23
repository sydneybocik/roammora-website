import React from 'react';

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
  placeholder?: string;
}

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
  placeholder = 'Select an option',
}: SelectInputProps) {
  return (
    <div className="mb-6">
      <label htmlFor={name} className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
