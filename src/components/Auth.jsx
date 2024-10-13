// src/components/Auth.js
import  { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const googleProvider = new GoogleAuthProvider();

const Auth = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      // Login logic
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully');
      } catch (error) {
        alert(error.message);
      }
    } else {
      // Sign-up logic
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save user's name to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name: name,
          email: email,
        });

        alert('Account created successfully');
      } catch (error) {
        alert(error.message);
      }
    }
  };


    // Google Sign-In Functionality
    const handleGoogleSignIn = async () => {
      try {
        await signInWithPopup(auth, googleProvider).then((result) => {
          const user = result.user;
          console.log(user);
          
          alert('Logged in successfully');
        })
      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    };

  return (
<div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 p-2 mb-4 w-full rounded"
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 mb-4 w-full rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        <p className="mt-4">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}
          <button type="button" className="text-blue-500 ml-1" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="bg-red-500 text-white p-2 rounded w-full mt-4 flex items-center justify-center"
          >
            <img
              src="https://img.icons8.com/color/16/000000/google-logo.png"
              alt="Google Logo"
              className="mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>  );
};

export default Auth;
