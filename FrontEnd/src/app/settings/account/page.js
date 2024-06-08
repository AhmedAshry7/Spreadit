"use client";
import Styles from "./page.module.css";
import React, { useEffect, useState } from "react";
import Deleteaccount from "../../components/UI/Deletebutton";
import Layout from "../SettingsLayout";
import Changeemailpassword from "../../components/UI/Changebutton";
import Changegendercountry from "../../components//UI/Listbutton";
import Connectbutton from "../../components/UI/Connectbutton";
import ChangeEmailmodal from "../../components/UI/ChangeEmailModal";
import ChangePasswordModal from "../../components/UI/ChangePasswordModal";
import apiHandler from "../../utils/apiHandler";
import getCookies from "@/app/utils/getCookies";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Home = () => {
  const router = useRouter();
  const [temporaryToken, setToken] = useState(null);
  const [cookiesEmail, setCookiesEmail] = useState(null);
  useEffect(() => {
    async function cookiesfn() {
      const cookies = await getCookies();
      if (cookies !== null && cookies.access_token) {
        setToken(cookies.access_token);
        setCookiesEmail(cookies.email);
        if (cookies && cookies.username) {
          setUsername(cookies.username);
        }
      } else {
        router.push("/login");
      }
    }
    cookiesfn();
  }, []);
  //const temporaryToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE5NjcxOTBkNDM3ZmJmNGYyOGI4ZDIiLCJ1c2VybmFtZSI6IlRlc3RVc2VyIiwiaWF0IjoxNzEzMDI5MjM1fQ.ih5SD2C1dSo96CRDbUGX3E5z9mGvCh37zAGh53Y8z-M";
  const [userData, setUserData] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [Username, setUsername] = useState("");
  const [currentDescription, setCurrentDescription] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [connectedAccounts, setConnectedAccounts] = useState([]);
  const [connected, setConnected] = useState(false);
  const [passwordExist, setPasswordExist] = useState(false);
  const [showNoPasswordModal, setShowNoPasswordModal] = useState(false);

  const openEmailModal = () => {
    if (!passwordExist) {
      setShowNoPasswordModal(true);
    } else {
      setShowEmailModal(true);
    }
  };
  const openPasswordModal = () => {
    if (!passwordExist) {
      setShowNoPasswordModal(true);
    } else {
      setShowPasswordModal(true);
    }
  };

  const updateupdatedescription = (newdescription) => {
    setCurrentDescription(newdescription);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handleCancel = () => {
    setShowNoPasswordModal(false);
  };

  const handleContinue = async () => {
    try {
      setShowNoPasswordModal(false);
      const response = await apiHandler(
        `/settings/add-password/email`,
        "POST",
        { isCross: false },
        temporaryToken,
      );
      toast.success("email sent successfully");
      
    } catch (error) {
      console.error("Error", error);
      toast.error("email not sent");
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (temporaryToken === null) {
        return;
      }
      try {
        const response = await apiHandler(
          `/settings/account`,
          "GET",
          "",
          temporaryToken,
        ); //todo change api endpoint according to sortBy state
        
        if (response.connectedAccounts.length == 0) {
          setEmail(response.email);
        } else {
          setEmail(response.connectedAccounts[0]);
        }
        setGender(response.gender);
        setCountry(response.country || "");
        setConnectedAccounts(response.connectedAccounts);
        setConnected(response.connectedAccounts.length != 0);
        if (cookiesEmail === null || cookiesEmail === "") {
          setPasswordExist(false);
        } else {
          setPasswordExist(true);
        }
        setUserData(response);
      } catch (error) {
        console.error("Error", error);
      }
    }
    fetchData();
  }, [temporaryToken]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  const updateGender = async (newgender) => {
    const reply = {
      email: currentDescription == "" ? email : currentDescription,
      gender: newgender,
    };
    try {
      const response = await apiHandler(
        `/settings/account`,
        "PUT",
        reply,
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error", error);
    }
  };

  const updateCountry = async (newcountry) => {
    const reply = {
      email: currentDescription == "" ? email : currentDescription,
      country: newcountry,
    };
    try {
      const response = await apiHandler(
        `/settings/account`,
        "PUT",
        reply,
        temporaryToken,
      );
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const genders = ["MAN", "WOMAN"];
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Korea",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Palestine",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Korea",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
  ];
  return (
    <div className={Styles.App}>
      <div className={Styles.bigcontainer}>
        <Layout index={0} />
        <div className={Styles.sectioncontainer}>
          <div className={Styles.sectionname}>
            <h1 className={Styles.accountheader}>Account Settings</h1>
            <h3 className={Styles.subheader}>ACCOUNT PREFERENCES</h3>
            <hr className={Styles.line}></hr>
          </div>
          <Changeemailpassword
            type="Email address"
            description={currentDescription == "" ? email : currentDescription}
            display="Change"
            activate={() => {
              openEmailModal();
            }}
          />
          {showEmailModal && (
            <ChangeEmailmodal
              close={() => closeEmailModal()}
              updatetext={(newdescription) =>
                updateupdatedescription(newdescription)
              }
            />
          )}
          <Changeemailpassword
            type="Password"
            description="Password must be at least 8 characters long"
            display="Change"
            activate={() => {
              openPasswordModal();
            }}
          />
          {showPasswordModal && (
            <ChangePasswordModal
              email={currentDescription == "" ? email : currentDescription}
              close={() => closePasswordModal()}
            />
          )}
          <Changegendercountry
            list={genders}
            initialv={gender}
            type={"Gender"}
            displayedColor={"blue"}
            choose={(newgender) => updateGender(newgender)}
          />
          <Changegendercountry
            list={countries}
            initialv={country}
            type={"Country"}
            displayedColor={"blue"}
            choose={(newcountry) => updateCountry(newcountry)}
          />
          {showNoPasswordModal && (
            <div className={Styles.modaloverlay}>
              <div className={Styles.modal}>
                <button className={Styles.Xbutton} onClick={handleCancel}>
                  X
                </button>
                <h2>You don't have a password</h2>
                <p>You will be sent an email to add a password</p>
                <p>Do you want to continue?</p>
                <div className={Styles.modalbuttons}>
                  <button
                    className={Styles.cancelButton}
                    data-testid="cancelmodal"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className={Styles.discardButton}
                    onClick={handleContinue}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={Styles.sectioncontainer}>
          <div className={Styles.sectionname}>
            <h3 className={Styles.subheader}>CONNECTED ACCOUNTS</h3>
            <hr className={Styles.line}></hr>
          </div>
          <Connectbutton
            type="Google"
            description="Connect account to log in to Reddit with Google"
            email={currentDescription == "" ? email : currentDescription}
            condition={connected}
          />
        </div>
        <div className={Styles.sectioncontainer}>
          <div className={Styles.sectionname}>
            <h3 className={Styles.subheader}>DELETE ACCOUNT</h3>
            <hr className={Styles.line}></hr>
          </div>
          <Deleteaccount
            username={Username}
            passwordExist={passwordExist}
            noPassword={() => {
              setShowNoPasswordModal(true);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
