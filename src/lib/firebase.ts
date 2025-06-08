
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";
import { getAuth, type Auth } from "firebase/auth";

// TODO: IMPORTANT!
// Replace the following with your actual Firebase project configuration.
// You can find this in your Firebase project settings.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL_FOR_REALTIME_DATABASE",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// **Explicit checks for ALL critical placeholder values**
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_API_KEY")) {
  throw new Error(
    "Firebase API Key is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_API_KEY' with your actual Firebase API Key. " +
    "You can find this in your Firebase project settings: Go to Project Overview (gear icon) > Project settings > General tab > Your apps section > Select your web app > SDK setup and configuration."
  );
}
if (!firebaseConfig.authDomain || firebaseConfig.authDomain.includes("YOUR_AUTH_DOMAIN")) {
  throw new Error(
    "Firebase Auth Domain is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_AUTH_DOMAIN' with your actual Firebase Auth Domain. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.databaseURL || firebaseConfig.databaseURL.includes("YOUR_DATABASE_URL_FOR_REALTIME_DATABASE")) {
  throw new Error(
    "Firebase Realtime Database URL is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_DATABASE_URL_FOR_REALTIME_DATABASE' with your actual Firebase Realtime Database URL. " +
    "You can find this in your Firebase project settings under Build > Realtime Database (the URL is at the top)."
  );
}
if (!firebaseConfig.projectId || firebaseConfig.projectId.includes("YOUR_PROJECT_ID")) {
  throw new Error(
    "Firebase Project ID is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_PROJECT_ID' with your actual Firebase Project ID. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.storageBucket || firebaseConfig.storageBucket.includes("YOUR_STORAGE_BUCKET")) {
  throw new Error(
    "Firebase Storage Bucket is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_STORAGE_BUCKET' with your actual Firebase Storage Bucket. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.messagingSenderId || firebaseConfig.messagingSenderId.includes("YOUR_MESSAGING_SENDER_ID")) {
  throw new Error(
    "Firebase Messaging Sender ID is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_MESSAGING_SENDER_ID' with your actual Firebase Messaging Sender ID. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.appId || firebaseConfig.appId.includes("YOUR_APP_ID")) {
  throw new Error(
    "Firebase App ID is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_APP_ID' with your actual Firebase App ID. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}


let app: FirebaseApp;
let auth: Auth;
let db: Database;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

auth = getAuth(app);
db = getDatabase(app);

export { app, auth, db };
