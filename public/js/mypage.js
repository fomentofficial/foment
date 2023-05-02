// // mypage 로드시
// // 페이지가 로드되면 실행됩니다.
// document.addEventListener('DOMContentLoaded', () => {
//     // 네이버 액세스 토큰을 세션 스토리지에서 가져옵니다.
//     const naverAccessToken = sessionStorage.getItem('naver_access_token');
//     if (naverAccessToken === null) {
//     // 네이버 액세스 토큰이 없으면 '/api_Auth/login' 페이지로 이동합니다.
//     // window.location.href = '/api_Auth/login';
//     } else {
//     // 네이버 이메일 세션을 가져오고 myPage 버튼을 가져옵니다.
//     const naverEmailSession = sessionStorage.getItem('naver_email');
//     const myPageBtn = document.querySelector('#myPage');
//   // myPage 버튼을 클릭하면 실행됩니다.
// myPageBtn.addEventListener('click', async (event) => {
//     // 버튼 클릭 이벤트를 중지합니다.
//     event.preventDefault();
//     // '/api_MypageData' 엔드포인트에 대한 fetch 요청을 보냅니다.
//     const response = await fetch('/mypage', {
//       // 사용자 이메일을 커스텀 헤더로 추가합니다.
//       headers: {
//         'Content-Type': 'application/json',
//         'naver_email': naverEmailSession
//       }
//     });
//     if (response.ok) {
//       // 응답이 성공하면 HTML을 가져와 현재 문서에 쓰고 닫습니다.
//       const html = await response.text();
//       document.open();
//       document.write(html);
//       document.close();
//     } else {
//       // 응답이 실패하면 콘솔에 에러 메시지를 출력합니다.
//       console.error('GET 요청에 실패했습니다.');
//     }
//   });
// }
// });



// mypage 로드시
// 페이지가 로드되면 실행됩니다.
document.addEventListener('DOMContentLoaded', () => {
    // 네이버 액세스 토큰을 세션 스토리지에서 가져옵니다.
    const myPageBtn = document.querySelector('#myPage');
  // myPage 버튼을 클릭하면 실행됩니다.
myPageBtn.addEventListener('click', async (event) => {
    // 버튼 클릭 이벤트를 중지합니다.
    event.preventDefault();
    // '/api_MypageData' 엔드포인트에 대한 fetch 요청을 보냅니다.
    window.location.href = '/mypage';
  });
})




// document.addEventListener('DOMContentLoaded', () => {
// const myPageBtn = document.querySelector('#myPage');

// // myPage 버튼을 클릭하면 실행됩니다.
// myPageBtn.addEventListener('click', async (event) => {
//   // 버튼 클릭 이벤트를 중지합니다.
//   event.preventDefault();

//   // '/mypage' 경로로 이동합니다.
//   window.location.href = '/mypage';
// });

// })
