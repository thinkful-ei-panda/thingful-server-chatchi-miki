const AuthService = require('../auth/auth-service')

const requireAuth = (req, res, next) => {
    const authToken = req.get('Authorization') || ''
    if(!authToken.toLowerCase().startsWith('basic ')) {
        return res.status(401).json({error: 'Unauthorized'})
    }

    const token = authToken.slice('basic '.length, authToken.length)

    const [user_name, password] = AuthService.parseToken(token)
    return AuthService.getUserWithToken(req.app.get('db'), user_name)
        .then(user => {
            if(!user) {
                return res.status(401).json({error: 'Unauthorized'})
            }

            if(password !== user.password) {
                return res.status(401).json({error: 'Unauthorized'})
            }

            req.user = user
            next()

        })
        .catch(next)
};

module.exports = {
    requireAuth
};