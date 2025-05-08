import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcryptjs';
import * as userModel from '../models/userModels.js';

//Passport config file

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await userModel.getUserByEmail(email); //User email address to verify user
            if(!user) {
                return done(null, false, { message: 'Invalid email' });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) {
                return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user)
        } catch (err) {
            return done(err);
        }
    }
));

passport.serializeUser((user, done) => {
    if (!user || !user.userid) {
        console.error('Failed to serialize user: Missing userID', user);
        return done(new Error('Missing userID'));
    }
    done(null, user.userid);
});

passport.deserializeUser(async (userid, done) => {
    try {
        const user = await userModel.getUserById(userid);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;