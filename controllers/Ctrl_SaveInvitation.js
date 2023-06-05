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
      ModalGroups: ModalGroups,
      imageUrls: imageUrls, // pass the image urls to the server
      sideContents: updatedSideContents,
      URLINFO: URLINFO,
      DBData: DBData
    } = req.body;

    if (!updatedSideContents) {
      throw new Error('잘못된 요청');
    }
  
    const Templatedata = {
      // 이미지 정보 및 콘텐츠 내용 정리
      imageUrls: imageUrls,
      updatedSideContents: updatedSideContents,
      Templatedata :{
        data :{
          theme_type : DBData.theme_type,
          BGM_type: DBData.BGM_type,
          effect_type: DBData.effect_type,
          font_type: DBData.font_type,
          font_size: DBData.font_size,
          // URL_data: DBData.URL_data,
          invitation_title: DBData.invitation_title,
          title_upload_img: DBData.title_upload_img,
          kakao_share_img: DBData.kakao_share_img,
          groom_first_name: DBData.groom_first_name,
          groom_last_name: DBData.groom_last_name,
          select_groom_relationship: DBData.select_groom_relationship,
          groom_father_firstname: DBData.groom_father_firstname,
          groom_father_lastname: DBData.groom_father_lastname,
          groom_father_status: DBData.groom_father_status,
          groom_father_status_type: DBData.groom_father_status_type,
          groom_mother_firstname: DBData.groom_mother_firstname,
          groom_mother_lastname: DBData.groom_mother_lastname,
          groom_mother_status: DBData.groom_mother_status,
          groom_mother_status_type: DBData.groom_mother_status_type,
          bride_firstname: DBData.bride_firstname,
          bride_lastname: DBData.bride_lastname,
          select_bride_relationship: DBData.select_bride_relationship,
          bride_father_firstname: DBData.bride_father_firstname,
          bride_father_lastname: DBData.bride_father_lastname,
          bride_father_status: DBData.bride_father_status,
          bride_father_status_type: DBData.bride_father_status_type,
          bride_mother_firstname: DBData.bride_mother_firstname,
          bride_mother_lastname: DBData.bride_mother_lastname,
          bride_mother_status: DBData.bride_mother_status,
          bride_mother_status_type: DBData.bride_mother_status_type,
          wedding_date:DBData.wedding_date,
          dday_toggle:DBData.dday_toggle,
          wedding_AMPM:DBData.wedding_AMPM,
          wedding_time:DBData.wedding_time,
          wedding_minute:DBData.wedding_minute,
          wedding_location:DBData.wedding_location,
          wedding_location_hall:DBData.wedding_location_hall,
          wedding_address:DBData.wedding_address,
          invite_title:DBData.invite_title,
          invite_body:DBData.invite_body,
          gallery_type:DBData.gallery_type,
          img_group_element:JSON.stringify(DBData.img_group_element),
          board_password:DBData.board_password,
          order_tab:JSON.stringify(DBData.order_tab)
        }
      }
    };
    
    const detailHtml = await ejs.renderFile(detailEjsPath, Templatedata);
    


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
        ${ModalGroups}
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
