let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const dbCtrl = {
  // 기존 메서드는 그대로 둠
  getDBs: async (req, res) => {
    connection.query('SELECT * FROM foment.template', (error, rows) => {
      if (error) throw error;
      console.log(rows);
      res.send(rows);
    });
  },

  insertDBs: async (req, res) => {
    const { templateID, user_naver_ID, theme_type, BGM_type, effect_type, font_type, font_size, URL_data, invitation_title, title_upload_img,
      kakao_share_img,
      groom_first_name,
      groom_last_name,
      select_groom_relationship,
      groom_father_firstname,
      groom_father_lastname,
      groom_father_status,
      groom_father_status_type,
      groom_mother_firstname,
      groom_mother_lastname,
      groom_mother_status,
      groom_mother_status_type,
      bride_firstname,
      bride_lastname,
      select_bride_relationship,
      bride_father_firstname,
      bride_father_lastname,
      bride_father_status,
      bride_father_status_type,
      bride_mother_firstname,
      bride_mother_lastname,
      bride_mother_status,
      bride_mother_status_type,

      wedding_date,
      dday_toggle,
      wedding_AMPM,
      wedding_time,
      wedding_minute,
      wedding_location,
      wedding_location_hall,
      wedding_address,
      invite_title,
      invite_body,
      gallery_type,
      img_group_element,
      board_password,
      order_tab
    } = req.body;
  

    const groom_father_status_bool = groom_father_status === true ? 1 : 0;
    const groom_mother_status_bool = groom_mother_status === true ? 1 : 0;
    const bride_father_status_bool = bride_father_status === true ? 1 : 0;
    const bride_mother_status_bool = bride_mother_status === true ? 1 : 0;
    const dday_toggle_bool = dday_toggle === true ? 1 : 0;
    const order_tab_data = JSON.stringify(order_tab);
    const img_group_element_data = JSON.stringify(img_group_element);

    console.log('이미지 그룹 데이터 조회:' + img_group_element_data);

    //const getUserIdSql 변수에는 네이버 이메일 주소를 통해 사용자 ID를 조회하는 SQL 쿼리가 담겨 있습니다.
    const getUserIdSql = `SELECT ID FROM users WHERE naver_email='${user_naver_ID}'`;

    console.log('오류체크용' + getUserIdSql);

    // connection.query() 함수를 사용하여 getUserIdSql 쿼리를 실행하고, 결과값인 result 객체에서 조회된 사용자 ID를 추출하여 userId 변수에 저장합니다.

    connection.query(getUserIdSql, (error, result) => {
      if (error) throw error;

      const userId = result[0].ID;

      // 사용자 ID값이 일치하고 template_ID 값이 일치하는 template 테이블의 행을 조회하는 SQL 쿼리
      const getTemplateIdSql = `SELECT user_ID FROM template WHERE user_ID=${userId} AND template_ID='${templateID}'`;
      console.log('템플릿 ID 조회 테스트' + getTemplateIdSql);

      connection.query(getTemplateIdSql, (error, result) => {
        if (error) throw error;

        // 이미 존재하는 데이터인 경우
        if (result.length > 0) {

          const updateDataSql =
            `UPDATE foment.template SET 

      create_date = NOW(),
      update_date = NOW(),
      theme_type = '${theme_type}',
      BGM_type = '${BGM_type}',
      effect_type = '${effect_type}',
      font_type = '${font_type}',
      font_size = '${font_size}',
      invitation_title = '${invitation_title}',
      title_upload_img = '${title_upload_img}',
      kakao_share_img = '${kakao_share_img}',
      groom_first_name = '${groom_first_name}',
      groom_last_name = '${groom_last_name}',
      select_groom_relationship = '${select_groom_relationship}',
      groom_father_firstname = '${groom_father_firstname}',
      groom_father_lastname = '${groom_father_lastname}',
      groom_father_status = '${groom_father_status_bool}',
      groom_father_status_type = '${groom_father_status_type}',
      groom_mother_firstname = '${groom_mother_firstname}',
      groom_mother_lastname = '${groom_mother_lastname}',
      groom_mother_status = '${groom_mother_status_bool}',
      groom_mother_status_type = '${groom_mother_status_type}',

      bride_firstname = '${bride_firstname}',
      bride_lastname = '${bride_lastname}',
      select_bride_relationship = '${select_bride_relationship}',
      bride_father_firstname = '${bride_father_firstname}',
      bride_father_lastname = '${bride_father_lastname}',
      bride_father_status = '${bride_father_status_bool}',
      bride_father_status_type = '${bride_father_status_type}',
      bride_mother_firstname = '${bride_mother_firstname}',
      bride_mother_lastname = '${bride_mother_lastname}',
      bride_mother_status = '${bride_mother_status_bool}',
      bride_mother_status_type = '${bride_mother_status_type}',

      wedding_date = '${wedding_date}',
      dday_toggle = '${dday_toggle_bool}',
      wedding_AMPM = '${wedding_AMPM}',
      wedding_time = '${wedding_time}',
      wedding_minute = '${wedding_minute}',
      wedding_location = '${wedding_location}',
      wedding_location_hall = '${wedding_location_hall}',
      wedding_address = '${wedding_address}',
      invite_title = '${invite_title}',
      invite_body = '${invite_body}',
      gallery_type = '${gallery_type}',
      img_group_element = '${img_group_element_data}',
      board_password = '${board_password}',
      order_tab = '${order_tab_data}'
    
      WHERE user_ID = ${userId} AND template_ID = '${templateID}'`;

          connection.query(updateDataSql, (error, result) => {
            if (error) throw error;
            console.log(result);
            res.send(result);
          });

        } else { // 존재하지 않는 경우
          return res.json({ message: '템플릿 저장 오류' });
        }
      });
    });



  },








  insert_Auth_DBs: async (req, res) => {
    const {
      naver_ID,
      naverEmail,
      naverAccessToken
    } = req.body;

    // foment.users 테이블에서 naver_ID와 일치하는 사용자 정보 조회
    const selectSql = `SELECT * FROM foment.users WHERE naver_ID = ?`;
    const selectValues = [naver_ID];
    connection.query(selectSql, selectValues, (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
      }

      if (results.length > 0) {
        // 이미 등록된 사용자가 있는 경우, 해당 사용자의 access_token을 업데이트합니다.
        const updateSql = `UPDATE foment.users SET access_token = ?, update_date = NOW() WHERE naver_ID = ?`;
        const updateValues = [naverAccessToken, naver_ID];
        console.log(updateValues);
        connection.query(updateSql, updateValues, (updateError, updateResults) => {
          if (updateError) {
            console.error(updateError);
            return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
          }
          return res.json({ message: '사용자 정보가 업데이트되었습니다.' });
        });
      } else {
        // 등록된 사용자가 없는 경우, 새로운 사용자 정보를 추가합니다.
        const insertSql = `INSERT INTO foment.users (naver_ID, naver_Email, access_token, signup_date, update_date) VALUES (?, ?, ?, NOW(), NOW())`;
        const insertValues = [naver_ID, naverEmail, naverAccessToken];
        connection.query(insertSql, insertValues, (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
          }
          const insertedId = results.insertId; // AUTO_INCREMENT 열에서 생성된 값 가져오기
          console.log(`Inserted ID: ${insertedId}`);


          // foment.publish 테이블의 user_id와 template_ID 열에 insertedId 값을 추가합니다.
          const publishInsertSql = `INSERT INTO foment.publish (user_id, template_ID) VALUES (?, ?)`;
          const publishInsertValues = [insertedId, insertedId];
          connection.query(publishInsertSql, publishInsertValues, (publishInsertError, publishInsertResults) => {
            console.log(`Inserted publish ID: ${publishInsertValues}`);
            if (publishInsertError) {
              console.error(publishInsertError);
              return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
            }

            // foment.board 테이블의 user_id와 template_ID 열에 insertedId 값을 추가합니다.
            const boardInsertSql = `INSERT INTO foment.board (user_id, template_ID) VALUES (?, ?)`;
            const boardInsertValues = [insertedId, insertedId];
            connection.query(boardInsertSql, boardInsertValues, (boardInsertError, boardInsertResults) => {
              console.log(`Inserted publish ID: ${boardInsertValues}`);
              if (boardInsertError) {
                console.error(boardInsertError);
                return res.status(500).json({ message: '서버 에러가 발생했습니다.' });
              }
              return res.json({ message: '새로운 사용자 정보가 등록되었습니다.' });
            });
          });

        });
      }



    });
  }



};

module.exports = dbCtrl;
