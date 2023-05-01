//mypage 로드시
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    if (currentPath !== '/mypage') {
      return;
    }
  
    const naverAccessToken = sessionStorage.getItem('naver_access_token');
    console.log(naverAccessToken);
    if (naverAccessToken === null) {
      window.location.href = '/api_Auth/login';
    } else {
      const naverEmailSession = sessionStorage.getItem('naver_email');
      console.log(naverEmailSession);
  
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/api_MypageData');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('naver_email', naverEmailSession);
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log('GET 요청에 성공했습니다.');
          const mypagedata = xhr.response;
          console.log(mypagedata);
        } else {
          console.error('GET 요청에 실패했습니다.');
        }
      };
      xhr.send(JSON.stringify({ template_Count: 'template001' }));
    }
  });
  