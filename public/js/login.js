// 네이버 로그인 관련 정리
document.addEventListener('DOMContentLoaded', () => {
  const naverLogin = new naver.LoginWithNaverId({
    clientId: "ZwV8tMKR9goChugNiuqV",
    callbackUrl: "http://localhost:3000/",
    isPopup: false, // 팝업을 통한 연동처리 여부
    callbackHandle: true
  });

  naverLogin.init(); // 이 부분을 수정해주세요.

  const naverAccessToken = sessionStorage.getItem("naver_access_token");
  console.log(naverAccessToken);

  const btn = document.querySelector("#LogoutBtn");
  if (naverAccessToken) {
    btn.innerText = "로그아웃";
    btn.addEventListener("click", () => {
      sessionStorage.removeItem("naver_access_token");
      location.replace("http://localhost:3000/");
    });
  } else {
    btn.innerText = "로그인";
    btn.addEventListener("click", () => {
      location.replace("http://localhost:3000/naver_login");
    });
  }
});
