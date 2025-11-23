import React, { useState } from 'react';
import TextInput from '../form/TextInput';
import SelectInput from '../form/SelectInput';
import MultiSelectInput from '../form/MultiSelectInput';
import { Section3Data } from '../../types/questionnaire';
import { supabase } from '../../lib/supabase';

interface Section3Props {
  data: Partial<Section3Data>;
  onUpdate: (data: Partial<Section3Data>) => void;
  onNext: () => void;
  onBack: () => void;
  submissionId: string;
}

export default function Section3({ data, onUpdate, onNext, onBack, submissionId }: Section3Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  const showBlockersOther = data.blockers?.includes('other');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.current_location?.trim()) {
      newErrors.current_location = 'Current location is required';
    }
    if (!data.regions_interested || data.regions_interested.length === 0) {
      newErrors.regions_interested = 'Please select at least one region';
    }
    if (!data.work_situation) {
      newErrors.work_situation = 'Please select your work situation';
    }
    if (!data.income_range) {
      newErrors.income_range = 'Please select your income range';
    }
    if (!data.income_urgency) {
      newErrors.income_urgency = 'Please select an option';
    }
    if (!data.moving_with || data.moving_with.length === 0) {
      newErrors.moving_with = 'Please select at least one option';
    }
    if (!data.timeline) {
      newErrors.timeline = 'Please select your timeline';
    }
    if (!data.move_intention) {
      newErrors.move_intention = 'Please select your intention level';
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
          current_location: data.current_location,
          regions_interested: data.regions_interested,
          work_situation: data.work_situation,
          work_field: data.work_field,
          age_range: data.age_range,
          income_range: data.income_range,
          income_urgency: data.income_urgency,
          moving_with: data.moving_with,
          timeline: data.timeline,
          blockers: data.blockers,
          blockers_other_text: data.blockers_other_text,
          move_intention: data.move_intention,
          current_section: '3',
        })
        .eq('submission_id', submissionId);

      if (error) throw error;

      onNext();
    } catch (error) {
      console.error('Error saving section 3:', error);
      alert('There was an error saving your information. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan</h2>
        <p className="text-gray-600">Help us understand your practical situation.</p>
      </div>

      <TextInput
        label="Where are you currently located?"
        name="current_location"
        value={data.current_location || ''}
        onChange={(value) => onUpdate({ ...data, current_location: value })}
        required
        error={errors.current_location}
        placeholder="City, Country"
      />

      <MultiSelectInput
        label="Which regions interest you most?"
        name="regions_interested"
        value={data.regions_interested || []}
        onChange={(value) => onUpdate({ ...data, regions_interested: value })}
        options={[
          { value: 'europe', label: 'Europe' },
          { value: 'latin_america', label: 'Latin America' },
          { value: 'asia', label: 'Asia' },
          { value: 'oceania', label: 'Oceania (Australia/New Zealand)' },
          { value: 'africa', label: 'Africa' },
          { value: 'middle_east', label: 'Middle East' },
          { value: 'north_america', label: 'North America (Canada/Mexico)' },
        ]}
        required
        error={errors.regions_interested}
      />

      <SelectInput
        label="What's your current work situation?"
        name="work_situation"
        value={data.work_situation || ''}
        onChange={(value) => onUpdate({ ...data, work_situation: value })}
        options={[
          { value: 'remote_employee', label: 'Remote employee' },
          { value: 'office_employee', label: 'Office-based employee' },
          { value: 'self_employed', label: 'Self-employed/Freelancer' },
          { value: 'business_owner', label: 'Business owner' },
          { value: 'between_jobs', label: 'Between jobs' },
          { value: 'student', label: 'Student' },
          { value: 'retired', label: 'Retired' },
          { value: 'other', label: 'Other' },
        ]}
        required
        error={errors.work_situation}
      />

      <TextInput
        label="What field do you work in?"
        name="work_field"
        value={data.work_field || ''}
        onChange={(value) => onUpdate({ ...data, work_field: value })}
        placeholder="e.g., Technology, Healthcare, Education"
      />

      <SelectInput
        label="What is your age range?"
        name="age_range"
        value={data.age_range || ''}
        onChange={(value) => onUpdate({ ...data, age_range: value })}
        options={[
          { value: '18_24', label: '18–24' },
          { value: '25_34', label: '25–34' },
          { value: '35_44', label: '35–44' },
          { value: '45_54', label: '45–54' },
          { value: '55_plus', label: '55+' },
          { value: 'prefer_not_say', label: 'Prefer not to say' },
        ]}
      />

      <SelectInput
        label="What's your annual income range?"
        name="income_range"
        value={data.income_range || ''}
        onChange={(value) => onUpdate({ ...data, income_range: value })}
        options={[
          { value: 'under_30k', label: 'Under $30,000' },
          { value: '30k_50k', label: '$30,000 - $50,000' },
          { value: '50k_75k', label: '$50,000 - $75,000' },
          { value: '75k_100k', label: '$75,000 - $100,000' },
          { value: '100k_150k', label: '$100,000 - $150,000' },
          { value: 'over_150k', label: 'Over $150,000' },
          { value: 'prefer_not_say', label: 'Prefer not to say' },
        ]}
        required
        error={errors.income_range}
      />

      <SelectInput
        label="How important is maintaining your current income?"
        name="income_urgency"
        value={data.income_urgency || ''}
        onChange={(value) => onUpdate({ ...data, income_urgency: value })}
        options={[
          { value: 'critical', label: 'Critical - I need to maintain or increase it' },
          { value: 'important', label: 'Important - I\'d prefer to stay close to it' },
          { value: 'flexible', label: 'Flexible - I can adjust for the right opportunity' },
          { value: 'not_important', label: 'Not important - I\'m open to changes' },
        ]}
        required
        error={errors.income_urgency}
      />

      <MultiSelectInput
        label="Who would you be moving with?"
        name="moving_with"
        value={data.moving_with || []}
        onChange={(value) => onUpdate({ ...data, moving_with: value })}
        options={[
          { value: 'alone', label: 'Just me' },
          { value: 'partner', label: 'Partner/Spouse' },
          { value: 'children', label: 'Children' },
          { value: 'pets', label: 'Pets' },
          { value: 'friends', label: 'Friends' },
          { value: 'extended_family', label: 'Extended family' },
        ]}
        required
        error={errors.moving_with}
      />

      <SelectInput
        label="When are you hoping to move?"
        name="timeline"
        value={data.timeline || ''}
        onChange={(value) => onUpdate({ ...data, timeline: value })}
        options={[
          { value: '0_3_months', label: 'Within 3 months' },
          { value: '3_6_months', label: '3-6 months' },
          { value: '6_12_months', label: '6-12 months' },
          { value: '1_2_years', label: '1-2 years' },
          { value: 'over_2_years', label: 'More than 2 years' },
          { value: 'flexible', label: 'Flexible/exploring' },
        ]}
        required
        error={errors.timeline}
      />

      <MultiSelectInput
        label="What feels like the biggest blocker right now?"
        name="blockers"
        value={data.blockers || []}
        onChange={(value) => onUpdate({ ...data, blockers: value })}
        options={[
          { value: 'visas', label: 'Visas and legal requirements' },
          { value: 'finances', label: 'Financial concerns' },
          { value: 'work', label: 'Work/career uncertainty' },
          { value: 'family', label: 'Family obligations' },
          { value: 'language', label: 'Language barriers' },
          { value: 'healthcare', label: 'Healthcare access' },
          { value: 'logistics', label: 'Logistics and planning' },
          { value: 'fear', label: 'Fear of the unknown' },
          { value: 'other', label: 'Other' },
        ]}
      />

      {showBlockersOther && (
        <TextInput
          label="Please specify other blockers"
          name="blockers_other_text"
          value={data.blockers_other_text || ''}
          onChange={(value) => onUpdate({ ...data, blockers_other_text: value })}
          placeholder="Tell us more..."
        />
      )}

      <SelectInput
        label="How would you describe your intention to move?"
        name="move_intention"
        value={data.move_intention || ''}
        onChange={(value) => onUpdate({ ...data, move_intention: value })}
        options={[
          { value: 'committed', label: 'Fully committed - I\'m making this happen' },
          { value: 'serious', label: 'Serious - actively planning' },
          { value: 'exploring', label: 'Exploring - gathering information' },
          { value: 'dreaming', label: 'Dreaming - not sure if it\'s realistic yet' },
        ]}
        required
        error={errors.move_intention}
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
