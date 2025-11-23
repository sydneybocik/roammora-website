import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function SubmissionSuccess() {
  const handleReturnHome = () => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank you for sharing your story
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            We'll reach out once a pathway that matches your life and goals begins to take shape.
          </p>

          <div className="border-t border-gray-200 pt-8">
            <p className="text-sm text-gray-500 mb-6">
              In the meantime, feel free to explore more about what we're building.
            </p>

            <button
              onClick={handleReturnHome}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
