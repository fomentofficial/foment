// controllers/Ctrl_EditInvitation.js 파일
function renderGetPage(req, res) {
  const path = require('path');
  const fs = require('fs').promises;

  const templateURL = req.params.GetURLInfo; // :EditURLInfo 매개변수를 가져옴

  const TemplateFileName = `${templateURL}.ejs`;
  const TemplateFilePath = path.join(__dirname, '..', 'public', 'data', TemplateFileName);

  const detaildata = {
    pageTitle: 'Preview Invitation',
    message: 'Please edit the invitation details'
  };
  res.render(TemplateFilePath, detaildata || {});
}

module.exports = {
  renderGetPage,
};
