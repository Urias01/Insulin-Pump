const User = require('../models/User');

const bcrypt = require('bcryptjs');

module.exports = class AuthController {

    static async register(req, res) {
        res.render('auth/register');
    }

    static async registerUser(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        /* Validations */
        if (!name || !email || !password || !confirmpassword) {
            req.flash('message', 'Please, fill in all the fields!');
            return res.render('auth/register', {
                error: 'Please, fill in all the fields!'
            });
        }

        if (password !== confirmpassword) {
            req.flash('message', 'Passwords do not match!');
            return res.render('auth/register', {
                error: 'Passwords do not match!'
            });
        }

        const hash = bcrypt.genSaltSync(10);
        const passwordHash = bcrypt.hashSync(password, hash);

        const user = {
            name: name,
            email: email,
            password: passwordHash
        }

        try {
            await User.create(user);
            req.flash('message', 'User registered successfully!');
            res.redirect('/login');
        } catch (err) {
            req.flash('message', 'Error to register user!');
            res.render('auth/register', {
                error: 'Error to register user!'
            });
        }
    }

    static login(req, res) {
        res.render('auth/login');
    }

    static async loginPost(req, res) {
        const { email, password } = req.body;

        /* Validations */
        if (!email || !password) {
            req.flash('message', 'Please, fill in all the fields!');
            return res.render('auth/login', {
                error: 'Please, fill in all the fields!'
            });
        }

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            req.flash('message', 'User not found!');
            res.render('pages/home');
            return
        }

        /* check if password match */
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            req.flash('message', 'Passwords do not match!');
            return res.render('auth/login', {
                error: 'Passwords do not match!'
            });
        }

        /* Initialize session */
        req.session.userid = user.id;

        req.flash('message', 'Login successfully!');

        req.session.save(() => {
            res.redirect('/insulin_pump');
        });
    }
}