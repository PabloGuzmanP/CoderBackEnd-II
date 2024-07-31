import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import UserManager from "../managers/UserManager.js";
import { config as configSession } from "./session.config.js";

const userManager = new UserManager();

const getGithubOptions = () => {
    return {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL
    };
};

const findOrCreate = async (profile) => {
    try {
        const user = await userManager.getOneByGitHubId(profile.id);
        return user;
    } catch (error) {
        const newUser = await userManager.insertOne({ name: profile.displayName, gitHubId: profile.id });
        return newUser;
    }
};

const handleAuthenticationGitHub = async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findOrCreate(profile);
        return done(null, user);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

export const config = (server) => {
    passport.use("github", new GitHubStrategy(getGithubOptions(), handleAuthenticationGitHub));

    passport.serializeUser((user, done) => {
        const sessionData = {
            id: user._id,
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

    configSession(server);
    server.use(passport.initialize());
    server.use(passport.session());
};