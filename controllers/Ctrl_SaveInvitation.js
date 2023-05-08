const dbConfig = require('../dbConfig');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: dbConfig.awsAccessKeyId,
  secretAccessKey: dbConfig.awsSecretAccessKey,
  region: dbConfig.awsRegion
});

const path = require('path');
const fs = require('fs').promises;
const cheerio = require('cheerio');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const publicDir = path.join(__dirname, '..', 'public');
const dataDir = path.join(publicDir, 'data');
const detailEjsPath = path.join(publicDir, 'views', 'detail.ejs');

const saveFile = async (req, res) => {
  
  try {
    const {
      imageUrls: imageUrls, // pass the image urls to the server
      sideContents: updatedSideContents,
      URLINFO: URLINFO,
      DBData: DBData
    } = req.body;

    if (!updatedSideContents) {
      throw new Error('잘못된 요청');
    }
  
    // 여기 페이지를 detail.ejs 형식의 데이터에 맞게 변경

    const data = {
      // 이미지 정보 및 콘텐츠 내용 정리
      imageUrls: imageUrls,
      updatedSideContents: updatedSideContents,

      invitation_title: DBData.invitation_title
    };

    console.log(data.invitation_title);
    
    const detailHtml = await ejs.renderFile(detailEjsPath, data);
    


    const $detail = cheerio.load(detailHtml);
    const headerWithClass = $detail('head *');
    const classHtml = updatedSideContents.toString();

    // 여기를 템플릿 ID를 받아서 변경해줘야함
    const templateID = URLINFO;
    console.log(templateID);

    const html = `<!DOCTYPE html>
      <html>
        <head>
          ${headerWithClass}
        </head>
        <body>
          <div class="AppView" id="Appview">
            ${classHtml}
          </div>
          <div class="BgView"></div>
        </body>
      </html>`;

    const fileName = `${path.basename(templateID)}.ejs`;
    const filePath = path.join(dataDir, fileName);

    await fs.writeFile(filePath, html);
    console.log(`새로운 초대장 파일이 생성되었습니다: ${filePath}`);
    res.status(200).send('파일 저장 완료');
  } catch (error) {
    console.error(`파일 저장 실패: ${error.message}`);
    res.status(500).send('파일 저장 실패');
  }
};

module.exports = {
  saveFile
};
