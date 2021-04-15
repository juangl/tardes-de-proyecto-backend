const express = require("express");

const app = express();
const port = 3000;

const users = require('./routes/users');
const posts = require('./routes/posts');
const likes = require('./routes/likes');

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', users);
app.use('/posts', posts);
app.use('/', likes);

// start our server
app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
