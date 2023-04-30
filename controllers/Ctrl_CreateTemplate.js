// 아이디를 찾아 템플릿 번호대로 DB에 박히게끔
// 템플릿 번호대로 청첩장 화면 렌더링
// 템플릿 번호대로 청첩장이 형성되는 함수
const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');


let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const short = require('short-uuid');

let CreateTemplate = {
  postInfo: (req, res) => {
    const naver_email = req.headers['naver_email'];

    console.log(naver_email);

    const findUser = 'SELECT * FROM users WHERE naver_email=?';
    const insertTemplate = 'INSERT INTO template (user_ID, template_ID) VALUES (?, ?)';

    connection.query(findUser, [naver_email], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server Error');
        return;
      }

      if (results.length === 0) {
        res.status(404).send('Not Found');
        return;
      }

      const user_ID = results[0].ID;
      const su = short();
      const template_ID = su.new();
      connection.query(insertTemplate, [user_ID, template_ID], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Server Error');
          return;
        }

        // Define the file names and paths using the template ID
        const templateFileName = 'detail.ejs';
        const newTemplateFileName = `template_${template_ID}.html`;
        const templateFilePath = path.join(__dirname, '..', 'public', 'views', templateFileName);
        const newTemplateFilePath = path.join(__dirname, '..', 'public', 'data', newTemplateFileName);

        // Render the template file with data
        ejs.renderFile(templateFilePath, { /* data */ }, (err, html) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
          }
          res.status(200).send(template_ID.toString());
          console.log('새로운 템플릿 파일이 생성되었습니다: ' + newTemplateFileName);
          
          // Write the rendered HTML to a new file with the template ID in the file name
          fs.writeFile(newTemplateFilePath, html, (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Server Error');
              return;
            }
          });
        });


      });
    });
  }
};





module.exports = CreateTemplate;
