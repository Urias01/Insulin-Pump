const User = require('../models/User');

const  bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static async register(req, res) {
        res.render('auth/register');
    }

    static async registerUser(req, res) {
        
    }
}