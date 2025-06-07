const express = require("express");
const app = express();
const port = process.env.PORT || 8080; // Use Render's PORT if available
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

// Fake in-memory database
let posts = [
  {
    id: uuidv4(),
    username: "Peter Parker",
    content: "I love coding!"
  },
  {
    id: uuidv4(),
    username: "Archit Mathur",
    content: "I love to Connect Different People!"
  },
  {
    id: uuidv4(),
    username: "Harsh Pareek",
    content: "I love to enjoy my life!"
  },
  {
    id: uuidv4(),
    username: "Ankit Mena",
    content: "I love Body Building!"
  },
  {
    id: uuidv4(),
    username: "Marvel",
    content: "Can achieve anything if you really want that!"
  }
];

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Template engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/posts"); // Redirect homepage to posts
});

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect("/posts");
});

// Start server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
