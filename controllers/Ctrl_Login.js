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
    }
  };
  
  module.exports = naverLoginController;
  