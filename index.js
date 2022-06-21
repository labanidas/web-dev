const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require('lodash');
const date = require(__dirname + "/date.js");
const app = express();
app.use(express.static(__dirname + "/public")); //public static files

//initializing lists
// var items$ = [];
// let workList = [];
app.set("view engine", "ejs"); //setting up ejs file
app.use(bodyParser.urlencoded({ extended: true })); //using body-parser

mongoose.connect("mongodb://localhost:27017/todolistDB"); //connecting mongodb

//creating item schema
const itemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Item = mongoose.model("items", itemsSchema);

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  items: [itemsSchema]
});

const List = mongoose.model("list", listSchema);

// // inserting items
// const day1 = new Item({
//   name: "Day 1",
// });

// const day2 = new Item({
//   name: "Day 2",
// });

// const day3 = new Item({
//   name: "Day 3",
// });

// const defaultItems = [day1,day2,day3];
// console.log(defaultItems);
// Item.insertMany([day1,day2,day3], (err)=>{
//   if(err) console.log(err);
//   else console.log("Succesfully added!");
// })

app.get("/", (req, res) => {
  //getting current day-date
  let day = date();
  //getting items rendered
  Item.find({}, (err, elements) => {
    if (err) console.log(err);
    else {
      res.render("list", { listTitle: "Today", itemList$: elements });
    }
  });
});

//adding new item
app.post("/", (req, res) => {

  // if (req.body.list === "Work") {
  //   workList.push(req.body.newItem);
  //   res.redirect("/work");
  // } else {
  //   items$.push(req.body.newItem);
  //   res.redirect("/");
  // }

  //new item
  const {newItem, list } = req.body;
  const item = new Item({
    name: newItem
  });
  if(list === "Today" ){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name: list}, (err, result)=>{
      if(err) console.log(err);
      else{
        result.items.push(item);
        result.save();
        res.redirect("/"+list);
      }
      
    })
    
  }

  
});

app.post('/delete', (req,res)=>{

  const {listTitle, checkbox } = req.body;
  console.log(listTitle+" "+checkbox);
  if(listTitle === "Today"){
    Item.findByIdAndRemove(req.body.checkbox, (err)=>{
      if(err) console.log(err);
      else res.redirect("/");
      })
  }else{

    List.findOneAndUpdate({name:listTitle}, {$pull: {items: {_id:checkbox}}}, (err, result)=>{
      if(!err) res.redirect("/"+listTitle);
    })
  }
  
  
})

// app.get("/work", (req, res) => {
//   res.render("list", { listTitle: "Work List", itemList$: workList });
// });

app.get('/:name', (req,res)=>{
  const paramName = _.capitalize(req.params.name);
  
  List.findOne({name:paramName},(err, result)=>{
    if(err) console.log(err);
    else{
      if(!result){
        const list = new List({
          name: paramName,
          items: []
        });
        list.save();
        res.redirect("/");
      }else {
        res.render("list", { listTitle: result.name, itemList$: result.items });
      }
      }
  })
})

app.listen(3000, () => {
  console.log("running...");
});
