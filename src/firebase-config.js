import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXAo67UexW8jq1jxdr1thZ4dyuhWCI0oE",
  authDomain: "machine-test-3273d.firebaseapp.com",
  projectId: "machine-test-3273d",
  storageBucket: "machine-test-3273d.appspot.com",
  messagingSenderId: "509800054906",
  appId: "1:509800054906:web:a1ab09f32d304ac1797bc3",
  measurementId: "G-CDXQE1X8F4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
