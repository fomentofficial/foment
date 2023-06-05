// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;
const path = require('path');
const fs = require('fs').promises;

const Board = {
    Creatboard: async (req, res) => {
      // 클라이언트에서 현재 페이지의 템플릿 URL을 Post로 받아오고, 받아온 템플릿 URL에 해당하는 UserID에 맵핑시켜주기
      // 방명록 등록시, 템플릿 URL에 업데이트 처리. URL 반환. 템플릿 URL 반환할때, 방명록 데이터가 ejs템플릿에 등록되어야함
      // 삭제 또한 마찬가지 프로세스로 진행

    },

}


module.exports = Board;
