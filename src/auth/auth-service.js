const AuthService = {
    // Buffer from ASCII
    // Return username & password from token
    parseToken(token) {
        return Buffer
            .from(token, 'ascii')
            .toString()
            .split(':')
    },

    getToken() {

    }
    
    
    // Authenticate
    // Validate no username, no password

}

module.exports = AuthService;