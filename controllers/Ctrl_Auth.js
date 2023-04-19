const fetch = import('node-fetch');

const naverLoginController = {
  getNaverLogin: function(req, res) {
    const data = {
      pageTitle: 'Naver Login',
      message: 'This is the Naver login page'
    };
    res.render('naver_login', data || {}); 
  },
  getNaverLoginData: function(req, res) {
    const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
    const callbackUrl = process.env.NAVER_LOGIN_CALLBACK_URL;
    res.send({
        clientId: clientId,
        callbackUrl: callbackUrl
    });
  },
  login: async (req, res) => {
    // 네이버 로그인 API 호출 후 액세스 토큰을 얻는 코드를 추가해야 함
    const accessToken = 'c8ceMEJisO4Se7uGCEYKK1p52L93bHXLnaoETis9YzjfnorlQwEisqemfpKHUq2gY';

    // 세션에 액세스 토큰 저장
    req.session.accessToken = accessToken;

    res.json({ success: true });
  },
  logout : async (req, res) => {
    const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
    const clientSecret = process.env.NAVER_LOGIN_CLIENT_SECRET;

    const accessToken = req.session.accessToken; // 세션에서 액세스 토큰 가져오기
    console.log(accessToken);

    const logoutUrl = `https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=${clientId}&client_secret=${clientSecret}&access_token=${accessToken}&service_provider=NAVER`;

    try {
        const response = await fetch(logoutUrl, { method: 'POST' });
        const result = await response.json();

        if (result.result === 'success') {
            // 로그아웃 성공 시, 세션에서 액세스 토큰 삭제
            delete req.session.accessToken;
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.json({ success: false });
    }
  }
};

module.exports = naverLoginController;
