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
    const posts = await prisma.post.findMany({ include: { author: true } });
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
        authorId: req.body.userId,
      },
    });
    res.json(response);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.get("/posts/:postId", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.postId,
      },
    });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.put("/posts/:postId", async (req, res) => {
  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: req.params.postId,
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
        id: req.params.postId,
      }
    });
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.post("/register", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.json(user);
  } catch (e) {
    if (e.code === 'P2002') {
      res.json({ message: 'El nombre de usuario ya existe' });
    } else {
      res.status(500).json({ message: 'Error' });
    }
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { posts: true } });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (user) {
      res.json({ message: 'El usuario se loggeo correctamente' });
    } else {
      res.status(404).json({ message: 'El usuario o la contraseña son incorrectas' });
    }
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
});

// start our server
app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
