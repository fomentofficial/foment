const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');

// 데이터베이스 설정 가져오기
let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

// short-uuid 라이브러리 가져오기
const short = require('short-uuid');

// CreateTemplate 객체
let CreateTemplate = {
  postInfo: (req, res) => {
    // 헤더에서 네이버 이메일 정보 가져오기
    const naver_email = req.headers['naver_email'];

    console.log(naver_email);

    // 사용자 정보 가져오기 쿼리
    const findUser = 'SELECT * FROM users WHERE naver_email=?';
    // 템플릿 생성 쿼리
    const insertTemplate = 'INSERT INTO template (user_ID, template_ID, create_date, update_date) VALUES (?, ?, NOW(), NOW() )';

    // 네이버 이메일로 사용자 정보 가져오기
    connection.query(findUser, [naver_email], (error, results, fields) => {
      if (error) {
        console.error(error);
        res.status(500).send('Server Error');
        return;
      }

      if (results.length === 0) {
        res.status(404).send('Not Found');
        return;
      }

      // 사용자 ID 가져오기
      const user_ID = results[0].ID;
      // short-uuid 라이브러리로 새로운 템플릿 ID 생성하기
      const su = short();
      const template_ID = su.new();

      // 템플릿 생성하기
      connection.query(insertTemplate, [user_ID, template_ID], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Server Error');
          return;
        }

        // 템플릿 파일 경로 및 파일명 정의
        const templateFileName = 'detail.ejs';
        const newTemplateFileName = `template_${template_ID}.ejs`;
        const templateFilePath = path.join(__dirname, '..', 'public', 'views', templateFileName);
        const newTemplateFilePath = path.join(__dirname, '..', 'public', 'data', newTemplateFileName);

        const Templatedata = {
          Templatedata :{
            data :{
              theme_type : '',
              BGM_type: 'NoneAudio',
              effect_type: 'CherryblossomEffect',
              font_type: 'GowunDodum-Regular',
              font_size: 14,
              invitation_title: '',
              title_upload_img: '/Resource/mainasset/WeddingTitleImg.jpg',
              kakao_share_img: '/Resource/mainasset/WeddingTitleImg.jpg',
              groom_first_name: '',
              groom_last_name: '',
              select_groom_relationship: '아들',
              groom_father_firstname: '',
              groom_father_lastname: '',
              groom_father_status: 0,
              groom_father_status_type: '故',
              groom_mother_firstname: '',
              groom_mother_lastname: '',
              groom_mother_status: 0,
              groom_mother_status_type: '故',
              bride_firstname: '',
              bride_lastname: '',
              select_bride_relationship: '딸',
              bride_father_firstname: '',
              bride_father_lastname: '',
              bride_father_status: 0,
              bride_father_status_type: '故',
              bride_mother_firstname: '',
              bride_mother_lastname: '',
              bride_mother_status: 0,
              bride_mother_status_type: '故',
              wedding_date: '',
              dday_toggle: 1,
              wedding_AMPM: '오후',
              wedding_time: '1시',
              wedding_minute: '00분',
              wedding_location: '',
              wedding_location_hall: '',
              wedding_address: '',
              invite_title: '',
              invite_body: '',
              gallery_type: 'BoardType',
              // img_group_element: '',
              board_password: '',
              // order_tab : ''
            }
          }
        }

        // 템플릿 파일 렌더링, 여기 데이터를 ejs와 동일한 형식으로 변경
        ejs.renderFile(templateFilePath, Templatedata, (err, html) => {
          if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
          }
          // 생성된 템플릿 파일 ID를 클라이언트로 전송
          res.status(200).send(template_ID.toString());
          console.log('새로운 템플릿 파일이 생성되었습니다: ' + newTemplateFileName);

          // 렌더링된 HTML 파일을 새 파일로 저장
          fs.writeFile(newTemplateFilePath, html, (err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Server Error');
              return;
            }
          });
        });
      });
    });
  },

  getInfo: async (req, res) => {
    try {
      const templateID = req.params.id;
      const templateFilePath = path.join(__dirname, '..', 'public', 'data', `template_${templateID}.ejs`);
      
      // 템플릿 파일을 읽어서 내용을 가져옵니다.
      const templateFile = await fs.readFile(templateFilePath, 'utf-8');
      
      // 템플릿 파일을 렌더링합니다.
      const renderedHtml = ejs.render(templateFile, { /* data */ });
      
      // 렌더링된 HTML 코드를 응답으로 전송합니다.
      res.render(templateFilePath, { renderedHtml });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  }
  
  

};






module.exports = CreateTemplate;
