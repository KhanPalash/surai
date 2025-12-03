import { useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import LoginScreen from './components/LoginScreen';
import Studio from './components/Studio';

// The original mock user data structure
const regularUser = { name: 'Test User', tier: 'FREE TIER' };
const premiumUser = { name: 'Admin', tier: 'VIP PRO' };

function SurAIApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Map Firebase user to your app-specific user object
        if (currentUser.email === 'admin@surai.com') {
          setUser({ ...premiumUser, email: currentUser.email });
        } else {
          setUser({ ...regularUser, email: currentUser.email, name: currentUser.email.split('@')[0] });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth).catch((error) => console.error('Sign out error', error));
  };

  if (loading) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      {user ? (
        <Studio user={user} onSignOut={handleSignOut} />
      ) : (
        <LoginScreen />
      )}
    </div>
  );
}

export default SurAIApp;
