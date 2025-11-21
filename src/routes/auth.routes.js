const router = require('express').Router();
const passport = require('passport');

// INICIO login con GitHub
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// CALLBACK que GitHub llama
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/failure',
    session: true,
  }),
  (req, res) => {
    res.redirect('/auth/success');
  }
);

router.get('/success', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json({
    message: 'Logged in successfully with GitHub',
    user: req.user,
  });
});

router.get('/failure', (req, res) => {
  res.status(401).json({ message: 'GitHub login failed' });
});

router.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      res.json({ message: 'Logged out' });
    });
  });
});

module.exports = router;
