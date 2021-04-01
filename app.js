const express = require("express");
const app = express();
const port = 3000;

let idCount = 0;
const postIds = [];

function createPost(postData) {
  let currentId = ++idCount;
  postIds.push(currentId);

  return {
    id: currentId,
    created_at: new Date(),
    // spread operator
    ...postData,
  };
}

const firstPost = createPost({
  title: 'first post',
  body: 'this is the content',
});

const posts = {
  // computed key ES6
  [firstPost.id]: firstPost,
};

// collection of posts
app.get("/posts", (req, res) => {
  // map transforms an array like: [1, 2, 3] => [1, 4, 9]
  // [1, 2, 3] => [{id: ...}, {id: ...}, { id: ...}]
  // Object.values(posts); // [{}, {}, {}]; does something similar but with no
  // order guaranteed
  const postList = postIds.map((postId) => posts[postId]);
  res.json(postList);
});

app.post("/posts", (req, res) => {
  const newPost = createPost({
    title: "second post",
    body: "here's the content",
  });

  posts[newPost.id] = newPost;
  
  res.json(newPost);
});

// start our server
app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
