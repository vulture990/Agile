const jwt = require('jsonwebtoken')
const User = require('../models/user')


module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        const error = new Error('Not authenticated!')
        error.status = 401
        throw error
    }
    const token = authHeader.split(' ')[1];
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'benzos')
    } catch (error) {
        next(error)
    }

    //console.log(decodedToken)
    if (!decodedToken) {
        const error = new Error('Not autheticated!')
        error.status = 401
        throw error
    }
    req.userId = decodedToken.userId
    req.userData = decodedToken
    // console.log(req.userId)
    // console.log(req.userData)

    next()
}

