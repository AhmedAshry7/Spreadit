"use client";
import React, { useEffect } from "react";
import apiHandler from "../../utils/apiHandler.js";

function VerifyEmail({ params: { verifyToken } }) {
  useEffect(() => {
    async function makeCall() {
      const response = await apiHandler(`/verify-email/${verifyToken}`, "POST");
      
    }
    makeCall();
  }, []);
  return (
    <div>
      <h1>Verify Email</h1>
    </div>
  );
}

export default VerifyEmail;
