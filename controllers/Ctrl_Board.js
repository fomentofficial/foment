// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;
const path = require('path');
const fs = require('fs').promises;

const Board = {
    Creatboard: async (req, res) => {
      // 클라이언트에서 현재 페이지의 템플릿 URL을 Post로 받아오고, 받아온 템플릿 URL에 해당하는 UserID에 맵핑시켜주기
      
    },

}


module.exports = Board;
