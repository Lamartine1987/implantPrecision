
import { initializeApp, getApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";
import { getAuth, type Auth } from "firebase/auth";

// TODO: IMPORTANT!
// The following configuration uses the values you provided.
// However, you MUST still replace "YOUR_DATABASE_URL_FOR_REALTIME_DATABASE"
// with your actual Firebase Realtime Database URL.
const firebaseConfig = {
  apiKey: "AIzaSyAVrjCR7dHh-L2EymjSW3CQYsmIiZLvU8I",
  authDomain: "implantprecision.firebaseapp.com",
  databaseURL: "https://implantprecision-default-rtdb.firebaseio.com/", // URL atualizada
  projectId: "implantprecision",
  storageBucket: "implantprecision.appspot.com", // Corrigido de .firebasestorage.app
  messagingSenderId: "968837496835",
  appId: "1:968837496835:web:5ac533d74b499653864e36",
  measurementId: "G-R46PNNTZBB"
};

// **Explicit checks for ALL critical placeholder values**
if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("YOUR_API_KEY") || firebaseConfig.apiKey.includes("COLE_SUA_API_KEY_AQUI")) {
  throw new Error(
    "Firebase API Key is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_API_KEY' or 'COLE_SUA_API_KEY_AQUI' with your actual Firebase API Key. " +
    "You can find this in your Firebase project settings: Go to Project Overview (gear icon) > Project settings > General tab > Your apps section > Select your web app > SDK setup and configuration."
  );
}
if (!firebaseConfig.authDomain || firebaseConfig.authDomain.includes("YOUR_AUTH_DOMAIN") || firebaseConfig.authDomain.includes("COLE_SEU_AUTH_DOMAIN_AQUI")) {
  throw new Error(
    "Firebase Auth Domain is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_AUTH_DOMAIN' or 'COLE_SEU_AUTH_DOMAIN_AQUI' with your actual Firebase Auth Domain. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
// Updated check to ensure databaseURL is not a placeholder AND is not empty
if (!firebaseConfig.databaseURL || firebaseConfig.databaseURL.includes("YOUR_DATABASE_URL_FOR_REALTIME_DATABASE") || firebaseConfig.databaseURL.includes("COLE_SUA_DATABASE_URL_AQUI") || firebaseConfig.databaseURL.trim() === "") {
  throw new Error(
    "Firebase Realtime Database URL is not configured correctly in src/lib/firebase.ts. " +
    "It might still be a placeholder like 'YOUR_DATABASE_URL_FOR_REALTIME_DATABASE' or 'COLE_SUA_DATABASE_URL_AQUI', or it could be empty. " +
    "Please provide your actual Firebase Realtime Database URL. " +
    "You can find this in your Firebase project settings under Build > Realtime Database (the URL is at the top)."
  );
}
if (!firebaseConfig.projectId || firebaseConfig.projectId.includes("YOUR_PROJECT_ID") || firebaseConfig.projectId.includes("COLE_SEU_PROJECT_ID_AQUI")) {
  throw new Error(
    "Firebase Project ID is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_PROJECT_ID' or 'COLE_SEU_PROJECT_ID_AQUI' with your actual Firebase Project ID. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.storageBucket || firebaseConfig.storageBucket.includes("YOUR_STORAGE_BUCKET") || firebaseConfig.storageBucket.includes("COLE_SEU_STORAGE_BUCKET_AQUI")) {
  throw new Error(
    "Firebase Storage Bucket is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_STORAGE_BUCKET' or 'COLE_SEU_STORAGE_BUCKET_AQUI' with your actual Firebase Storage Bucket. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.messagingSenderId || firebaseConfig.messagingSenderId.includes("YOUR_MESSAGING_SENDER_ID") || firebaseConfig.messagingSenderId.includes("COLE_SEU_MESSAGING_SENDER_ID_AQUI")) {
  throw new Error(
    "Firebase Messaging Sender ID is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_MESSAGING_SENDER_ID' or 'COLE_SEU_MESSAGING_SENDER_ID_AQUI' with your actual Firebase Messaging Sender ID. " +
    "This is also found in your Firebase project settings (SDK setup and configuration)."
  );
}
if (!firebaseConfig.appId || firebaseConfig.appId.includes("YOUR_APP_ID") || firebaseConfig.appId.includes("COLE_SEU_APP_ID_AQUI")) {
  throw new Error(
    "Firebase App ID is not configured correctly in src/lib/firebase.ts. " +
    "Please replace 'YOUR_APP_ID' or 'COLE_SEU_APP_ID_AQUI' with your actual Firebase App ID. " +
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
