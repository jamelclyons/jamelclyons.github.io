import admin from 'firebase-admin';
import serviceAccount from './serviceAccount.json'; // Update the path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Set admin claim
async function setAdminClaim(uid) {
  try {
    if (!uid) {
      throw new Error("A UID must be provided to set the 'isAdmin' claim.");
    }

    // Set custom claims for the user
    await admin.auth().setCustomUserClaims(uid, { isAdmin: true });

    console.log(`Custom claim 'isAdmin' added to user ${uid}`);
  } catch (error) {
    console.error('Error setting admin claim:', error.message);
  }
}

// Extract UID from command-line arguments
const uid = process.argv[2];

// Example usage
setAdminClaim(uid);