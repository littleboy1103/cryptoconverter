const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs")
const PORT=1103;
const request=require("request");


const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs'); 


app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.get("/try",(req,res)=>{
    res.redirect("/")
})

app.post("/",(req,res)=>{
    var cry=req.body.cry;
    var fiat=req.body.fiat;
    var amount=req.body.amount;
    var options={
        url:"https://apiv2.bitcoinaverage.com/convert/global",
        method:"GET",
        qs:{
            from:cry,
            to:fiat,    
            amount:amount

        }
    }
    request(options,(err,response,body)=>{
        var data=JSON.parse(body);
        var date=data.time;
        var price=data.price;
        res.render("show",{amounti:amount,cryi:cry,pricei:price,fiati:fiat})
    })
})







app.listen(PORT,()=>{
    console.log(`Server is Started on Port ${PORT}`);
    
})