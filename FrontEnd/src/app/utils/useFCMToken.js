import { getMessaging, getToken } from "firebase/messaging";
import firebaseApp from "../../../firebase";
import handler from "./apiHandler";
import storeFCM from "./storeNotificationInfo";
import { AppRegistration } from "@mui/icons-material";

const useFcmToken = async (token, permission) => {
  try {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (permission === "granted") {
        const localRegistration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
        ); // Register service worker only if permission granted
        await navigator.serviceWorker.ready;
        const firebaseRegistration = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js",
          { scope: "/firebase-cloud-messaging-push-scope" },
        );
        await navigator.serviceWorker.ready;
        const messaging = getMessaging(firebaseApp);
        await navigator.serviceWorker.ready;
        const currentToken = await getToken(messaging, {
          vapidKey:
            "BDdxkpSfsZfMF7ZyPklut-xQVgp6HH8GkJnTRHXGlsGv6u3oDujnIiqPF9_iqq_POtjU8tLuEISutYyAiyZC7dw",
        });
        if (currentToken) {
          storeFCM(currentToken);
          const response = await handler(
            `/notifications/subscribe`,
            "POST",
            { fcmToken: currentToken },
            token,
          );
        } else {
          console.log(
            "No registration token available. Request permission to generate one.",
          );
        }
      } else {
        
        storeFCM("");
      }
    }
  } catch (error) {
    
  }
};

export default useFcmToken;
