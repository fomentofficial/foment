// 네이버 로그인 관련 정리
document.addEventListener('DOMContentLoaded', () => {

  const btn = document.querySelector("#LogoutBtn");
  const emailinfo = document.querySelector('.LoginInfo');
  const LoginBound = document.querySelector('.LoginBound');
  const naverAccessToken = sessionStorage.getItem("naver_access_token");
  const naverEmail = sessionStorage.getItem("naver_email");

  let naverId = "";
  
  if (naverEmail) {
    const naverEmailInfo = naverEmail.split("@naver.com");
    naverId = naverEmailInfo.slice(0, -1).join("");
  }
  
  console.log(naverAccessToken);
  console.log(naverId);
  
  if (naverAccessToken) {
    emailinfo.innerText = naverId;
    btn.innerText = "로그아웃";
    LoginBound.style.display = "block";
    btn.addEventListener("click", () => {
      sessionStorage.removeItem("naver_access_token");
      sessionStorage.removeItem("naver_email"); // 이메일 정보도 삭제
      location.replace("/");
    });
  } else {
    emailinfo.innerText = "";
    btn.innerText = "로그인";
    LoginBound.style.display = "none";
    btn.addEventListener("click", () => {
      location.replace("/api_NaverLogin");
    });
  }
  
});
