const router = require('express').Router();
const prisma = require('../database');
const { jwtCheck } = require('../auth');

router.get("/", async (req, res) => {
  try {
    const posts = await prisma.post.findMany({ include: { author: true } });
    res.json(posts);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/", jwtCheck, async (req, res) => {
  try {
    const response = await prisma.post.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        authorId: req.user.id,
      },
    });
    res.json(response);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/:postId", async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.postId,
      },
    });
    res.json(post);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.put("/:postId", async (req, res) => {
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
    res.status(500).json({ message: "Error" });
  }
});

router.delete("/:postId", async (req, res) => {
  try {
    const updatedPost = await prisma.post.delete({
      where: {
        id: req.params.postId,
      },
    });
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
