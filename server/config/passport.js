import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URI}/api/auth/google/callback`,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const firstName = profile.displayName?.split(" ")[0] || "";
      const lastName = profile.displayName?.split(" ").slice(1).join(" ") || "";
      const email = profile.emails?.[0]?.value?.toLowerCase();
      const avatar = profile.photos?.[0]?.value || "";

      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      if (email) {
        user = await User.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          user.avatar = user.avatar || avatar;
          user.authProvider = "google";
          user.firstName = user.firstName || firstName;
          user.lastName = user.lastName || lastName;
          user.email = user.email;
          await user.save();          
          return done(null, user);
        }
      }

      const newUser = await User.create({
        googleId: profile.id,
        firstName,
        lastName,
        email,
        avatar,
        authProvider: "google",
      });

      return done(null, newUser);
    } catch (err) {
      return done(err, null);
    }
  },
));