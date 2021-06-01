const router = require('express').Router();
const prisma = require('../database');
const { createToken } = require('../auth');

router.post("/register", async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    res.json({ access_token: createToken(user.username, user.id) });
  } catch (e) {
    if (e.code === "P2002") {
      res.json({ message: "El nombre de usuario ya existe" });
    } else {
      res.status(500).json({ message: "Error" });
    }
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({ include: { posts: true } });
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: "Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        username: req.body.username,
        password: req.body.password,
      },
    });
    if (user) {
      res.json({ access_token: createToken(user.username, user.id) });
    } else {
      res
        .status(404)
        .json({ message: "El usuario o la contraseña son incorrectas" });
    }
  } catch (e) {
    console.log('🚀 ~ router.post ~ e', e);
    res.status(500).json({ message: "Error" });
  }
});

module.exports = router;
