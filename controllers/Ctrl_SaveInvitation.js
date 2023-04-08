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
      url: invURL,
      sideContents: sideContents
    } = req.body;

    if (!invURL || !sideContents) {
      throw new Error('잘못된 요청');
    }
  

    const detailHtml = await ejs.renderFile(detailEjsPath, {
      imageUrls,
      invURL,
      sideContents
    });

    const $detail = cheerio.load(detailHtml);
    const headerWithClass = $detail('head *');
    const classHtml = sideContents.toString();

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

    const fileName = `${path.basename(invURL)}.html`;
    const filePath = path.join(dataDir, fileName);

    await fs.writeFile(filePath, html);
    console.log(`파일 저장: ${filePath}`);
    res.status(200).send('파일 저장 완료');
  } catch (error) {
    console.error(`파일 저장 실패: ${error.message}`);
    res.status(500).send('파일 저장 실패');
  }
};

module.exports = {
  saveFile
};
