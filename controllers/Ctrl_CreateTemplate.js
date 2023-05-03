const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');

// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

// short-uuid 라이브러리 가져오기
const short = require('short-uuid');

// CreateTemplate 객체
let CreateTemplate = {
  postInfo: (req, res) => {
    // 헤더에서 네이버 이메일 정보 가져오기
    const naver_email = req.headers['naver_email'];

    console.log(naver_email);

    // 사용자 정보 가져오기 쿼리
    const findUser = 'SELECT * FROM users WHERE naver_email=?';
    // 템플릿 생성 쿼리
    const insertTemplate = 'INSERT INTO template (user_ID, template_ID, create_date, update_date) VALUES (?, ?, NOW(), NOW() )';

    // 네이버 이메일로 사용자 정보 가져오기
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

      // 사용자 ID 가져오기
      const user_ID = results[0].ID;
      // short-uuid 라이브러리로 새로운 템플릿 ID 생성하기
      const su = short();
      const template_ID = su.new();

      // 템플릿 생성하기
      connection.query(insertTemplate, [user_ID, template_ID], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Server Error');
          return;
        }

        // 템플릿 파일 경로 및 파일명 정의
        const templateFileName = 'detail.ejs';
        const newTemplateFileName = `template_${template_ID}.ejs`;
        const templateFilePath = path.join(__dirname, '..', 'public', 'views', templateFileName);
        const newTemplateFilePath = path.join(__dirname, '..', 'public', 'data', newTemplateFileName);

        // 템플릿 파일 렌더링
        ejs.renderFile(templateFilePath, { /* data */ }, (err, html) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
          }
          // 생성된 템플릿 파일 ID를 클라이언트로 전송
          res.status(200).send(template_ID.toString());
          console.log('새로운 템플릿 파일이 생성되었습니다: ' + newTemplateFileName);

          // 렌더링된 HTML 파일을 새 파일로 저장
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
  },

  getInfo: async (req, res) => {
    try {
      const templateID = req.params.id;
      const templateFilePath = path.join(__dirname, '..', 'public', 'data', `template_${templateID}.ejs`);
      
      // 템플릿 파일을 읽어서 내용을 가져옵니다.
      const templateFile = await fs.readFile(templateFilePath, 'utf-8');
      
      // 템플릿 파일을 렌더링합니다.
      const renderedHtml = ejs.render(templateFile, { /* data */ });
      
      // 렌더링된 HTML 코드를 응답으로 전송합니다.
      res.render(templateFilePath, { renderedHtml });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
  
  

};






module.exports = CreateTemplate;
