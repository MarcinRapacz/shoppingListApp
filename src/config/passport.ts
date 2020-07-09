import passport, { Profile } from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";
import User from "../components/User/UserModel";

const handleAuth = async (profile: Profile, done: Function) => {
  let email = "";
  if (profile.emails) {
    email = profile.emails[0].value || "";
  }

  let user = await User.findOne({ email });
  if (user) {
    done(null, user);
  } else {
    let photoURL = "";

    if (profile.photos) {
      photoURL = profile.photos[0].value || "";
    }
    user = new User({
      strategy: profile.provider,
      strategyId: profile.id,
      name: profile.displayName,
      email,
      photoURL,
    });
    await user.save();
    done(null, user);
  }
};

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// login by Facebook
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID as string,
      clientSecret: process.env.FACEBOOK_APP_SECRET as string,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "emails", "name", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      handleAuth(profile, done);
    }
  )
);

// login by Google
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECURE as string,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      handleAuth(profile, done);
    }
  )
);

export default passport;
