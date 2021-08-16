import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      JSON.parse(process.env.FIREBASE_ADMIN_JSON as string)
    ),
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  });
}

export { firebaseAdmin };
