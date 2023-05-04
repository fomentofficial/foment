// controllers/Ctrl_EditInvitation.js 파일
function renderEditPage(req, res) {
  const path = require('path');
  const fs = require('fs').promises;

  const inviteURL = req.params.EditURLInfo; // :EditURLInfo 매개변수를 가져옴

  const TemplateFileName = `template_${inviteURL}.ejs`;
  const TemplateFilePath = path.join(__dirname, '..', 'public', 'data', TemplateFileName);

  const detaildata = {
    pageTitle: 'Edit Invitation',
    message: 'Please edit the invitation details'
  };
  res.render(TemplateFilePath, detaildata || {});
}

module.exports = {
  renderEditPage,
};
