const jwt = require("jsonwebtoken");
exports.authenticated = (req, res, next) => {
    const secretKey = "primakk0615"

    let header, token;

    if (!(header = req.header("Authorization")) || !(token = header.replace("Bearer ", "")))
        //reject request and send reponse access denied
        return res.status(400).send({
            error: {
                message: "Access Denied",
            },
        });

    try {
        const verified = jwt.verify(token, secretKey)

        req.user = verified
        next(); //if token valid go to next request
    } catch (err) {
        console.log(err);
        //if token not valid send response invalid token
        res.status(400).send({
            error: {
                message: "Invalid token",
            },
        });
    }
};