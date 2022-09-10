const express = require("express");
const bodyParser = require("body-parser");

const app = express();

let items= [];

app.set('view engine', 'ejs');

let today = new Date();

    var options = {
        weekday : "long",
        day : "numeric",
        month : "long"
    };

    let day = today.toLocaleDateString("en-US" , options);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
    items = [];

    res.render('list' , {KindOfDay: day, newlistitems : items});
});

app.get("/added",(req,res) => {
    res.render('list', {KindOfDay: day, newlistitems: items});
})

app.post("/" , function(req , res) {
    var item = req.body.newItem;
    
    items.push(item);

    res.redirect("/added");
})

app.listen(process.env.PORT || 3000, function () {
    console.log("Port started at port 3000");
});

