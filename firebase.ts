import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/storage";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);

  if (process.env.NODE_ENV === "development") {
    // @ts-ignore the disableWarnings option is not typed.
    firebase.auth().useEmulator("http://localhost:9099", { disableWarnings: true });
    firebase.firestore().useEmulator("localhost", 8080);
    firebase.storage().useEmulator("localhost", 9199);
  } 

  if (
    typeof window !== "undefined" &&
    typeof document !== "undefined" &&
    typeof navigator !== "undefined"
  ) {
    firebase.analytics();
    firebase
      .firestore()
      .enablePersistence()
      .catch((err) => {
        if (err.code == "failed-precondition") {
          console.log("Are you using multiple tabs?");
        } else if (err.code == "unimplemented") {
          console.log(
            "You should consider updating to a modern browser, if possible."
          );
        }
      });
  }
}

/**
 * firebase
 */
export { firebase };
