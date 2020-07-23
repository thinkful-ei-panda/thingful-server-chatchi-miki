const AuthService = {
    // Buffer from ASCII
    // Return username & password from token
    parseToken(token) {
        return Buffer
            .from(token, 'base64')
            .toString()
            .split(':')
    },

    getUserWithToken(db, user_name) {
        return db('thingful_users')
            .select('*') // Or just password?
            .where({user_name})
            .first()
    },

}

module.exports = AuthService;