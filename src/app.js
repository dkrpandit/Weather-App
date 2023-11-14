const express = require("express")
const path  = require("path")
const app = express();
const hbs = require('hbs');
const port =  process.env.PORT || 5000

const pathName = path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../src/template/views")
const partials_path = path.join(__dirname,"../src/template/partials")

console.log(`path name public ${pathName}`)
console.log(`template_path name public ${template_path}`)
console.log(`template_path name public ${partials_path}`)
app.set('view engine', 'hbs');
app.set('views', template_path);
app.use(express.static(pathName));
hbs.registerPartials(partials_path);
app.get("/",(req,res)=>{
    res.render('index')
})
app.get("/index",(req,res)=>{
    res.render('index')
})
app.get("/weather",(req,res)=>{
    res.render("weather")
})
app.get("/about",(req,res)=>{
    // res.send("about page")
    res.render('about')
})
app.get("*",(req,res)=>{
    res.render("errorPage")
})

app.listen(port,()=>{
 console.log(`Website is live at post ${port}`)
})
// 