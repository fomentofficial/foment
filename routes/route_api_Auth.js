const express = require('express');
const router = express.Router();
const authController = require('../controllers/Ctrl_Auth');
const passport = require('passport');


// 네이버 로그인을 수행합니다.
router.get('/auth/naver', passport.authenticate('naver'));

// 네이버 로그인 콜백 함수를 설정합니다.
router.get('/auth/naver/callback',
  passport.authenticate('naver', { failureRedirect: '/login' }),
  function(req, res) {
    // 로그인 성공 시 수행할 작업을 여기에 작성합니다.
    res.redirect('/');
});

// 로그인이 되어있는지 확인하는 미들웨어를 적용합니다.
router.use(authController.isLoggedIn);

// 로그인이 되어있는 사용자만 접근 가능한 페이지를 구현합니다.
router.get('/profile', (req, res) => {
  res.send(`Hello, ${req.user.displayName}`);
});

module.exports = router;
