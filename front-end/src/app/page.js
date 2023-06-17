"use client"
import './page.css'
import firebase_app from '@/config';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInPage, setSignInPage] = useState(true);

  let router = useRouter();

  const handleOnSignIn = (e) => {
    e.preventDefault();

    // Add your sign-in logic here
    const auth = getAuth(firebase_app);
    signInWithEmailAndPassword(auth, username, password)
    .then(() => {
      // redirect to dashboard page
      router.push('/Dashboard')

    })
  };
  
  const handleOnSignUp = (e) => {
    e.preventDefault();

    // Add your sign-up logic here
    const auth = getAuth(firebase_app);
    createUserWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      // create a spot in the db for this user with an api call
      const createNewUserLink = `http://127.0.0.1:5000/signUp`
      fetch(createNewUserLink, {
        method: 'POST',
        body: JSON.stringify({
          uid: userCredential.user.uid
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(() => setSignInPage(true))
    })
  };

  return (
    <div className="moduleOverlay">
      {signInPage ?
      <>
        <div className="signInModule">
          <button type="submit" className="signUpButton" onClick={() => setSignInPage(false)}>Sign Up</button>
          <h1>Sign In</h1>
          <form onSubmit={handleOnSignIn}>
            <div style={{'marginBottom': "10%"}}>
              <label htmlFor="username">Username:</label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signInButton">Sign In</button>
          </form>
        </div>
      </>
      :
      <>
        <div className="signInModule">
          <button style={{
            'background': 'none',
            'border': 'none',
            'cursor': 'pointer'
          }} onClick={() => setSignInPage(true)}>Back</button>
          <h1>Sign Up</h1>
          <form onSubmit={handleOnSignUp}>
            <div style={{'marginBottom': "10%"}}>
              <label htmlFor="username">Username:</label>
              <input
                type="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="signInButton">Submit</button>
          </form>
        </div>
      </>
      }
    </div>
  );
};

export default SignInPage;
