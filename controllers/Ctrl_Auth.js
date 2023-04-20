const fetch = import('node-fetch');

const naverLoginController = {

// 네이버 로그인 페이지로 이동하는 GET 요청에 대한 응답으로 렌더링된 HTML 페이지를 반환합니다.
  getNaverLogin: function(req, res) {
    const data = {
      pageTitle: 'Naver Login',
      message: 'This is the Naver login page'
    };
    res.render('naver_login', data || {}); 
  },

// 클라이언트 ID값과 콜백 URL을 반환합니다.
  getNaverLoginData: function(req, res) {
    const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
    const callbackUrl = process.env.NAVER_LOGIN_CALLBACK_URL;
    res.send({
        clientId: clientId,
        callbackUrl: callbackUrl
    });
  },

// 액세스 토큰을 얻는 코드를 추가해야 하지만, 현재는 고정된 액세스 토큰 값을 사용하여 세션에 액세스 토큰을 저장하고 JSON 형식으로 응답합니다.
  login: async (req, res) => {
    // 네이버 로그인 API 호출 후 액세스 토큰을 얻는 코드를 추가해야 함
    const { naverAccessToken, naverEmail } = req.body;

    // 세션에 액세스 토큰 저장
    req.session.accessToken = naverAccessToken;
    console.log(naverAccessToken);

    res.json({ success: true });
  },

  // 세션에서 액세스 토큰을 가져와 로그아웃 URL을 생성한 후, 해당 URL을 사용하여 네이버 로그아웃 API를 호출합니다. 로그아웃이 성공하면 세션에서 액세스 토큰을 삭제하고 JSON 형식으로 응답합니다.
  logout: async (req, res) => {
    const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
    const clientSecret = process.env.NAVER_LOGIN_CLIENT_SECRET;
  
    // 세션 객체가 초기화되어 있지 않은 경우, 로그인 화면으로 이동합니다.
    if (!req.session) {
      return res.redirect('/api_Auth/login');
    }
  
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
