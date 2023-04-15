const axios = require('axios');
const qs = require('qs');

exports.getLogin = (req, res) => {
  // 네이버 로그인 API로 인증을 수행합니다.
  const clientId = 'ZwV8tMKR9goChugNiuqV'; // 네이버 로그인 API 클라이언트 ID
  const clientSecret = '7HgwuyY9it'; // 네이버 로그인 API 클라이언트 시크릿
  const state = 'RANDOM_STATE_STRING'; // CSRF 공격 방지를 위한 랜덤 문자열
  const redirectUri = 'http://localhost:3000/naver_callback'; // 네이버 로그인 API 콜백 URL
  const apiUrl = 'https://nid.naver.com/oauth2.0/authorize'; // 네이버 로그인 API 인증 요청 URL
  
  const params = {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    state: state,
    scope: 'profile',
  };
  const url = `${apiUrl}?${qs.stringify(params)}`;
  
  res.redirect(url);
};

exports.getCallback = async (req, res) => {
  const { code, state } = req.query;
  
  if (state !== 'RANDOM_STATE_STRING') {
    return res.status(400).send('Invalid state parameter');
  }
  
  try {
    // 네이버 로그인 API로 액세스 토큰 요청을 수행합니다.
    const clientId = 'ZwV8tMKR9goChugNiuqV'; // 네이버 로그인 API 클라이언트 ID
    const clientSecret = '7HgwuyY9it'; // 네이버 로그인 API 클라이언트 시크릿
    const redirectUri = 'http://localhost:3000/naver_callback'; // 네이버 로그인 API 콜백 URL
    const apiUrl = 'https://nid.naver.com/oauth2.0/token'; // 네이버 로그인 API 액세스 토큰 요청 URL
    
    const params = {
      grant_type: 'authorization_code',
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      code: code,
      state: state,
    };
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await axios.post(apiUrl, qs.stringify(params), config);
    const { access_token, refresh_token, expires_in } = response.data;
    
    // 받아온 토큰 정보를 템플릿 데이터에 추가합니다.
    const data = {
      pageTitle: 'Naver Login',
      message: 'Naver Login Success',
      access_token: access_token,
      refresh_token: refresh_token,  expires_in: expires_in,
    };
    
    // 렌더링할 템플릿과 템플릿 데이터를 전달합니다.
    res.render('naver_login', data);
} catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
    }
    };
