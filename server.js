const express=require('express');
const { initializeApp } = require('firebase/app');
const {getAuth,signInWithEmailAndPassword,signOut,signInWithCustomToken}=require('firebase/auth');
const app=express();
app.set("view engine","ejs");
// to acces body data
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyCK_yJ7nnTIeV0NEKNA5BA4uxvwqVyXdyc",
  authDomain: "sonnyny-2c71b.firebaseapp.com",
  projectId: "sonnyny-2c71b",
  storageBucket: "sonnyny-2c71b.appspot.com",
  messagingSenderId: "379834532772",
  appId: "1:379834532772:web:640c719063f5e045d0b731",
  measurementId: "G-49WXXKD0HG"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth=getAuth(firebaseApp);



app.get("/",(req,res) => {
   // res.json({message:"goodJob"});
    res.render("index");
})


app.post("/login",async(req,res) => {
     const {email,password}=req.body;
    try {
        const userCredential=await signInWithEmailAndPassword(auth,email,password).then(({ user }) => {
          return user.getIdToken();
        });
        // req.header('Authorization')=userCredential;
        res.json({userCredential});
    } catch (error) {
        res.json({error});
    }
 })
 

 
 app.post("/login_custom",async(req,res) => {
  const {customtoken}=req.body;
 try {
     const userCredential=await signInWithCustomToken(auth,customtoken).then(({ user }) => {
         return user;
       });

     res.json({userCredential});
 } catch (error) {
     res.json({error});
 }
})
 app.get("/logout",async(req,res) => {
    // res.json({message:"goodJob"});
    await auth.signOut();
   // request logout endpoint 
 })
 
 


app.listen(3000,() => {
    console.log(`Magic happening on http://localhost:3000`);

});