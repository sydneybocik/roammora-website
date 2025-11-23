import React, { useState, useEffect } from 'react';
import Section1 from '../components/questionnaire/Section1';
import Section2 from '../components/questionnaire/Section2';
import Section3 from '../components/questionnaire/Section3';
import Section4 from '../components/questionnaire/Section4';
import StepIndicator from '../components/questionnaire/StepIndicator';
import { RoamerSubmission } from '../types/questionnaire';

interface QuestionnaireFormProps {
  source?: string;
  onComplete: () => void;
}

export default function QuestionnaireForm({ source = 'homepage', onComplete }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<RoamerSubmission>>({
    source: source,
  });

  const handleSection1Complete = (newSubmissionId: string) => {
    setSubmissionId(newSubmissionId);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExistingSubmission = (existingSubmissionId: string, existingData: RoamerSubmission) => {
    setSubmissionId(existingSubmissionId);
    setFormData(existingData);
    const resumeSection = parseInt(existingData.current_section);
    setCurrentStep(Math.min(resumeSection + 1, 4));
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <img
            src="/finalwebsiteimages/roammorablacklogo.png"
            alt="Roam Mora"
            className="h-8 mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Join the Roamer Waitlist</h1>
          <p className="text-gray-600">
            Share your story and we'll help you find your path forward.
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={4} />

        <div className="bg-white rounded-2xl shadow-sm p-8">
          {currentStep === 1 && (
            <Section1
              data={formData}
              onUpdate={setFormData}
              onNext={handleSection1Complete}
              onExistingSubmission={handleExistingSubmission}
              source={source}
            />
          )}

          {currentStep === 2 && submissionId && (
            <Section2
              data={formData}
              onUpdate={setFormData}
              onNext={handleNext}
              onBack={handleBack}
              submissionId={submissionId}
            />
          )}

          {currentStep === 3 && submissionId && (
            <Section3
              data={formData}
              onUpdate={setFormData}
              onNext={handleNext}
              onBack={handleBack}
              submissionId={submissionId}
            />
          )}

          {currentStep === 4 && submissionId && (
            <Section4
              data={formData}
              onUpdate={setFormData}
              onComplete={handleComplete}
              onBack={handleBack}
              submissionId={submissionId}
            />
          )}
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>Your information is saved automatically as you progress.</p>
        </div>
      </div>
    </div>
  );
}
