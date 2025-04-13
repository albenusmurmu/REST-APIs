const express = require("express");
const app = express();
const port = 8080;
// reuire path like a views, public
const path = require("path");
// automatically add new id for adding new posting
const { v4: uuidv4 } = require('uuid');
// Method Override
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true}));
app.use(methodOverride('_method'));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// routings

app.get("/posts", (req,res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new",(req,res) => {
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content})
    res.redirect("/posts"); // this method is directly redirect to the posts page after Add new users
});

app.get("/posts/:id",(req,res) => {
    let {id} = req.params; //to get id
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs",{post});
    // console.log(post);
});

app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    // console.log(post);
    res.redirect("/posts");
});
 
app.get("/posts/:id/edit", (req,res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id",(req,res) => {
    let { id } = req.params;
     posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
})

// create a Posts because here we aren't used dadabase thats why it works similer to work like database

let posts = [
    {
        id : uuidv4(), // give random id at a time
        username : "Peter Parker",
        content : "I love coding!"
    },
    {
        id : uuidv4(),
        username : "Archit Mathur",
        content : "I love to Connect Defferent People!"
    },
    {
        id : uuidv4(),
        username : "Harsh Pareek",
        content : "I love to enjoy my life!"
    },
    {
        id : uuidv4(),
        username : "Ankit Mena",
        content : "I love Body Building!"
    },
    {
        id : uuidv4(),
        username : "Marvel",
        content : "Can be Achieve anything if you really want that!"
    },
];


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

