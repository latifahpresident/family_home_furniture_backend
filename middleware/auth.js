const admin = require("firebase-admin");
const Users = require("./../models/users");

admin.initializeApp({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_APP_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
}
 
);

const auth = (req, res, next) => {
  const idToken = req.headers.authorization;
     // verify:
     if (idToken) {
        // verify:
        admin
          .auth()
          .verifyIdToken(idToken)
          .then(decodedIdToken => {
            // verify ok
            req.user = decodedIdToken;
            return next();
          })
          .catch(error => {
            console.error("Error while verifying Firebase ID token:", error);
            res.status(403).send("Unauthorized");
          });
      } else {
        res.status(401).json({
          message: "Log in and provide token to view this content."
        });
};
};

async function checkadmin (req, res, next) {
  try {
    const idToken = req.headers.authorization;
    console.log(idToken)
    if (idToken) {
       // verify:
       admin
         .auth()
         .verifyIdToken(idToken)
         .then(decodedIdToken => {
           // verify ok
           const uid = decodedIdToken.uid;
           console.log("backend uid", uid)

          Users.userById(uid).then(user => {
            if (user.admin === true) {
              console.log("backend user", user)
             return next();
            } else {
              res.status(403).json({message: "You must be an admin to access this route"})
            }
          })
         
         })
         .catch(error => {
           console.error("Error while verifying Firebase ID token:", error);
           res.status(403).send("Unauthorized");
         });
     } else {
       res.status(401).json({
         message: "Log in and provide token to view this content."
       });
};
  } catch(err) {
    res.status(500).json({message: "Error while checking users role: ", err})
  }
}
module.exports = {
  auth,
checkadmin
};