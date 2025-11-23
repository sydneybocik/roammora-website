import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import FounderLetter from './pages/FounderLetter';
import PrivacyPromise from './pages/PrivacyPromise';
import QuestionnaireForm from './pages/QuestionnaireForm';
import SubmissionSuccess from './pages/SubmissionSuccess';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [searchParams, setSearchParams] = useState(new URLSearchParams(window.location.search));

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  useEffect(() => {
    if (currentPath === '/privacy-promise') {
      document.title = 'Roammora – Privacy Promise';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'How Roammora protects your privacy, your story, and your data. A simple and transparent explanation of what we collect and why.');
      }
    } else if (currentPath === '/') {
      document.title = 'Roammora – Live where life pulls you';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Roammora helps you move abroad with clarity and confidence. A human-centered platform built to support your international journey — from dreaming to planning to arriving.');
      }
    }
  }, [currentPath]);

  const handleQuestionnaireComplete = () => {
    window.history.pushState({}, '', '/questionnaire/success');
    setCurrentPath('/questionnaire/success');
  };

  if (currentPath === '/founder-letter') {
    return <FounderLetter />;
  }

  if (currentPath === '/privacy-promise') {
    return <PrivacyPromise />;
  }

  if (currentPath === '/questionnaire') {
    const source = searchParams.get('source') || 'homepage';
    return <QuestionnaireForm source={source} onComplete={handleQuestionnaireComplete} />;
  }

  if (currentPath === '/questionnaire/success') {
    return <SubmissionSuccess />;
  }

  return <HomePage />;
}

export default App;
