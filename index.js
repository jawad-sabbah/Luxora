const express=require('express')
const app=express()
const port=3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')
app.use(express.static('public'));



const authRoutes=require('./Routes/authRoutes')
const contactRoutes=require('./Routes/contactRoutes')
const aboutRoutes=require('./Routes/aboutRoutes')

app.use('/',authRoutes)
app.use('/',contactRoutes)
app.use('/',aboutRoutes)

app.get('/',(req,res)=>{
  res.render('home')
})

app.listen(port,()=>{
  console.log(` app listening at http://localhost:${port}`)
})
