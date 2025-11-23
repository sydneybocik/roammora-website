import React, { useState, useEffect } from 'react';
import TextInput from '../form/TextInput';
import PhoneInput from '../form/PhoneInput';
import RadioGroup from '../form/RadioGroup';
import MultiSelectInput from '../form/MultiSelectInput';
import { Section1Data } from '../../types/questionnaire';
import { supabase } from '../../lib/supabase';

interface Section1Props {
  data: Partial<Section1Data>;
  onUpdate: (data: Partial<Section1Data>) => void;
  onNext: (submissionId: string) => void;
  onExistingSubmission: (submissionId: string, data: any) => void;
  source: string;
}

export default function Section1({ data, onUpdate, onNext, onExistingSubmission, source }: Section1Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);
  const [hasCheckedEmail, setHasCheckedEmail] = useState(false);
  const [existingSubmissionId, setExistingSubmissionId] = useState<string | null>(null);

  const handleEmailBlur = async () => {
    if (!data.email || hasCheckedEmail || !data.email.includes('@')) return;

    setIsCheckingEmail(true);
    try {
      const { data: submissions, error } = await supabase
        .from('roamer_submissions')
        .select('*')
        .eq('email', data.email)
        .neq('current_section', '4')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;

      if (submissions && submissions.length > 0) {
        const existingSubmission = submissions[0];
        setExistingSubmissionId(existingSubmission.submission_id);
        onExistingSubmission(existingSubmission.submission_id, existingSubmission);
      }
      setHasCheckedEmail(true);
    } catch (error) {
      console.error('Error checking email:', error);
    } finally {
      setIsCheckingEmail(false);
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!data.first_name?.trim()) {
      newErrors.first_name = 'First name is required';
    }
    if (!data.last_name?.trim()) {
      newErrors.last_name = 'Last name is required';
    }
    if (!data.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!data.phone_number?.trim()) {
      newErrors.phone_number = 'Phone number is required';
    }
    if (!data.heard_about_us || data.heard_about_us.length === 0) {
      newErrors.heard_about_us = 'Please select at least one option';
    }
    if (data.heard_about_us?.includes('other') && !data.heard_about_us_other_text?.trim()) {
      newErrors.heard_about_us_other_text = 'Please specify how you heard about us';
    }
    if (!data.opt_in_updates) {
      newErrors.opt_in_updates = 'Please select an option';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const submissionData = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        phone_number: data.phone_number,
        phone_country_code: data.phone_country_code,
        heard_about_us: data.heard_about_us || [],
        heard_about_us_other_text: data.heard_about_us_other_text || null,
        opt_in_updates: data.opt_in_updates,
        current_section: '1',
        source: source,
        consent_timestamp: data.opt_in_updates === 'yes' ? new Date().toISOString() : null,
      };

      if (existingSubmissionId) {
        const { error } = await supabase
          .from('roamer_submissions')
          .update(submissionData)
          .eq('submission_id', existingSubmissionId);

        if (error) throw error;
        onNext(existingSubmissionId);
      } else {
        const { data: result, error } = await supabase
          .from('roamer_submissions')
          .insert([submissionData])
          .select()
          .single();

        if (error) throw error;

        if (result && result.submission_id) {
          onNext(result.submission_id);
        }
      }
    } catch (error) {
      console.error('Error saving section 1:', error);
      alert('There was an error saving your information. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Let's start with the basics</h2>
        <p className="text-gray-600">We'll use this to stay in touch about your journey.</p>
      </div>

      <TextInput
        label="First Name"
        name="first_name"
        value={data.first_name || ''}
        onChange={(value) => onUpdate({ ...data, first_name: value })}
        required
        error={errors.first_name}
      />

      <TextInput
        label="Last Name"
        name="last_name"
        value={data.last_name || ''}
        onChange={(value) => onUpdate({ ...data, last_name: value })}
        required
        error={errors.last_name}
      />

      <TextInput
        label="Email"
        name="email"
        type="email"
        value={data.email || ''}
        onChange={(value) => {
          onUpdate({ ...data, email: value });
          setHasCheckedEmail(false);
        }}
        onBlur={handleEmailBlur}
        required
        error={errors.email}
      />
      {isCheckingEmail && (
        <p className="text-sm text-gray-500 -mt-4 mb-4">Checking for existing submission...</p>
      )}

      <PhoneInput
        label="Phone Number"
        value={data.phone_number || ''}
        countryCode={data.phone_country_code || 'US'}
        onChange={(value, countryCode) =>
          onUpdate({ ...data, phone_number: value, phone_country_code: countryCode })
        }
        required
        error={errors.phone_number}
      />

      <MultiSelectInput
        label="How did you hear about Roammora?"
        name="heard_about_us"
        value={data.heard_about_us || []}
        onChange={(value) => onUpdate({ ...data, heard_about_us: value })}
        options={[
          { value: 'google', label: 'Google Search' },
          { value: 'tiktok', label: 'TikTok' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'youtube', label: 'YouTube' },
          { value: 'reddit', label: 'Reddit' },
          { value: 'x_twitter', label: 'X / Twitter' },
          { value: 'facebook', label: 'Facebook' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'podcast', label: 'Podcast' },
          { value: 'blog', label: 'Blog or article' },
          { value: 'friend', label: 'A friend or fellow Roamer' },
          { value: 'other', label: 'Other (please specify)' },
        ]}
        required
        error={errors.heard_about_us}
      />

      {data.heard_about_us?.includes('other') && (
        <TextInput
          label="Please specify"
          name="heard_about_us_other_text"
          value={data.heard_about_us_other_text || ''}
          onChange={(value) => onUpdate({ ...data, heard_about_us_other_text: value })}
          required
          error={errors.heard_about_us_other_text}
          placeholder="Tell us how you found us..."
        />
      )}

      <RadioGroup
        label="Can we keep you in the loop as we grow?"
        name="opt_in_updates"
        value={data.opt_in_updates || ''}
        onChange={(value) => onUpdate({ ...data, opt_in_updates: value as 'yes' | 'no' })}
        options={[
          { value: 'yes', label: 'Yes, keep me updated' },
          { value: 'no', label: 'No thanks' },
        ]}
        required
        error={errors.opt_in_updates}
      />

      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
