export interface LanguageEntry {
  language: string;
  proficiency: string;
}

export interface RoamerSubmission {
  submission_id?: string;
  email: string;
  created_at?: string;
  updated_at?: string;
  current_section: '1' | '2' | '3' | '4';
  source: string;
  consent_timestamp?: string | null;

  first_name?: string;
  last_name?: string;
  phone_number?: string;
  phone_country_code?: string;
  opt_in_updates?: 'yes' | 'no';

  dream_pull?: string;
  dream_days_feel?: string;
  dream_life_too_small?: string;
  dream_frequency?: string;
  dream_community?: string;
  dream_excites?: string;

  current_location?: string;
  regions_interested?: string[];
  work_situation?: string;
  work_field?: string;
  income_range?: string;
  income_urgency?: string;
  moving_with?: string[];
  timeline?: string;
  blockers?: string[];
  blockers_other_text?: string;
  move_intention?: string;

  languages?: LanguageEntry[];
  feeling_at_home?: string;
  safety_considerations?: string[];
  safety_considerations_other_text?: string;
  home_preferences?: string;
  anything_else?: string;
  opt_in_path_alert?: 'yes' | 'no';
}

export interface Section1Data {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  phone_country_code: string;
  opt_in_updates: 'yes' | 'no';
}

export interface Section2Data {
  dream_pull: string;
  dream_days_feel: string;
  dream_life_too_small: string;
  dream_frequency: string;
  dream_community: string;
  dream_excites: string;
}

export interface Section3Data {
  current_location: string;
  regions_interested: string[];
  work_situation: string;
  work_field: string;
  income_range: string;
  income_urgency: string;
  moving_with: string[];
  timeline: string;
  blockers: string[];
  blockers_other_text: string;
  move_intention: string;
}

export interface Section4Data {
  languages: LanguageEntry[];
  feeling_at_home: string;
  safety_considerations: string[];
  safety_considerations_other_text: string;
  home_preferences: string;
  anything_else: string;
  opt_in_path_alert: 'yes' | 'no';
}
