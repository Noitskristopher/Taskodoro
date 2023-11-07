const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.userToken, SECRET, (err, payLoad) => {
        if (err) {
            res.status(401).json({ verified: false })
        }
        else {
            console.log('Authenticated')
            req.user = payLoad
            console.log(payLoad);
            next();
        }
    })
}