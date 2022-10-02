/*const express = require('express')
const app = express()
const port = 3000

const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore} = require('firebase-admin/firestore');

var serviceAccount = require("./key.json");

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World! weuigfbsjg')
})

app.get('/signup', (req, res) => {
  res.render("signup")
})



app.get("/signupsubmit",(req,res)=>{
  const first_name= req.query.first_name;
  const last_name=req.query.last_name;
  const email= req.query.email;
  const password=req.query.password;

  
  //Adding new data to collection
  db.collection('users').add({
    name: first_name + last_name,
    email:email,
    password:password
  }).then(()=>{
    res.send("Signup Successfull");
  })
})


app.get('/signin', (req, res) => {
  res.render("signin")
})




app.get('/signinsubmit', (req, res) => {
  const email= req.query.emil;
  const password=req.query.passwrd;
  console.log(email);
  console.log(password);

  db.collection("Users")
    .where('email', '==', email)
    .where('password',"==",password)
    .get()
    .then((docs)=>{
      console.log(docs);
      console.log(docs.size);
      if(docs.size>0){
        res.render("home")
      }
      res.send("Poduko");
    })
})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

*/



const express = require('express');
const app = express();
const port = 3000;

const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

var serviceAccount = require("./key.json");

initializeApp({
    credential: cert(serviceAccount),
}); 

const db = getFirestore();
 
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.send('Hellow World!.. how an i');
 });

app.get("/signup", (req, res) => {
    res.render('signup');
 });
 
app.get('/signupsubmit', (req, res) => {
    
    const full_name = req.query.full_name;
    const last_name = req.query.last_name;
    const email = req.query.emil;
    const password = req.query.passwrd;
    
    //Adding data to the collection
    // sample comment
    db.collection('users')
    .add({
        name: full_name + last_name,
        email:email,
        password: password,
    })
    .then(() => {
        res.send("SignUP successfully");
    });
});

app.get("/signin", (req, res) => {
    res.render('signin');
 }); 

 app.get('/signinsubmit', (req, res) => {
    const email = req.query.emil;
    const password = req.query.passwrd;
    
    db.collection("users")
        .where("email", "==", email)
        .where("password", "==", password)
        .get()
        .then((docs) => {
          console.log(docs);
          console.log(docs.size);
            if(docs.size>0){
              
             var usersData=[];
                db.collection('users')
                .get()
                .then((docs)=>{
                      docs.forEach((doc)=>{
                        usersData.push(doc.data());
                      })
                    }).then(()=>{
                        console.log(usersData)
                        res.render("home" ,{userData : usersData});
                      })
                


            
            }else{
                res.send("login failed");
            }
        
        });
 });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
 });

