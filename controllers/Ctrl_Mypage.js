const ejs = require('ejs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const mypagePath = path.join(publicDir, 'views');

let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const GetMyPage = {

  getMypageData: function(req, res){
        // 헤더에서 naver_email을 가져옵니다.
        const naver_email = req.headers['naver_email'];
        console.log(naver_email);
    
        // users 테이블에서 해당 이메일을 가진 사용자를 찾습니다.
        const findUser = 'SELECT * FROM users WHERE naver_email=?';
        connection.query(findUser, [naver_email], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.status(500).send('Server Error');
            return;
          }
    
          if (results.length === 0) {
            // 사용자를 찾지 못한 경우 404 Not Found를 반환합니다.
            res.status(404).send('Not Found');
            return;
          }
    
          // 사용자의 ID를 가져옵니다.
          const user_ID = results[0].ID;
          // 해당 사용자의 template 갯수를 가져옵니다.
          const findTemplateCount = 'SELECT COUNT(*) AS count FROM template WHERE user_ID=?';
          connection.query(findTemplateCount, [user_ID], (error, results, fields) => {
            if (error) {
              console.error(error);
              res.status(500).send('Server Error');
              return;
            }
    
            const data = {
              count: results[0].count
            };
            console.log(data);
            res.render('mypage', data);
            

          });
        });
  }

};

module.exports = GetMyPage;
