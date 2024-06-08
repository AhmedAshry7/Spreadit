"use client";

import getCookies from "./getCookies";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "../../../firebase";
import { useEffect } from "react";

export default function FcmTokenComp({ onReceive }) {
  useEffect(() => {
    async function getFCM() {
      const cookies = await getCookies();
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        if (cookies.FCM_token.length !== 0) {
          const messaging = getMessaging(firebaseApp);
          const unsubscribe = onMessage(messaging, () => onReceive());
          return () => {
            unsubscribe(); // Unsubscribe from the onMessage event on cleanup
          };
        }
      }
    }
    getFCM();
  }, []);

  return null; // This component is primarily for handling foreground notifications
}
