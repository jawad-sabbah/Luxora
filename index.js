const express=require('express')
const app=express()
const port=3000
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./db'); 


app.use(session({
   store: new pgSession({
       pool: pool,
       tableName: 'session',
       createTableIfMissing: true
   }),
   secret: 'your-secret-key',
   resave: false,
   saveUninitialized: false,
   cookie: {
       maxAge: 24 * 60 * 60 * 1000 
   }
}));



app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');
  next();
});


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static('public'));



const authRoutes=require('./Routes/authRoutes')
const contactRoutes=require('./Routes/contactRoutes')
const aboutRoutes=require('./Routes/aboutRoutes')
const hotelRoutes=require('./Routes/hotelsRoutes')
const hostRoutes=require('./Routes/hostRoutes')
const adminRoutes=require('./Routes/adminRoutes')

app.use('/',authRoutes)
app.use('/',contactRoutes)
app.use('/',aboutRoutes)
app.use('/hotels',hotelRoutes)
app.use('/',hostRoutes)
app.use('/',adminRoutes)

app.get('/',(req,res)=>{
  res.render('home',{user: req.session.user || null }); 
})

app.get('/check-session', (req, res) => {
  res.json({ loggedIn: !!req.session.user });
});


app.listen(port,()=>{
  console.log(` app listening at http://localhost:${port}`)
})