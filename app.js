const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

app.set('view engine', 'ejs');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// EJS 파일이 저장된 디렉토리 설정
app.set('views', path.join(__dirname, 'public', 'views'));

// EJS 파일을 렌더링하는 라우터
// 서버 측 코드
app.get('/', (req, res) => {
  const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
  res.render('index', {clientId});
});


app.get('/detail', (req, res) => {
  const data = {
    pageTitle: 'Detail Page',
    message: 'This is the detail page'
  };
  res.render('detail', data || {});
});

// 정적 파일 서비스 미들웨어 등록
app.use(express.static(path.join(__dirname, 'public')));

// 라우터 모듈 로드
const dbConfig = require('./dbConfig');
const TitleImgUpload = require('./routes/route_api_TitleImgUpload.js');
const saveProgressRouter = require('./routes/route_SaveInvitation');
const saveHistoryRouter = require('./routes/route_SaveMyPage');
const EditInvitationRouter = require('./routes/route_EditInvitation');
const DBtest = require('./routes/route_api_DBtest');
const MultiImgUpload = require('./routes/route_api_MultiImgUpload');
const Auth = require('./routes/route_api_Auth');
const AuthCallback = require('./routes/route_api_AuthCallback');

app.use(express.json());

app.use('/api_TitleImgUpload', TitleImgUpload);
app.use('/api_SaveInvitation', saveProgressRouter);
app.use('/api_SaveMyPage', saveHistoryRouter);
app.use('/api_EditInvitation', EditInvitationRouter);
app.use('/api_MultiImgUpload', MultiImgUpload);

// 네이버 로그인 API
app.use('/api_Auth', Auth);
app.use('/api_AuthCallback', AuthCallback);

// DB소스 관련
app.use('/api_DBtest', DBtest);

// 클라이언트 ID값
app.get('/api_naver_client_id', function(req, res) {
  const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
  res.json({ clientId: clientId });
});


app.listen(3000, () => {
  console.log('서버가 시작되었습니다.');
});
