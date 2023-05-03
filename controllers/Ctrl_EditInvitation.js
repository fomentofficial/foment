function renderEditPage(req, res) {
  const path = require('path');
  const fs = require('fs').promises;

  // 클라이언트로부터[수정버튼] 전달받은 inviteURL정보
  const inviteURL = req.query.inviteURL;

  // 가져올 템플릿 파일 이름 및 경로
  const TemplateFileName = `template_${inviteURL}.ejs`;
  const TemplateFilePath = path.join(__dirname, '..', 'public', 'data', TemplateFileName);

  console.log(inviteURL);

  const detaildata = {
    pageTitle: 'Edit Invitation',
    message: 'Please edit the invitation details'
  };
  res.render(TemplateFilePath, detaildata || {});
  console.log('수정파일 생성됨');
}

module.exports = {
  renderEditPage,
};
