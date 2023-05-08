// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;
const path = require('path');
const fs = require('fs').promises;

// controllers/Ctrl_EditInvitation.js 파일
const renderEditPage = (req, res) => {
  // 클라이언트로부터[수정버튼] 전달받은 inviteURL정보
  const inviteURL = req.params.EditURLInfo;

  // MySQL 데이터베이스에서 inviteURL과 일치하는 데이터 조회
  connection.query('SELECT * FROM template WHERE template_ID = ?', inviteURL, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Server Error');
      return;
    }

    if (results.length === 0) {
      res.status(404).send('Not Found');
      return;
    }

    // 조회한 결과를 바탕으로 템플릿 파일을 렌더링합니다.
    const templateFileName = 'detail.ejs';
    const newTemplateFileName = `template_${inviteURL}.ejs`;

    const templateFilePath = path.join(__dirname, '..', 'public', 'views', templateFileName);
    const newTemplateFilePath = path.join(__dirname, '..', 'public', 'data', newTemplateFileName);

    const Templatedata = {
      pageTitle: 'Edit Invitation',
      message: 'Please edit the invitation details',
      // MySQL에서 조회한 데이터를 전달
      Templatedata :{
        data: results[0]
      }
    };

    res.render(templateFilePath, Templatedata, (err, html) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server Error');
        return;
      }

      // 렌더링된 HTML 파일을 새 파일로 저장
      fs.writeFile(newTemplateFilePath, html, 'utf8')
        .then(() => {
          console.log('수정된 템플릿 파일이 생성되었습니다: ' + newTemplateFileName);
          res.status(200).send(html);
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Server Error');
          return;
        });
    });
  });
};

module.exports = {
  renderEditPage
};
