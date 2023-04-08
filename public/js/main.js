// 네이버 로그인 관련 정리

var naver_id_login = new naver_id_login("ZwV8tMKR9goChugNiuqV", "http://localhost:5500/public/html/detail.html");
// 접근 토큰 값 출력
console.log(naver_id_login.oauthParams.access_token);

const btn = document.querySelector("#myBtn");
btn.addEventListener("click", () => {
  if (this.navLogin.oauthParams.access_token) {
    location.replace("http://localhost:5500/public/html/detail.html#access_token=AAAAOFyYHQnsb8xmo4rKyJBy8GgBbLyhFs8olEv1R935GovtJwHThwDJEM6S-hbFXWmhO7RzF9HUS5LAoRPvsLTflJ8&state=809584c4-a9f5-4aa0-bc6e-c8440160bf3e&token_type=bearer&expires_in=3600");
  } else {
    alert("로그인이 필요합니다");
    location.replace("http://localhost:5500/public/html/naver_login.html");
  }
});