const ejs = require('ejs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const mypagePath = path.join(publicDir, 'views');

let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const GetMyPage = {
  getMypageData: function (req, res) {
    const naver_email = req.headers["naver_email"];

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
        ejs.renderFile(path.join(mypagePath, 'mypage.ejs'), { templates: templates }, (err, html) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
          }
          res.send(html);
        });
      });
    });
  }
};

module.exports = GetMyPage;
