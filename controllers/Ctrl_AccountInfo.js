// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;
const path = require('path');
const fs = require('fs').promises;

const accountInfoController = {
  postInfo: (req, res) => {
    let templateURL = req.params.GetURLInfo; // :EditURLInfo 매개변수 가져오기
  
    try {
      const dataArray = req.body;
  
      // 데이터 유효성 검사
      if (!Array.isArray(dataArray)) {
        throw new Error('잘못된 데이터입니다.');
      }
  
      // MySQL에서 template_ID와 동일한 user_ID 찾기
      const getUserIDQuery = 'SELECT user_ID FROM template WHERE template_ID = ?';
      connection.query(getUserIDQuery, [templateURL], (error, results) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: '서버 오류' });
          return;
        }
  
        // 찾은 user_ID와 함께 account 데이터 삭제 및 삽입
        const userID = results[0]?.user_ID;
        if (!userID) {
          res.status(404).json({ error: '해당 템플릿을 사용하는 사용자를 찾을 수 없습니다.' });
          return;
        }
  
        // 삭제 및 삽입 처리 함수
        const processAccountData = (accordionTitle, bankNameTerms, holderInfo, bankBankName, bankAccountInfo) => {
          // MySQL에서 template_ID, accordionTitle이 일치하는 데이터 삭제
          const deleteQuery = 'DELETE FROM account WHERE template_ID = ? AND accordionTitle = ?';
          const deleteValues = [templateURL, accordionTitle];
          connection.query(deleteQuery, deleteValues, (error, results) => {
            if (error) {
              console.error(error);
            } else {
              console.log('데이터가 성공적으로 제거되었습니다.');
  
              // 데이터 삽입
              const insertQuery = 'INSERT INTO account (template_ID, user_ID, accordionTitle, bankNameTerms, holderInfo, bankBankName, bankAccountInfo) VALUES (?, ?, ?, ?, ?, ?, ?)';
              const insertValues = [templateURL, userID, accordionTitle, bankNameTerms, holderInfo, bankBankName, bankAccountInfo];
              connection.query(insertQuery, insertValues, (error, results) => {
                if (error) {
                  console.error(error);
                } else {
                  console.log('데이터가 성공적으로 삽입되었습니다.');
                }
              });
            }
          });
        };
  
        // 각 계좌 그룹에 대한 처리
        for (const group of dataArray) {
          const { accordionTitle, innerData } = group;
  
          // 내부 데이터 배열 처리
          if (!Array.isArray(innerData)) {
            throw new Error('잘못된 데이터입니다.');
          }
  
          // 각 내부 데이터에 대한 처리
          for (const inner of innerData) {
            const { bankNameTerms, holderInfo, bankBankName, bankAccountInfo } = inner;
  
            // MySQL에서 template_ID와 accordionTitle이 일치하는 데이터 조회
            const selectQuery = 'SELECT * FROM account WHERE template_ID = ? AND accordionTitle = ?';
            const selectValues = [templateURL, accordionTitle];
            connection.query(selectQuery, selectValues, (error, results) => {
              if (error) {
                console.error(error);
              } else {
                // 조회 결과에 따라 삭제 또는 삽입 수행
                if (results.length > 0) {
                  processAccountData(accordionTitle, bankNameTerms, holderInfo, bankBankName, bankAccountInfo);
                } else {
                  processAccountData(accordionTitle, bankNameTerms, holderInfo, bankBankName, bankAccountInfo);
                }
              }
            });
          }
        }
  
        // 데이터를 성공적으로 처리한 후 클라이언트에 응답합니다.
        res.status(200).json({ message: '데이터가 성공적으로 처리되었습니다.' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '서버 오류' });
    }
  },
  



  getInfo: (req, res) => {
    const templateURL = req.params.GetURLInfo; // :EditURLInfo 매개변수 가져오기
    console.log(templateURL);

    // MySQL 쿼리 실행하여 행 가져오기
    const query = 'SELECT * FROM account WHERE template_ID = (SELECT template_ID FROM template WHERE template_ID = ?)';
    const values = [templateURL];
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error executing MySQL query:', error);
        res.status(500).send('Internal Server Error');
        return;
      }

      // 가져온 데이터를 클라이언트에 응답으로 보냅니다.
      res.status(200).json(results);
    });
  }



};

module.exports = accountInfoController;