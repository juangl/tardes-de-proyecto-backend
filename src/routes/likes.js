const router = require('express').Router();
const prisma = require('../database');
const { jwtCheck } = require('../auth');

router.get("/likes", async (req, res) => {
  try {
    const likes = await prisma.like.findMany();
    res.json(likes);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/posts/:postId/likes", jwtCheck, async (req, res) => {
  try {
    const postLikes = await prisma.like.findMany({
      where: { postId: req.params.postId },
      include: { user: true },
    });
    res.json(postLikes);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.get("/users/:userId/likes", jwtCheck, async (req, res) => {
  try {
    const userLikes = await prisma.like.findMany({
      where: { postId: req.params.userId },
    });
    res.json(userLikes);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/posts/:postId/likes", jwtCheck, async (req, res) => {
  try {
    const likePost = await prisma.like.create({
      data: {
        userId: req.user.id,
        postId: req.params.postId,
      },
    });
    res.json(likePost);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
