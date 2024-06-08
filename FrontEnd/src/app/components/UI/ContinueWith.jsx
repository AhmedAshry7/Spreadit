import React from "react";

export default function SignupForm({ handleGoogleSignIn }) {
  return (
    <button className="continue_with" onClick={handleGoogleSignIn}>
      Sign in with Google
    </button>
  );
}
