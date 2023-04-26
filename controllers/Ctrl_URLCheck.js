let dbConfig = require('../dbConfig');
let connection = dbConfig.connection;

const URLCheck = {
// GET 요청 처리
getUrl: (req, res) => {
    const naver_email = req.headers['naver_email'];
    const url = req.query.url;
    console.log(url);
    console.log(naver_email);
  
    const findUser = 'SELECT * FROM users WHERE naver_email=?';
    const findTemplate = 'SELECT * FROM template WHERE user_ID=?';
  
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
  
      const user_ID = results[0].ID;
      connection.query(findTemplate, [user_ID], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Server Error');
          return;
        }
  
        if (results.length === 0) {
          res.status(404).send('Not Found');
          return;
        }
  
        const template_ID = results[0].ID;
        const url_data = { url };
        const updateTemplate = 'UPDATE template SET URL_data = ? WHERE user_ID = ?';
        connection.query(updateTemplate, [JSON.stringify(url_data), template_ID], (error, results, fields) => {
          if (error) {
            console.error(error);
            res.status(500).send('Server Error');
            return;
          }
  
          res.json({ message: 'Success' });
        });
      });
    });
  },
  
  
  postUrl: (req, res) => {
    const naver_email = req.headers['naver_email'];
    const url = req.body.url;
    console.log(naver_email);

    const findUser = 'SELECT * FROM users WHERE naver_email=?';
    const insertTemplate = 'INSERT INTO template (user_ID, URL_data) VALUES (?, ?)';

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

      const user_ID = results[0].ID;

      connection.query(insertTemplate, [user_ID, url], (error, results, fields) => {
        if (error) {
          console.error(error);
          res.status(500).send('Server Error');
          return;
        }

        res.status(201).send('Created');
      });
    });
  }


};

module.exports = URLCheck;
