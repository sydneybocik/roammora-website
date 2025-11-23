import React, { useState } from 'react';
import TextArea from '../form/TextArea';
import SelectInput from '../form/SelectInput';
import MultiSelectInput from '../form/MultiSelectInput';
import LanguageInput from '../form/LanguageInput';
import RadioGroup from '../form/RadioGroup';
import TextInput from '../form/TextInput';
import { Section4Data } from '../../types/questionnaire';
import { supabase } from '../../lib/supabase';

interface Section4Props {
  data: Partial<Section4Data>;
  onUpdate: (data: Partial<Section4Data>) => void;
  onComplete: () => void;
  onBack: () => void;
  submissionId: string;
}

export default function Section4({ data, onUpdate, onComplete, onBack, submissionId }: Section4Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const showSafetyOther = data.safety_considerations?.includes('other');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.feeling_at_home?.trim()) {
      newErrors.feeling_at_home = 'This field is required';
    }
    if (!data.home_preferences) {
      newErrors.home_preferences = 'Please select your preference';
    }
    if (!data.opt_in_path_alert) {
      newErrors.opt_in_path_alert = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('roamer_submissions')
        .update({
          languages: data.languages || [],
          feeling_at_home: data.feeling_at_home,
          safety_considerations: data.safety_considerations || [],
          safety_considerations_other_text: data.safety_considerations_other_text,
          home_preferences: data.home_preferences,
          anything_else: data.anything_else,
          opt_in_path_alert: data.opt_in_path_alert,
          current_section: '4',
          consent_timestamp: data.opt_in_path_alert === 'yes' ? new Date().toISOString() : null,
        })
        .eq('submission_id', submissionId);

      if (error) throw error;

      onComplete();
    } catch (error) {
      console.error('Error saving section 4:', error);
      alert('There was an error saving your information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Arrive</h2>
        <p className="text-gray-600">Let's understand what matters most to you in a new place.</p>
      </div>

      <LanguageInput
        label="What languages do you speak?"
        value={data.languages || []}
        onChange={(value) => onUpdate({ ...data, languages: value })}
      />

      <TextArea
        label="What makes you feel most at home?"
        name="feeling_at_home"
        value={data.feeling_at_home || ''}
        onChange={(value) => onUpdate({ ...data, feeling_at_home: value })}
        required
        error={errors.feeling_at_home}
        placeholder="Is it nature, community, culture, food, or something else?"
      />

      <MultiSelectInput
        label="Are there any safety considerations we should know about?"
        name="safety_considerations"
        value={data.safety_considerations || []}
        onChange={(value) => onUpdate({ ...data, safety_considerations: value })}
        options={[
          { value: 'lgbtq', label: 'LGBTQ+ safety' },
          { value: 'women', label: 'Safety for women' },
          { value: 'racial', label: 'Racial/ethnic considerations' },
          { value: 'religious', label: 'Religious freedom' },
          { value: 'political', label: 'Political stability' },
          { value: 'healthcare', label: 'Healthcare quality' },
          { value: 'disability', label: 'Disability accessibility' },
          { value: 'none', label: 'No specific concerns' },
          { value: 'other', label: 'Other' },
        ]}
      />

      {showSafetyOther && (
        <TextInput
          label="Please specify other safety considerations"
          name="safety_considerations_other_text"
          value={data.safety_considerations_other_text || ''}
          onChange={(value) => onUpdate({ ...data, safety_considerations_other_text: value })}
          placeholder="Tell us more..."
        />
      )}

      <SelectInput
        label="Where do you see yourself living?"
        name="home_preferences"
        value={data.home_preferences || ''}
        onChange={(value) => onUpdate({ ...data, home_preferences: value })}
        options={[
          { value: 'city_center', label: 'City center/urban' },
          { value: 'suburbs', label: 'Suburbs' },
          { value: 'small_town', label: 'Small town' },
          { value: 'countryside', label: 'Countryside/rural' },
          { value: 'coastal', label: 'Coastal area' },
          { value: 'mountains', label: 'Mountains' },
          { value: 'flexible', label: 'Flexible/not sure' },
        ]}
        required
        error={errors.home_preferences}
      />

      <TextArea
        label="Anything else you'd like us to know?"
        name="anything_else"
        value={data.anything_else || ''}
        onChange={(value) => onUpdate({ ...data, anything_else: value })}
        placeholder="Share any additional thoughts, questions, or considerations..."
        rows={5}
      />

      <RadioGroup
        label="Want to be first to know when a pathway opens up that fits your life?"
        name="opt_in_path_alert"
        value={data.opt_in_path_alert || ''}
        onChange={(value) => onUpdate({ ...data, opt_in_path_alert: value as 'yes' | 'no' })}
        options={[
          { value: 'yes', label: 'Yes, please notify me' },
          { value: 'no', label: 'No thanks' },
        ]}
        required
        error={errors.opt_in_path_alert}
      />

      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onBack}
          className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSaving}
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium disabled:opacity-50"
        >
          {isSaving ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
