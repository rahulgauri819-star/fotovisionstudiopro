// ═══════════════════════════════════════════════════════════
//  FOTOVISION STUDIO PRO — Firebase Configuration
//  Replace the firebaseConfig object with YOUR project values
//  from: https://console.firebase.google.com
// ═══════════════════════════════════════════════════════════

// ⚠️  INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project called "fotovision-studio"
// 3. Add a Web App (</> icon)
// 4. Copy your firebaseConfig values below
// 5. In Firestore → Rules, set:
//    rules_version = '2';
//    service cloud.firestore {
//      match /databases/{database}/documents {
//        match /{document=**} {
//          allow read, write: if true;
//        }
//      }
//    }

const FIREBASE_CONFIG = {
  apiKey:            "YOUR_API_KEY",
  authDomain:        "YOUR_PROJECT.firebaseapp.com",
  projectId:         "YOUR_PROJECT_ID",
  storageBucket:     "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId:             "YOUR_APP_ID"
};

// ── Role passwords (change these!) ──────────────────────────
const ROLE_PASSWORDS = {
  owner:  "owner123",
  staff:  "staff123",
  framer: "framer123"
};

// ── Firebase SDK ─────────────────────────────────────────────
import { initializeApp }                   from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, doc,
         addDoc, updateDoc, deleteDoc,
         onSnapshot, query, orderBy,
         serverTimestamp }                 from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

let app, db, unsubscribe = null;

function initFirebase() {
  try {
    app = initializeApp(FIREBASE_CONFIG);
    db  = getFirestore(app);
    return true;
  } catch(e) {
    console.error("Firebase init failed:", e);
    return false;
  }
}

export { FIREBASE_CONFIG, ROLE_PASSWORDS, initFirebase, db,
         collection, doc, addDoc, updateDoc, deleteDoc,
         onSnapshot, query, orderBy, serverTimestamp };
