const express = require('express');
const path = require('path');
const app = express();
const ejs = require('ejs');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
const request = require('request');
require('dotenv').config();
const session = require('express-session');


app.set('view engine', 'ejs');
const bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// EJS 파일이 저장된 디렉토리 설정
app.set('views', path.join(__dirname, 'public', 'views'));


// dotenv 설정을 추가한 후 session 설정을 수정하세요.
app.use(session({
  secret: process.env.SESSION_SECRET_KEY, // 실제로는 .env 파일 등에 저장하고 사용하세요
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // 개발 환경에서는 false로 설정하고, 실제 배포 환경에서는 true로 설정하세요
    maxAge: 1000 * 60 * 60 * 24 // 쿠키 만료 시간 (예: 24시간)
  }
}));

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
const URLCheck = require('./routes/route_api_URLCheck');
const Mypage = require('./routes/route_api_Mypage');
const CreateTemplate = require('./routes/route_api_CreateTemplate');
const GetInvitationPageRouter = require('./routes/route_GetInvitation');
const AccountInfo = require('./routes/route_api_AccountInfo');

// 게시판 관련 라우터
const Board = require('./routes/route_api_Board');
const GetBoard = require('./routes/route_api_GetBoard');
const DeleteBoardRouter = require('./routes/route_api_DeleteBoard');

app.use(express.json());

app.use('/api_TitleImgUpload', TitleImgUpload);
app.use('/api_SaveInvitation', saveProgressRouter);
app.use('/api_SaveMyPage', saveHistoryRouter);
app.use('/api_EditInvitation', EditInvitationRouter);
app.use('/api_GetInvitation', GetInvitationPageRouter);
app.use('/api_MultiImgUpload', MultiImgUpload);
app.use('/api_Board', Board);
app.use('/api_GetBoard', GetBoard);
app.use('/api_DeleteBoard', DeleteBoardRouter);

// 네이버 로그인 라우터
app.use('/api_Auth', Auth);
app.use('/api_AuthCallback', AuthCallback);

// DB 라우터
app.use('/api_DBtest', DBtest);

// URL 유효성 검증 라우터
app.use('/api_URL', URLCheck);

// 템플릿 생성 라우터
app.use('/api_CreateTemplate', CreateTemplate);

// myPage Data 생성 라우터
app.use('/mypage', Mypage);

// 계좌정보 라우터
app.use('/api_Account', AccountInfo);

// 클라이언트 ID값
app.get('/api_naver_client_id', function(req, res) {
  const clientId = process.env.NAVER_LOGIN_CLIENT_ID;
  res.json({ clientId: clientId });
});


app.listen(3000, () => {
  console.log('서버가 시작되었습니다.');
});
