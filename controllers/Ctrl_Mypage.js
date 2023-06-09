const ejs = require('ejs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const mypagePath = path.join(publicDir, 'views');

let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const GetMyPage = {
  getMypageData: function (req, res) {
    const naver_email = req.session.naverEmail; // 변수 이름 수정
    console.log(naver_email);

    const findUser = "SELECT * FROM users WHERE naver_email=?";
    connection.query(findUser, [naver_email], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send("Server Error");
        return;
      }

      if (results.length === 0) {
        res.status(404).send("Not Found");
        return;
      }

      const user_ID = results[0].ID;
      const findTemplates = "SELECT * FROM template WHERE user_ID=?";
      connection.query(findTemplates, [user_ID], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send("Server Error");
          return;
        }

        const templates = results;
        res.render('mypage', { templates: templates }); // html 변수를 res.render()의 두 번째 인자로 전달
      });
    });
  }
};

module.exports = GetMyPage;
