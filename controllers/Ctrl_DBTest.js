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
    const {user_naver_ID, theme_type, BGM_type, effect_type, font_type, font_size, URL_data, invitation_title, title_upload_img,
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
    
    

    const sql = `INSERT INTO foment.template (user_naver_ID, theme_type, BGM_type, effect_type, font_type, font_size, URL_data, invitation_title, title_upload_img,
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
      
      ) VALUES
    ('${user_naver_ID}','${theme_type}', '${BGM_type}', '${effect_type}', '${font_type}', ${font_size}, '${URL_data}', '${invitation_title}', '${title_upload_img}',
    '${kakao_share_img}',
    '${groom_first_name}',
    '${groom_last_name}',
    '${select_groom_relationship}',
    '${groom_father_firstname}',
    '${groom_father_lastname}',
    '${groom_father_status_bool}',
    '${groom_father_status_type}',
    '${groom_mother_firstname}',
    '${groom_mother_lastname}',
    '${groom_mother_status_bool}',
    '${groom_mother_status_type}',
    '${bride_firstname}',
    '${bride_lastname}',
    '${select_bride_relationship}',
    '${bride_father_firstname}',
    '${bride_father_lastname}',
    '${bride_father_status_bool}',
    '${bride_father_status_type}',
    '${bride_mother_firstname}',
    '${bride_mother_lastname}',
    '${bride_mother_status_bool}',
    '${bride_mother_status_type}',
    '${wedding_date}',
    '${dday_toggle_bool}',
    '${wedding_AMPM}',
    '${wedding_time}',
    '${wedding_minute}',
    '${wedding_location}',
    '${wedding_location_hall}',
    '${wedding_address}',
    '${invite_title}',
    '${invite_body}',
    '${gallery_type}',
    '${img_group_element}',
    '${board_password}',
    '${order_tab}'
    
    )`;



    connection.query(sql, (error, result) => {
      if (error) throw error;
      console.log(result); 
      res.send(result);
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
        const userId = results[0].id;
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
          return res.json({ message: '새로운 사용자 정보가 등록되었습니다.' });
        });

      }
    });
  }
  
  

};

module.exports = dbCtrl;
