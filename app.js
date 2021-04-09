const express = require("express");
const { PrismaClient } = require("@prisma/client");
const app = express();
const port = 3000;

const prisma = new PrismaClient()

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/posts", async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.post("/posts", async (req, res) => {
  try {
    const response = await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });
    console.log(response);
    res.json(response);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.put("/posts/:postId", async (req, res) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: +req.params.postId,
      },
      data: {
        title: req.body.title,
        body: req.body.body,
      },
    });
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.delete("/posts/:postId", async (req, res) => {
  try {
    const updatedPost = await prisma.post.delete({
      where: {
        id: +req.params.postId,
      }
    });
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});


// collection of posts
/*
app.get("/posts", (req, res) => {
  // map transforms an array like: [1, 2, 3] => [1, 4, 9]
  // [1, 2, 3] => [{id: ...}, {id: ...}, { id: ...}]
  // Object.values(posts); // [{}, {}, {}]; does something similar but with no
  // order guaranteed
  const postList = postIds.map((postId) => posts[postId]);
  res.json(postList);
});

// RESTful: endpoints
app.post("/posts", (req, res) => {
  const newPost = createPost({
    title: req.body.title,
    body: req.body.body,
  });

  posts[newPost.id] = newPost;
  
  res.json(newPost);
});

app.put("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  if (posts[postId]) {
    const updatedPost = updatePost(postId, req.body);
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Eh, cabrón, este id no existe. Ahí te encargo para la próxima. Salu2 pelu2.' })
  }
});

app.delete("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  if (posts[postId]) {
    delete posts[req.params.postId];
    postIds = postIds.filter(id => id !== +req.params.postId);

    res.json({ message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ message: 'Eh, cabrón, este id no existe. Ahí te encargo para la próxima. Salu2 pelu2.' })
  }
}); */

/*
let idCount = 0;
let postIds = [];

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
}); */

/*

const posts = {
  // computed key ES6
  [firstPost.id]: firstPost,
};

function updatePost(postId, postUpdated) {
  posts[postId] = {
    ...posts[postId],
    ...postUpdated,
  };

  return posts[postId];
}

  Endpoints
    Posts
      [x] GET
      [x] POST
      [x] PUT
      [x] DELETE

// collection of posts
app.get("/posts", (req, res) => {
  // map transforms an array like: [1, 2, 3] => [1, 4, 9]
  // [1, 2, 3] => [{id: ...}, {id: ...}, { id: ...}]
  // Object.values(posts); // [{}, {}, {}]; does something similar but with no
  // order guaranteed
  const postList = postIds.map((postId) => posts[postId]);
  res.json(postList);
});

// RESTful: endpoints
app.post("/posts", (req, res) => {
  const newPost = createPost({
    title: req.body.title,
    body: req.body.body,
  });

  posts[newPost.id] = newPost;
  
  res.json(newPost);
});

app.put("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  if (posts[postId]) {
    const updatedPost = updatePost(postId, req.body);
    res.json(updatedPost);
  } else {
    res.status(404).json({ message: 'Eh, cabrón, este id no existe. Ahí te encargo para la próxima. Salu2 pelu2.' })
  }
});

app.delete("/posts/:postId", (req, res) => {
  const postId = req.params.postId;
  if (posts[postId]) {
    delete posts[req.params.postId];
    postIds = postIds.filter(id => id !== +req.params.postId);

    res.json({ message: 'Post deleted successfully' });
  } else {
    res.status(404).json({ message: 'Eh, cabrón, este id no existe. Ahí te encargo para la próxima. Salu2 pelu2.' })
  }
});

*/

// start our server
app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
