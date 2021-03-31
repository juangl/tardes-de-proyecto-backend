const express = require("express");
const app = express();
const port = 3000;

const posts = [
  {
    title: "first post",
    created_at: new Date(),
    body: "here's the content",
  },
];

// main route
app.get("/posts", (req, res) => {

  res.json(posts);

});

app.get("/posts/create", (req, res) => {
  const newPost = {
    title: "second post",
    created_at: new Date(),
    body: "here's the content",
  };

  posts.push(newPost);
  
  res.json(newPost);
});

// start our server
app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
