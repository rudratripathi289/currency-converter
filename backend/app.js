import express from 'express';
import cors from 'cors';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import authRoutes from './routes/authRoutes.js';
import currencyRoutes from './routes/currencyRoutes.js';
import { config } from './config/env.js';
import User from './models/User.js';
import { generateToken } from './utils/generateToken.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

const app = express();
const googleOAuthEnabled = Boolean(config.googleClientId && config.googleClientSecret);

app.use(cors({ origin: config.frontendUrl, credentials: true }));
app.use(express.json());
app.use(passport.initialize());

const findOrCreateGoogleUser = async (profile) => {
  let user = await User.findOne({ googleId: profile.id });
  if (user) return user;

  const email = profile.emails?.[0]?.value?.toLowerCase();
  if (email) {
    user = await User.findOne({ email });
    if (user) {
      user.googleId = profile.id;
      if (!user.name && profile.displayName) user.name = profile.displayName;
      await user.save();
      return user;
    }
  }

  return User.create({
    googleId: profile.id,
    name: profile.displayName,
    email,
  });
};

if (googleOAuthEnabled) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: config.googleCallbackUrl,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await findOrCreateGoogleUser(profile);
          return done(null, user);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'API is running', data: { status: 'healthy' } });
});

if (googleOAuthEnabled) {
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'], session: false })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google', {
      session: false,
      failureRedirect: `${config.frontendUrl}/login?error=oauth_failed`,
    }),
    (req, res) => {
      const token = generateToken(req.user);
      res.redirect(`${config.frontendUrl}/auth/callback?token=${encodeURIComponent(token)}`);
    }
  );
} else {
  app.get('/auth/google', (req, res) => {
    res.redirect(`${config.frontendUrl}/login?error=oauth_not_configured`);
  });
}

app.use('/api/auth', authRoutes);
app.use('/api', currencyRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
