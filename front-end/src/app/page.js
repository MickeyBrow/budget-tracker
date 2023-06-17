"use client"
import './page.css'
import { useState } from 'react';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signInPage, setSignInPage] = useState(true);

  const handleOnSignIn = (e) => {
    e.preventDefault();

    // Add your sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };
  
  const handleOnSignUp = (e) => {
    e.preventDefault();

    // Add your sign-in logic here
    const onSignUpApiLink = `http://127.0.0.1:5000/signUp`
    fetch(onSignUpApiLink, {
      method: 'POST',
      body: JSON.stringify({
        user_username: username,
        user_password: password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('Email:', email);
    console.log('Password:', password);

    setSignInPage(true)
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
