import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import UserManager from "../managers/UserManager.js";

const  userManager = new UserManager();

const registerOptions = {
    //Este callback es para que pueda tomar el body
    passReqToCallback: true,
    usernameField: "email",
};

const loginOptions = {
    usernameField: "email",
};

const handleRegister = async (req, email, password, done) => {
    try {
        const newUser = await userManager.insertOne({ ...req.body, email, password })
        // El primer parametro siempre define el error, y el segundo es la data.
        return done(null, newUser);

    } catch (error) {
        return done(null, false, { message: error.message })
    }
};

const handleLogin = async (email, password, done) => {
    try {
        const user = await userManager.getOneByEmailAndPassword(email, password)

        return done(null, user);

    } catch (error) {
        return done(null, false, { message: error.message })
    }
};

export const configPassport = () => {
    passport.use("register", new LocalStrategy(registerOptions, handleRegister));
    passport.use("login", new LocalStrategy(loginOptions, handleLogin));

    passport.serializeUser((user, done) => {
        const sessionData = {
            id: user._id?.toString(),
            name: user.name,
        }
        done(null, sessionData);
    });

    passport.deserializeUser( async (sessionData, done) => {
        try {
            const user = await userManager.getOneById(sessionData.id);
            done(null, user);
        } catch (error) {
            done(error.message)
        }
    });
};