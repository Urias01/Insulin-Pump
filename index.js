const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');

const app = express();

const conn = require('./db/conn');

/* Import Routes  */
const authRoutes = require('./routes/AuthRoutes');
const InsulinRoutes = require('./routes/InsulinRoutes');

/* Template Engine */
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

/* Get response from body */
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

/* Session Middleware */
app.use(session({
    name: 'session',
    secret: 'our_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () { },
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
}));

/* Flash messages */
app.use(flash());

/* Public path */
app.use(express.static('public'));

/* Et session to Res */
app.use((req, res, next) => {

    if (req.session.userid) {
        res.locals.session = req.session;
    }
    next();
});

/* Routes */
app.use('/', authRoutes);
app.use('/insulin_pump', InsulinRoutes);

conn
    .sync()
    //.sync({ force: true })
    .then(() => {
        app.listen(3000);
    }).catch((err) => {
        console.log(`Error: ${err}`);
    });