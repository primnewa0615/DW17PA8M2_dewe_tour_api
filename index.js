const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 6000;

app.use(bodyParser.json());

const routerv1 = require('./routes/routerv1.js');
app.use('/api/v1', routerv1);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
