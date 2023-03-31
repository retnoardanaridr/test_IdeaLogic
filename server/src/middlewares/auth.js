const jwt = require('jsonwebtoken');

exports.auth = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader && authHeader.split(" ")[1];

    if(!token) {
        return res.status(401).send({ message: "Access denied!" });
    }

    try {
        // generate token
        const SECRET_KEY = 'rahasia'
        const verified = jwt.verify(token, SECRET_KEY); //verified token
        req.user = verified;
        next(); // if token valid go to the next request
      } catch (error) {
        // if token not valid send response invalid token
        res.status(400).send({ message: "Invalid token" });
      }
}