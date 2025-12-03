import { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // This is a mock sign-in for demonstration purposes.
  // In a real app, you would have a password field and more robust error handling.
  const handleSignIn = async () => {
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    try {
        // First, try to sign in.
        await signInWithEmailAndPassword(auth, email, 'password'); // Using a dummy password
    } catch (signInError) {
        // If sign-in fails because the user does not exist, create a new account.
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
            try {
                await createUserWithEmailAndPassword(auth, email, 'password'); // Using a dummy password
            } catch (signUpError) {
                setError(`Error creating account: ${signUpError.message}`);
            }
        } else {
            setError(`Error signing in: ${signInError.message}`);
        }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <div className="text-center p-8 max-w-md mx-auto">
            <h1 className="text-6xl font-bold mb-4">SurAI</h1>
            <p className="text-xl text-gray-400 mb-8">Your Personal AI Music Studio</p>
            <div className="flex flex-col gap-4">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                    onClick={handleSignIn}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Sign in (Mock)
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
             <p className="text-xs text-gray-500 mt-8">For demonstration, this mock sign-in will create an account if one doesn't exist.</p>
        </div>
    </div>
  );
}

export default LoginScreen;
