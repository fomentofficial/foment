const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');

const publicDir = path.join(__dirname, '..', 'public');
const dataDir = path.join(publicDir, 'data');

async function createMypageFile(req, res) {
  try {
    const { url: mypageurl, cautionInfoOuterHTML, myPageURLHTML } = req.body;

    // 입력값 유효성 검사
    if (typeof cautionInfoOuterHTML !== 'string' || typeof myPageURLHTML !== 'string') {
      throw new Error('cautionInfoOuterHTML 또는 myPageURLHTML 값이 누락되었습니다.');
    }

    const myPageHtml = await fs.readFile(path.join(publicDir, 'views', 'mypage.ejs'), 'utf-8');

    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = daysOfWeek[date.getDay()];

    const creationDate = `${month}월 ${day}일 ${dayOfWeek}요일`;

    const html = await ejs.render(myPageHtml, {
      cautionInfoOuterHTML,
      creationDate,
      mypageurl,
    });

    const fileName = `${mypageurl.split('/').pop()}_mypage.html`;
    const filePath = path.join(dataDir, fileName);

    await fs.writeFile(filePath, html);
    console.log(`파일 저장: ${filePath}`);

    // 파일 생성 후에 파일 정보를 가져오는 코드를 추가합니다.
    const fileStats = await fs.stat(filePath);
    const birthtime = fileStats.birthtime.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }).replace(/.\d+./, '');
    console.log('HTML 파일 생성일:', birthtime);

    res.status(200).send('파일 저장 완료');
  } catch (error) {
    console.error(`파일 저장 실패: ${error.message}`);
    res.status(500).send('파일 저장 실패');
  }
}

module.exports = {
  createMypageFile,
};
