let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const dbCtrl = {
  // 기존 메서드는 그대로 둠
  getDBs: async (req, res) => {
    connection.query('SELECT * FROM foment.Info', (error, rows) => {
      if (error) throw error;
      console.log(rows);
      res.send(rows);
    });
  },

  insertDBs: async (req, res) => {
    const { theme_type, BGM_type, effect_type, font_type, font_size, URL_data, invitation_title, title_upload_img,
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
    
    

    const sql = `INSERT INTO foment.Info (theme_type, BGM_type, effect_type, font_type, font_size, URL_data, invitation_title, title_upload_img,
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
    ('${theme_type}', '${BGM_type}', '${effect_type}', '${font_type}', ${font_size}, '${URL_data}', '${invitation_title}', '${title_upload_img}',
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
  }

};

module.exports = dbCtrl;
