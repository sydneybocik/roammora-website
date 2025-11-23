import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import FounderLetter from './pages/FounderLetter';
import PrivacyPromise from './pages/PrivacyPromise';

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (currentPath === '/founder-letter') {
    return <FounderLetter />;
  }

  if (currentPath === '/privacy-promise') {
    return <PrivacyPromise />;
  }

  return <HomePage />;
}

export default App;
