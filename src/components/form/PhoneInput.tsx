import React, { useState, useEffect } from 'react';

interface PhoneInputProps {
  label: string;
  value: string;
  countryCode: string;
  onChange: (value: string, countryCode: string) => void;
  onBlur?: () => void;
  required?: boolean;
  error?: string;
}

const countries = [
  { code: 'US', name: 'United States', dialCode: '+1' },
  { code: 'CA', name: 'Canada', dialCode: '+1' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44' },
  { code: 'AU', name: 'Australia', dialCode: '+61' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64' },
  { code: 'IE', name: 'Ireland', dialCode: '+353' },
  { code: 'DE', name: 'Germany', dialCode: '+49' },
  { code: 'FR', name: 'France', dialCode: '+33' },
  { code: 'ES', name: 'Spain', dialCode: '+34' },
  { code: 'IT', name: 'Italy', dialCode: '+39' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31' },
  { code: 'PT', name: 'Portugal', dialCode: '+351' },
  { code: 'MX', name: 'Mexico', dialCode: '+52' },
  { code: 'JP', name: 'Japan', dialCode: '+81' },
  { code: 'KR', name: 'South Korea', dialCode: '+82' },
  { code: 'SG', name: 'Singapore', dialCode: '+65' },
  { code: 'IN', name: 'India', dialCode: '+91' },
];

export default function PhoneInput({
  label,
  value,
  countryCode,
  onChange,
  onBlur,
  required = false,
  error,
}: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(countryCode || 'US');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (value && value.startsWith('+')) {
      const country = countries.find((c) => value.startsWith(c.dialCode));
      if (country) {
        setSelectedCountry(country.code);
        setPhoneNumber(value.slice(country.dialCode.length));
      }
    } else if (value) {
      setPhoneNumber(value);
    }
  }, []);

  const handleCountryChange = (newCountryCode: string) => {
    setSelectedCountry(newCountryCode);
    const country = countries.find((c) => c.code === newCountryCode);
    if (country && phoneNumber) {
      const formattedNumber = `${country.dialCode}${phoneNumber.replace(/\D/g, '')}`;
      onChange(formattedNumber, newCountryCode);
    }
  };

  const handlePhoneChange = (newPhone: string) => {
    const digitsOnly = newPhone.replace(/\D/g, '');
    setPhoneNumber(digitsOnly);
    const country = countries.find((c) => c.code === selectedCountry);
    if (country && digitsOnly) {
      const formattedNumber = `${country.dialCode}${digitsOnly}`;
      onChange(formattedNumber, selectedCountry);
    } else if (!digitsOnly) {
      onChange('', selectedCountry);
    }
  };

  const selectedCountryData = countries.find((c) => c.code === selectedCountry);

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="flex gap-2">
        <select
          value={selectedCountry}
          onChange={(e) => handleCountryChange(e.target.value)}
          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          {countries.map((country) => (
            <option key={country.code} value={country.code}>
              {country.name} ({country.dialCode})
            </option>
          ))}
        </select>
        <div className="flex-1 flex">
          <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
            {selectedCountryData?.dialCode}
          </span>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={onBlur}
            className={`flex-1 px-4 py-3 border rounded-r-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="5551234567"
            required={required}
          />
        </div>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
