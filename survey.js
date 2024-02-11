// survey.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDuF86f7gEYfE8MvDffCc2yhg0bThDGTgM",
    authDomain: "byte-size-visions.firebaseapp.com",
    projectId: "byte-size-visions",
    storageBucket: "byte-size-visions.appspot.com",
    messagingSenderId: "404914820138",
    appId: "1:404914820138:web:6e84dd25c2533221581f53",
    measurementId: "G-3GSQX03LX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        const userId = user.uid;
        const surveyForm = document.getElementById('userSurveyForm');
        const submitBtn = document.querySelector('.submitSurveyBtn');

        // Add event listener for the submit button
        submitBtn.addEventListener('click', () => {
            // Get selected values from the survey form
            const question1Value = surveyForm.elements['question1'].value;
            const question2Value = surveyForm.elements['question2'].value;
            // Repeat similar lines for other questions

            // Save the survey responses to Firestore under the user's ID
            saveSurveyResponses(userId, { question1: question1Value, question2: question2Value /* add other questions */ });
        });
    } else {
        // User is signed out
        console.log('User is signed out');
    }
});

// Function to save survey responses to Firestore
async function saveSurveyResponses(userId, responses) {
    const userDocRef = doc(db, 'users', userId);

    // Update the user document with survey responses
    await updateDoc(userDocRef, {
        surveyResponses: responses,
    });

    console.log('Survey responses saved to Firestore');
}
