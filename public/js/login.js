// 네이버 로그인 관련 정리

document.addEventListener('DOMContentLoaded', () => {
  const myPage = document.getElementById('myPage');
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
  

  //로그아웃시 함수
  if (naverAccessToken) {
    console.log(naverAccessToken);
    if(emailinfo){
      emailinfo.innerText = naverId;
      myPage.style.display = "block";
    }
    if(btn){
      btn.innerText = "로그아웃";
    }
    if(LoginBound){
      LoginBound.style.display = "block";
    }
    if(btn){
      btn.addEventListener("click", () => {
        fetch('/api_Auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            naverAccessToken,
            naverEmail
          })
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
    }
  } else {

    // 로그인시 들어가는 함수들
    emailinfo.innerText = "";
    btn.innerText = "로그인";
    myPage.style.display = "none";
    LoginBound.style.display = "none";
    btn.addEventListener("click", () => {
      fetch('/api_Auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // 로그인에 필요한 정보 (ex. 아이디, 비밀번호 등)를 전달할 수 있습니다.
        })
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // 로그인 성공 시에 sessionStorage에 토큰과 이메일 정보를 저장합니다.
          sessionStorage.setItem("naver_access_token", data.naverAccessToken);
          sessionStorage.setItem("naver_email", data.naverAccessToken);
          // 로그인된 상태로 UI 업데이트를 수행합니다.
          emailinfo.innerText = data.email;
          btn.addEventListener("click", () => {
            // 로그아웃 처리를 수행하는 코드
          });
        } else {
          alert('로그인 실패');
        }
      });

      location.replace("/api_Auth/login");
    });
  }
  
});
