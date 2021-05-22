const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

const users = require('./routes/users');
const posts = require('./routes/posts');
const likes = require('./routes/likes');

// express config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/', users);
app.use('/posts', posts);
app.use('/', likes);

// start our server
app.listen(port, () => {
  console.log(`server running in http://localhost:${port}`);
});
