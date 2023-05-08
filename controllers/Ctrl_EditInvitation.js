  // 데이터베이스 설정 가져오기
  let dbConfig = require('../dbConfig');
  let connection = dbConfig.connection
  const path = require('path');
  const fs = require('fs').promises;;

// controllers/Ctrl_EditInvitation.js 파일
const renderEditPage = (req, res) => {
  const path = require('path');
  const fs = require('fs').promises;
  const mysql = require('mysql');

  // 클라이언트로부터[수정버튼] 전달받은 inviteURL정보
  const inviteURL = req.params.EditURLInfo;

  // MySQL 데이터베이스에서 inviteURL과 일치하는 데이터 조회
  connection.query('SELECT * FROM template WHERE template_ID = ?', inviteURL, (error, results, fields) => {
    if (error) throw error;

    // 조회한 결과를 HTML에 렌더링
    const TemplateFileName = `template_${inviteURL}.ejs`;
    const TemplateFilePath = path.join(__dirname, '..', 'public', 'data', TemplateFileName);

    const detaildata = {
      pageTitle: 'Edit Invitation',
      message: 'Please edit the invitation details',
      // MySQL에서 조회한 데이터를 전달
      data: results[0]
    };
    res.render(TemplateFilePath, detaildata || {});
    console.log(results[0]);
  });
};

module.exports = {
  renderEditPage
};