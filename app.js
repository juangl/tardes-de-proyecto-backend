const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('<h2>hola</h2>');
});

app.listen(port, () => {
    console.log(`server running in http://localhost:${port}`);
})