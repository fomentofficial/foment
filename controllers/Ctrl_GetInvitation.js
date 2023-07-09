const path = require('path');
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

function renderGetPage(req, res) {
  const templateURL = req.params.GetURLInfo; // :EditURLInfo 매개변수 가져오기

  const templateFileName = `${templateURL}.ejs`;
  const templateFilePath = path.join(__dirname, '..', 'public', 'data', templateFileName);
  console.log(templateFilePath);

  const detailData = {
    pageTitle: 'Preview Invitation',
    message: 'Please edit the invitation details',
    templateURL: templateURL
  };

  // MySQL 쿼리 실행하여 행 가져오기
  const query = `SELECT * FROM board WHERE template_ID = '${templateURL}'`;
  connection.query(query, (error, BoardData) => {
    if (error) {
      console.error('Error executing MySQL query:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const responseData = {BoardData};

    res.render(templateFilePath, responseData);
    console.log(responseData);

  });
}


module.exports = {
  renderGetPage,
};
