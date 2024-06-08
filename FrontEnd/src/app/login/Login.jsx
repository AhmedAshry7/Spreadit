import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation.js";
import FormInfo from "../components/form/FormInfo.jsx";
import ContinueWith from "../components/UI/ContinueWith";
import LoginForm from "./LoginForm.jsx";
import Validation from "../utils/Validation.js";
import "./Login.css";
import { signIn } from "next-auth/react";
import Link from "next/link.js";
import storeCookies from "../utils/storeCookies.js";
import deleteCookies from "../utils/deleteCookies.js";
import apiHandler from "../utils/apiHandler.js";
import { auth } from "../../../lib/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import useFcmToken from "../utils/useFCMToken.js";
import toast from "react-hot-toast";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberme: false,
    usernameExists: false,
    incorrectPassword: false,
  });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    await event.preventDefault();
    // Request notification permission
    const permission = await Notification.requestPermission();
    const valErrors = Validation(formData);
    
    setErrors(valErrors);
    if (valErrors.username === "" && valErrors.password === "") {
      await loginSubmit(formData, permission);
    }
  }

  const url = "http://localhost:3002/login";
  const loginSubmit = async (values, permission) => {
    try {
      const response = await apiHandler("/login", "POST", values);
      await deleteCookies();
      await useFcmToken(response.access_token, permission);
      await storeCookies(response);
      loginfirebase(response);
      toast.success("redirecting...");
    } catch (error) {
      
      setErrors({
        username: "Incorrect username or password.",
        password: "Incorrect username or password.",
      });
      
    }
  };

  const loginfirebase = async (response) => {
    try {
      
      
      const userCredential = await signInWithEmailAndPassword(
        auth,
        response.user.email,
        formData.password,
      );
      const user = userCredential.user;
    } catch {
      
    } finally {
      router.push("/home");
    }
  };

  function HandleRememberMe() {
    setRememberMe(!rememberMe);
  }

  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_DOMAIN}/redirecting`,
    });
  };

  return (
    <div className="pageColumn__right">
      <div className="userFormContainer">
        <FormInfo
          title="Log in"
          description="Tell us the username and email address. By continuing, you agree to our User Agreement and Privacy Policy."
        />
        <ContinueWith handleGoogleSignIn={handleGoogleSignIn} />
        <p className="or_spliter">______________ OR ______________</p>
        <LoginForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          HandleRememberMe={HandleRememberMe}
          usernameErrors={errors.username}
          passwordErrors={errors.password}
          username={formData.username}
          password={formData.password}
        />
        <div className="bottom-text">
          New to Spreadit?
          <Link href="./signup" className="bottom-link">
            {" "}
            SIGN UP{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
