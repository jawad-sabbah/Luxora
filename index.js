const express=require('express')
const app=express()
const port=3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.set('view engine','ejs')


const authRoutes=require('./Routes/authRoutes')

app.use('/',authRoutes)


app.get('/',(req,res)=>{
  res.render('home')
})

app.listen(port,()=>{
  console.log(` app listening at http://localhost:${port}`)
})
