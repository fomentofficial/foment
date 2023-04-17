// 로그인 유무를 확인하는 함수
const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send('Unauthorized');
    }
  }
  
  module.exports = {
    isLoggedIn,
  };
  


const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;


passport.use(new NaverStrategy({
    clientID: process.env.NAVER_LOGIN_CLIENT_ID,
    clientSecret: process.env.NAVER_LOGIN_CLIENT_SECRET,
    callbackURL: "auth/naver/callback"
},
function(accessToken, refreshToken, profile, done) {
    // 인증이 완료된 후 수행할 작업을 여기에 작성합니다.
    // 사용자 정보를 데이터베이스에 저장하거나 세션에 저장할 수 있습니다.
    return done(null, profile);
}));

// Serialize/Deserialize User
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
