const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use("/imgUpload", express.static("imgUpload"));

const routerv1 = require('./routes/routerv1.js');
app.use('/api/v1', routerv1);




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
