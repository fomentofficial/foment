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
        res.send({
            clientId: clientId,
            callbackUrl: callbackUrl
        });
      }
  };
  
  module.exports = naverLoginCallbackController;
  