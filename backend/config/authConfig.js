import passport from 'passport';
import LocalStrategy from 'passport-local';
import bcrypt from 'bcrypt';
import * as userModel from '../models/userModels.js';

passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await userModel.getUserByEmail(email);
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
    done(null, user.userid); // Ensure `user.userID` is valid
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