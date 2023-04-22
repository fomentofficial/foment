const naverLoginCallbackController = {
  getNaverLoginCallback: function(req, res) {
    const data = {
      pageTitle: 'Naver Login',
      message: 'This is the Naver login page'
    };
    res.render('naver_login_callback', data || {});
  },
  getNaverLoginCallbackData: function(req, res) {
    const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
    const callbackUrl = process.env.NAVER_LOGIN_CALLBACK_URL;

    // 세션에 액세스 토큰 저장
    req.session.accessToken = req.body.naverAccessToken;
    req.session.naverEmail = req.body.naverEmail;

    const accessToken = req.session.accessToken;
    const naverEmail = req.session.naverEmail;
    console.log(accessToken);
    console.log(naverEmail);

    //여기에 토큰과 이메일 세션값을 DB에 포스팅하는 코드 추가

    res.json({ success: true });
  }
};

module.exports = naverLoginCallbackController;
