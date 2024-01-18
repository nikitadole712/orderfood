const mongoose= require("mongoose");
const mongoURL= 'mongodb+srv://nikitavmaral:user1234@cluster0.hpkjlul.mongodb.net/Food4U?retryWrites=true&w=majority'
module.exports = function (callback){
mongoose.connect(mongoURL, {useUnifiedTopology:true, useNewUrlParser:true})
var db = mongoose.connection
db.on('connected',()=>{
    console.log('Mongodb Connection Successful');
    const foodCollection = mongoose.connection.db.collection("food_items");
            foodCollection.find({}).toArray(async function (err, data) {
                const categoryCollection = await mongoose.connection.db.collection("Categories");
                categoryCollection.find({}).toArray(async function (err, Catdata) {
                    callback(err, data, Catdata);
        })

    })
})
db.on('error',()=>{
    console.log('Mongodb Connection Failed')
})
}