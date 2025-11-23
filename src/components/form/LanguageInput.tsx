import React from 'react';
import { X, Plus } from 'lucide-react';
import { LanguageEntry } from '../../types/questionnaire';

interface LanguageInputProps {
  label: string;
  value: LanguageEntry[];
  onChange: (value: LanguageEntry[]) => void;
  error?: string;
}

const proficiencyLevels = [
  { value: 'basic', label: 'Basic' },
  { value: 'conversational', label: 'Conversational' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'native', label: 'Native' },
];

export default function LanguageInput({ label, value, onChange, error }: LanguageInputProps) {
  const addLanguage = () => {
    onChange([...value, { language: '', proficiency: '' }]);
  };

  const removeLanguage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateLanguage = (index: number, field: 'language' | 'proficiency', newValue: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [field]: newValue };
    onChange(updated);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>
      <div className="space-y-3">
        {value.map((entry, index) => (
          <div key={index} className="flex gap-2 items-start">
            <input
              type="text"
              value={entry.language}
              onChange={(e) => updateLanguage(index, 'language', e.target.value)}
              placeholder="Language"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <select
              value={entry.proficiency}
              onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Select proficiency</option>
              {proficiencyLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => removeLanguage(index)}
              className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Remove language"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addLanguage}
          className="flex items-center gap-2 px-4 py-2 text-green-700 border border-green-700 rounded-lg hover:bg-green-50 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Language
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
