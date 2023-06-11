const path = require('path');
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

function renderGetBoard(req, res) {
  const templateURL = req.params.GetURLInfo; // :EditURLInfo 매개변수 가져오기

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

    const responseData = BoardData.reverse(); // 배열의 순서를 반대로 뒤집음

    res.send(responseData);
  });
}

module.exports = {
  renderGetBoard,
};
