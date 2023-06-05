global.foodData = require('./db.js')(function call(err, data, CatData) {
    if(err) console.log(err);
    global.foodData = data;
    global.foodCategory = CatData;
  })

const express= require('express');
const db =require ('./db.js')
const app = express();
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get("/",(req,res)=>{
    res.send("Server working");
});
app.use(express.json())
app.use('/api/', require("./models/Routes/createUser"))
app.use('/api/', require("./models/Routes/DisplayData"))

const port= process.env.PORT || 5000;
app.listen(port,()=>'Server running on port');