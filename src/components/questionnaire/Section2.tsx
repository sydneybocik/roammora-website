import React, { useState } from 'react';
import TextArea from '../form/TextArea';
import RadioGroup from '../form/RadioGroup';
import { Section2Data } from '../../types/questionnaire';
import { supabase } from '../../lib/supabase';

interface Section2Props {
  data: Partial<Section2Data>;
  onUpdate: (data: Partial<Section2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  submissionId: string;
}

export default function Section2({ data, onUpdate, onNext, onBack, submissionId }: Section2Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.dream_pull?.trim()) {
      newErrors.dream_pull = 'This field is required';
    }
    if (!data.dream_days_feel?.trim()) {
      newErrors.dream_days_feel = 'This field is required';
    }
    if (!data.dream_life_too_small?.trim()) {
      newErrors.dream_life_too_small = 'This field is required';
    }
    if (!data.dream_frequency) {
      newErrors.dream_frequency = 'Please select an option';
    }
    if (!data.dream_community) {
      newErrors.dream_community = 'Please select an option';
    }
    if (!data.dream_excites?.trim()) {
      newErrors.dream_excites = 'This field is required';
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
          dream_pull: data.dream_pull,
          dream_days_feel: data.dream_days_feel,
          dream_life_too_small: data.dream_life_too_small,
          dream_frequency: data.dream_frequency,
          dream_community: data.dream_community,
          dream_excites: data.dream_excites,
          current_section: '2',
        })
        .eq('submission_id', submissionId);

      if (error) throw error;

      onNext();
    } catch (error) {
      console.error('Error saving section 2:', error);
      alert('There was an error saving your information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dream</h2>
        <p className="text-gray-600">Tell us about what's calling you forward.</p>
      </div>

      <TextArea
        label="What's pulling you toward a new country?"
        name="dream_pull"
        value={data.dream_pull || ''}
        onChange={(value) => onUpdate({ ...data, dream_pull: value })}
        required
        error={errors.dream_pull}
        placeholder="Share what's drawing you to make this change..."
      />

      <TextArea
        label="How do your days feel right now?"
        name="dream_days_feel"
        value={data.dream_days_feel || ''}
        onChange={(value) => onUpdate({ ...data, dream_days_feel: value })}
        required
        error={errors.dream_days_feel}
        placeholder="Describe your current daily experience..."
      />

      <TextArea
        label="Do you ever feel like your life is too small for who you really are?"
        name="dream_life_too_small"
        value={data.dream_life_too_small || ''}
        onChange={(value) => onUpdate({ ...data, dream_life_too_small: value })}
        required
        error={errors.dream_life_too_small}
        placeholder="Tell us how this resonates with you..."
      />

      <RadioGroup
        label="How often do you think about moving abroad?"
        name="dream_frequency"
        value={data.dream_frequency || ''}
        onChange={(value) => onUpdate({ ...data, dream_frequency: value })}
        options={[
          { value: 'daily', label: 'Every day' },
          { value: 'weekly', label: 'Several times a week' },
          { value: 'monthly', label: 'A few times a month' },
          { value: 'occasionally', label: 'Occasionally' },
        ]}
        required
        error={errors.dream_frequency}
      />

      <RadioGroup
        label="Are you looking for a deeper sense of community?"
        name="dream_community"
        value={data.dream_community || ''}
        onChange={(value) => onUpdate({ ...data, dream_community: value })}
        options={[
          { value: 'yes_essential', label: 'Yes, it\'s essential to me' },
          { value: 'yes_interested', label: 'Yes, I\'m interested' },
          { value: 'neutral', label: 'I\'m neutral about it' },
          { value: 'no', label: 'Not particularly' },
        ]}
        required
        error={errors.dream_community}
      />

      <TextArea
        label="What excites you most about starting fresh somewhere new?"
        name="dream_excites"
        value={data.dream_excites || ''}
        onChange={(value) => onUpdate({ ...data, dream_excites: value })}
        required
        error={errors.dream_excites}
        placeholder="What are you most looking forward to?"
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
          {isSaving ? 'Saving...' : 'Continue'}
        </button>
      </div>
    </form>
  );
}
