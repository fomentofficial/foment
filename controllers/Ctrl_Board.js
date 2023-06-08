// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;
const path = require('path');
const fs = require('fs').promises;

// 클라이언트에서 현재 페이지의 템플릿 URL을 Post로 받아오고, 받아온 템플릿 URL에 해당하는 UserID에 맵핑시켜주기
// 방명록 등록시, 템플릿 URL에 업데이트 처리. URL 반환. 템플릿 URL 반환할때, 방명록 데이터가 ejs템플릿에 등록되어야함
// 삭제 또한 마찬가지 프로세스로 진행

const Board = {
  // 방명록 작성 함수
  Creatboard: async (req, res) => {
    try {
      const {
        template_ID,
        Board_Writer_Data,
        Board_Contents_Data,
        Board_Password_Data,
      } = req.body;

      // 데이터 유효성 검사
      if (!Board_Writer_Data || !Board_Contents_Data || !Board_Password_Data) {
        throw new Error('잘못된 데이터입니다.');
      }

      console.log(template_ID);
      console.log(Board_Writer_Data);
      console.log(Board_Contents_Data);
      console.log(Board_Password_Data);

      // MySQL에 데이터 삽입
      const selectQuery = `SELECT user_ID FROM template WHERE template_ID = ?`;
      const selectValues = [template_ID];

      connection.query(selectQuery, selectValues, (selectError, selectResults) => {
        if (selectError) {
          console.error('MySQL 데이터 조회 실패:', selectError);
          res.status(500).send('MySQL 데이터 조회 실패');
        } else {
          if (selectResults.length === 0) {
            console.error('템플릿을 찾을 수 없습니다.');
            res.status(404).send('템플릿을 찾을 수 없습니다.');
          } else {
            const user_ID = selectResults[0].user_ID;

            const insertQuery = `INSERT INTO board (user_ID, template_ID, name, contents, password, create_date) VALUES (?, ?, ?, ?, ?, NOW())`;
            const insertValues = [user_ID, template_ID, Board_Writer_Data, Board_Contents_Data, Board_Password_Data];
            
            connection.query(insertQuery, insertValues, (insertError, insertResults) => {
              if (insertError) {
                console.error('MySQL 방명록 데이터 삽입 실패:', insertError);
                res.status(500).send('MySQL 방명록 데이터 삽입 실패');
              } else {
                console.log('MySQL 방명록 삽입 성공');
                res.status(200).send('MySQL 방명록 데이터 전송 성공');
              }
            });
          }
        }
      });
    } catch (error) {
      console.error(`방명록 데이터 전송 실패: ${error.message}`);
      res.status(500).send('방명록 데이터 전송 실패');
    }
  },
};

module.exports = Board;

