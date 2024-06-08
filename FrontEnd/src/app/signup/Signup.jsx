import React, { useState } from "react";
import FormInfo from "../components/form/FormInfo.jsx";
import ContinueWith from "../components/UI/ContinueWith";
import SignupForm from "./SignupForm.jsx";
import { signIn } from "next-auth/react";
import Validation from "../utils/Validation.js";
import "./Signup.css";
import Link from "next/link.js";
import apiHandler from "../utils/apiHandler.js";
import { auth, firestore } from "../../../lib/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    is_cross: false,
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    await event.preventDefault();
    const valErrors = Validation(formData);
    setErrors(valErrors);
    if (
      valErrors.username === "" &&
      valErrors.password === "" &&
      valErrors.email === ""
    ) {
      await loginSubmit(formData);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      const user = userCredential.user;

      const name = formData.username;
      const email = formData.email;
      const avatarUrl =
        "https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg";
      const docRef = doc(firestore, "users", user.uid);
      await setDoc(docRef, { name, email, avatarUrl });
    }
  }

  const url = "http://localhost/signup";
  const loginSubmit = async (values) => {
    try {
      const request = await apiHandler("/signup", "POST", values);
      toast.success("Email sent, please verify your email to continue");
    } catch (error) {
      toast.error("An error occured, please try again");
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/redirecting`,
    });
  };

  

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Sign up"
          description="By continuing, you agree to our User Agreement and acknowledge that you understand the Privacy Policy."
        />
        <ContinueWith handleGoogleSignIn={handleGoogleSignIn} />
        <p className="or_spliter">______________ OR ______________</p>
        <SignupForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          emailErrors={errors.email}
          usernameErrors={errors.username}
          passwordErrors={errors.password}
          username={formData.username}
          password={formData.password}
          email={formData.email}
        />
        <div className="bottom-text">
          Already a spreaditor?
          <Link href="./login" className="bottom-link">
            {" "}
            Log In{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
