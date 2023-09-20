/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Button, Image } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <div className="singInLogoContainer">
        <Image
          className="signInLogo"
          src="/skatelogo.png"
          alt="logo"
        />
      </div>
      <h3>Welcome Skater!</h3>
      <p>Click the button below to log in</p>
      <Button type="button" size="lg" className="copy-btn login-button" onClick={signIn}>
        Sign In
      </Button>
    </div>
  );
}

export default Signin;
