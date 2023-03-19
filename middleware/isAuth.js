const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const sha256 = require('sha256');
//const User = require("../model/User")

const GOOGLE_CLIENT_ID = '489559723096-cs3vue1qjk4er9ctf4r9ipku7g4ftncb.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
//Điều hướng về Front nếu không phải Semin-Admin hoặc Admin


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://ccr-server.vercel.app/google/callback',
    passReqToCallbackURL: true,
}, function(req, accessToken, refreshToken, profile, done){
    console.log(profile);
    return done(null,profile);
    
    /*
    User.findOrCreate(profile, function(err, user){
        return done(null,user);
    })
    */
}))

passport.serializeUser(function(user, done){
    done(null, user);
})

passport.deserializeUser(function(user, done){
    done(null, user);
})

exports.isAuths = passport.authenticate('local', {
        successMessage: 'Authentication successful',
        failureRedirect: process.env.CLIENT_URI + '/login'
    })

passport.use(new LocalStrategy((username,password, done) =>{
    const filter = {username: username, password: sha256(password)};
    User.find(filter).then((user) => {
        if(user){
            done(null,user);
        } else {
           done(null,false);
        }
    })
}))

passport.serializeUser((user,done)=> done(null,user));

passport.deserializeUser((user,done)=>{
    if(user != ''){
        done(null,user);
    } else {
        done(null,false);
    }
});