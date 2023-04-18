const naverLoginController = {
    getNaverLogin: function(req, res) {
      const data = {
        pageTitle: 'Naver Login',
        message: 'This is the Naver login page'
      };
      res.render('naver_login', data || {});
    }
  };
  
  module.exports = naverLoginController;
  