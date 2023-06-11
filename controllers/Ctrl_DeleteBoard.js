let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

function DeleteBoard(req, res) {
  try {
    const templateURL = req.params.DeleteURLInfo;
    const name = req.body.name;
    const password = req.body.password;

    const Deletequery = `DELETE FROM board WHERE template_ID = '${templateURL}' AND name = '${name}' AND password = '${password}'`;
    connection.query(Deletequery, (error, result) => {
      if (error) {
        console.error('MySQL 쿼리 실행 중 오류 발생:', error);
        res.status(500).send('내부 서버 오류');
        return;
      }

      console.log(result.affectedRows);
      if (result.affectedRows > 0) {
        res.send('삭제되었습니다.');
        return;
      } else{
        res.send('비밀번호가 틀립니다.');
      } 
    });
  } catch (error) {
    console.error('에러 발생:', error);
    res.status(500).send('내부 서버 오류');
  }
}

module.exports = {
  DeleteBoard,
};
