//mypage 로드시
document.addEventListener('DOMContentLoaded', () => {
    const naverAccessToken = sessionStorage.getItem('naver_access_token');
    if (naverAccessToken === null) {
      window.location.href = '/api_Auth/login';
    } else {
      const naverEmailSession = sessionStorage.getItem('naver_email');
      const myPageBtn = document.querySelector('#myPage');
          
      myPageBtn.addEventListener('click', async (event) => {
        event.preventDefault();
        const response = await fetch('/api_MypageData', {
          headers: {
            'Content-Type': 'application/json',
            'naver_email': naverEmailSession
          }
        });
        if (response.ok) {
          const html = await response.text();
          document.open();
          document.write(html);
          document.close();
        } else {
          console.error('GET 요청에 실패했습니다.');
        }
      });
    }
  });
  