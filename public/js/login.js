// 네이버 로그인 관련 정리
document.addEventListener('DOMContentLoaded', () => {

  const btn = document.querySelector("#LogoutBtn");
  const emailinfo = document.querySelector('.LoginInfo');
  const LoginBound = document.querySelector('.LoginBound');
  const naverAccessToken = sessionStorage.getItem("naver_access_token");
  const naverEmail = sessionStorage.getItem("naver_email");

  let naverId = "";
  
  // 네이버 이메일 주소 아이디로 변환
  if (naverEmail) {
    const naverEmailInfo = naverEmail.split("@naver.com");
    naverId = naverEmailInfo.slice(0, -1).join("");
  }
  
  console.log(naverAccessToken);
  console.log(naverId);
  

  // 로그인 / 로그아웃시 함수
  if (naverAccessToken) {
    emailinfo.innerText = naverId;
    btn.innerText = "로그아웃";
    LoginBound.style.display = "block";
    btn.addEventListener("click", () => {
      fetch('/api_Auth/logout', {
        method: 'POST',
      })
      .then((response) => response.json())
      .then((data) => {
          if (data.success) {
              alert('로그아웃 성공');
          } else {
              alert('로그아웃 실패');
          }
      });
      sessionStorage.removeItem("naver_access_token");
      sessionStorage.removeItem("naver_email"); // 이메일 정보도 삭제
      location.replace("/");
    });
  } else {
    emailinfo.innerText = "";
    btn.innerText = "로그인";
    LoginBound.style.display = "none";
    btn.addEventListener("click", () => {
      location.replace("/api_Auth/login");
    });
    
      // 로그인 페이지로 이동할 때, accesstoken과 naveremail을 post로 전송할 수 있습니다.
    fetch('/api_Auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        naverAccessToken: sessionStorage.getItem("naver_access_token"),
        naverEmail: sessionStorage.getItem("naver_email")
      })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log('datasend-success');
        } else {
          console.log('datasend-fail');
        }
    });

  }
  
});