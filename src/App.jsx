// src/App.js
import  { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Auth from './components/Auth';
import Itinerary from './components/Itinerary';
import LandingPage from './components/LandingPage';

const App = () => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Fetch user's name from Firestore
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      } else {
        setUserName('');
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert('Signed out successfully');
    } catch (error) {
      alert('Failed to sign out: ' + error.message);
    }
  };



    // Handle sign-in button click to show the auth form
    const handleSignInClick = () => {
      setShowAuth(true);
    };

  return (
    <div className="bg-gray-100 min-h-screen">
      {user ? (
        <div>
          <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-bold">Welcome, {userName}!</h2>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </button>
          </div>
          <Itinerary />
        </div>
      )  : showAuth ? (
        // If the user chooses to sign in, show the Auth component
        <Auth />
      ) : (
        // Display the landing page by default if the user is not signed in
        <LandingPage onSignIn={handleSignInClick} />
      )}
    </div>
  );
};

export default App;
