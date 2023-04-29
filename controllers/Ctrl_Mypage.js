const GetMyPage = {
    getMypage: function(req, res) {
      const data = {
        pageTitle: 'My Page',
        message: 'This is the Mypage'
      };
      res.render('mypage', data || {});
    }    
  };
  
  module.exports = GetMyPage;
  