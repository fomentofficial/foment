const axios = require('axios');
const qs = require('qs');
const {
  naverLoginClientId,
  naverLoginClientSecret,
  naverLoginCallbackUrl,
} = require('../dbConfig');

exports.getLogin = (req, res) => {
  const state = 'RANDOM_STATE_STRING';
  const params = {
    response_type: 'code',
    client_id: naverLoginClientId,
    redirect_uri: naverLoginCallbackUrl,
    state: state,
    scope: 'profile',
  };
  const apiUrl = 'https://nid.naver.com/oauth2.0/authorize';
  const url = `${apiUrl}?${qs.stringify(params)}`;
  res.redirect(url);
};

exports.getCallback = async (req, res) => {
  const { code, state } = req.query;

  if (state !== 'RANDOM_STATE_STRING') {
    return res.status(400).send('Invalid state parameter');
  }

  try {
    const params = {
      grant_type: 'authorization_code',
      client_id: naverLoginClientId,
      client_secret: naverLoginClientSecret,
      redirect_uri: naverLoginCallbackUrl,
      code: code,
      state: state,
    };
    const apiUrl = 'https://nid.naver.com/oauth2.0/token';
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const response = await axios.post(apiUrl, qs.stringify(params), config);
    const { access_token, refresh_token, expires_in } = response.data;

    const data = {
      pageTitle: 'Naver Login',
      message: 'Naver Login Success',
      access_token: access_token,
      refresh_token: refresh_token,
      expires_in: expires_in,
    };

    res.render('naver_login', data);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
};
