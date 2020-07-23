const AuthService = require('../auth/auth-service')
const bcrypt = require('bcryptjs')

const requireAuth = (req, res, next) => {
    const authToken = req.get('Authorization') || ''
    if(!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({error: 'Unauthorized'})
    }

    const token = authToken.slice('basic '.length, authToken.length)

    const [user_name, password] = AuthService.parseToken(token)
    AuthService.getUserWithToken(req.app.get('db'), user_name)
        .then(user => {
            if(!user) {
                return res.status(401).json({error: 'Unauthorized'})
            }

            return bcrypt.compare(password, user.password)
                .then(passwordMatch => {
                    console.log(password, user.password)
                    if(!passwordMatch) {
                        return res.status(401).json({error: 'Unauthorized'}) 
                    }
                    req.user = user
                    next()
                })
                .catch(next)
        })
        .catch(next)
};

module.exports = {
    requireAuth
};