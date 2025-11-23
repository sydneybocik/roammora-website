import React from 'react';

interface MultiSelectInputProps {
  label: string;
  name: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  error?: string;
}

export default function MultiSelectInput({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  error,
}: MultiSelectInputProps) {
  const handleCheckboxChange = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={value.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <span className="text-sm text-gray-900">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
