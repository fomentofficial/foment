// 네이버 로그인 관련 정리
document.addEventListener('DOMContentLoaded', () => {
  const naverLogin = new naver.LoginWithNaverId({
    clientId: '<%= clientId %>',
    callbackUrl: "/",
    isPopup: false, // 팝업을 통한 연동처리 여부
    callbackHandle: true
  });

  naverLogin.init(); // 이 부분을 수정해주세요.

  const btn = document.querySelector("#LogoutBtn");
  const naverAccessToken = sessionStorage.getItem("naver_access_token");
  const naverEmail = sessionStorage.getItem("naver_email");

  console.log(naverAccessToken);
  console.log(naverEmail);

  if (naverAccessToken) {
    btn.innerText = "로그아웃";
    btn.addEventListener("click", () => {
      sessionStorage.removeItem("naver_access_token");
      sessionStorage.removeItem("naver_email"); // 이메일 정보도 삭제
      location.replace("/");
    });
  } else {
    btn.innerText = "로그인";
    btn.addEventListener("click", () => {
      location.replace("/api_NaverLogin");
    });
  }
});
