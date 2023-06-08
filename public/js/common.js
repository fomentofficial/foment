
window.onload = function () {

    let toggleActiveClass = (element) => {
        element.classList.toggle('is-active');
    };

    let BoardCreateBtn = document.getElementById('BoardCreateBtn');
    let BoardViewBtn = document.getElementById('BoardViewBtn');
    let BoardDelBtn = document.querySelectorAll('.BoardDelete');
    console.log(BoardDelBtn);

    let BoardDimmed = document.getElementById('Board_Create_Dimmed');
    let BoardViewDimmed = document.getElementById('Board_View_Dimmed');
    let BoardDelDimmed = document.getElementById('Board_Del_Dimmed');

    let CancelDimmed_Create = document.getElementById('CloseAlert_Create');
    let CancelDimmed_View = document.getElementById('CloseAlert_View');
    let CancelDimmed_Del = document.getElementById('CloseAlert_Del');
    console.log(CancelDimmed_View);

    // 방명록 남기기 버튼&취소
    if (BoardCreateBtn) {
        BoardCreateBtn.addEventListener('click', () => {
            toggleActiveClass(BoardDimmed);
        });
    }

    if (CancelDimmed_Create) {
        CancelDimmed_Create.addEventListener('click', () => {
            toggleActiveClass(BoardDimmed);
        });
    }

    // 방명록 목록 보기 버튼&취소
    if (BoardViewBtn) {
        BoardViewBtn.addEventListener('click', () => {
            toggleActiveClass(BoardViewDimmed);
        });
    }

    if (CancelDimmed_View) {
        CancelDimmed_View.addEventListener('click', () => {
            toggleActiveClass(BoardViewDimmed);
        });
    }

    // 방명록 삭제 버튼&취소
    if (BoardDelBtn) {
        BoardDelBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                toggleActiveClass(BoardDelDimmed);
                console.log('ddd');
            });
        });
    }

    if (CancelDimmed_Del) {
        CancelDimmed_Del.addEventListener('click', () => {
            toggleActiveClass(BoardDelDimmed);
        });
    }



    // Create_InvitationBtn 요소를 가져옵니다.
    const CreateBtn = document.getElementById('Create_InvitationBtn');

    // CreateBtn 이 존재한다면 이벤트리스너를 추가합니다.
    if (CreateBtn) {
        CreateBtn.addEventListener('click', () => {
            // 현재 로그인한 네이버 사용자의 access token을 가져옵니다.
            const naverAccessToken = sessionStorage.getItem("naver_access_token");
            console.log(naverAccessToken);

            // 만약 access token이 null이라면 로그인 페이지로 이동합니다.
            if (naverAccessToken === null) {
                window.open('/api_Auth/login');
            } else {
                // 현재 로그인한 네이버 사용자의 이메일 주소를 가져옵니다.
                const naverEmailSession = sessionStorage.getItem('naver_email');
                console.log(naverEmailSession);

                // /api_CreateTemplate 경로로 POST 요청을 보냅니다.
                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api_CreateTemplate');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('naver_email', naverEmailSession);

                // POST 요청이 완료되면 실행할 콜백 함수입니다.
                xhr.onload = function () {
                    // 만약 요청이 성공했다면
                    if (xhr.status === 200) {
                        console.log('POST 요청에 성공했습니다.');

                        // 응답으로 받은 template_ID를 가져옵니다.
                        let template_ID = xhr.responseText;

                        // /api_GetTemplate/:id 경로로 GET 요청을 보냅니다.
                        const xhr2 = new XMLHttpRequest();
                        xhr2.open('GET', `/api_CreateTemplate/${template_ID}`);

                        // GET 요청이 완료되면 실행할 콜백 함수입니다.
                        xhr2.onload = function () {
                            // 만약 요청이 성공했다면
                            if (xhr2.status === 200) {
                                console.log('GET 요청에 성공했습니다.');

                                // 응답으로 받은 렌더링된 템플릿 코드를 가져와서 새로운 창을 엽니다.
                                const renderedtemplateejs = xhr2.responseText;
                                console.log(renderedtemplateejs);
                                const newWindow = window.location.href = `/api_CreateTemplate/${template_ID}`;
                                newWindow.document.write(renderedtemplateejs);
                            } else {
                                console.error('Get Template GET 요청에 실패했습니다.');
                            }
                        };
                        xhr2.send();
                        console.log(xhr.responseText);
                    } else {
                        console.error('Create Template POST 요청에 실패했습니다.');
                    }
                };

                // POST 요청의 body에 담을 데이터를 JSON 형식으로 만들어서 보냅니다.
                xhr.send(JSON.stringify({ template_ID: 'template001' }));
            }
        });
    }





    let URLBtn = document.getElementById('URL_Btn');

    if (URLBtn) {
        URLBtn.addEventListener('click', () => {
            let naverEmailSession = sessionStorage.getItem("naver_email");
            let inputPrintURL = document.getElementById('InputURL').value;
            console.log(naverEmailSession);
            console.log(inputPrintURL);

            let xhr = new XMLHttpRequest();
            let requestURL = `api_URL/getURL?url=${inputPrintURL}`; // 수정된 부분
            xhr.open('GET', requestURL);
            xhr.setRequestHeader('naver_email', naverEmailSession);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText);
                    if (response.exists) {
                        alert('이미 사용 중인 URL입니다.');
                    } else {
                        alert('사용 가능한 URL입니다.');
                        let xhr2 = new XMLHttpRequest();
                        xhr2.open('POST', 'api_URL/postURL');
                        xhr2.setRequestHeader('Content-Type', 'application/json');
                        xhr2.setRequestHeader('naver_email', naverEmailSession);
                        xhr2.send(JSON.stringify({ url: inputPrintURL }));
                        xhr2.onload = function () {
                            if (xhr2.status === 200) {
                                console.log('URL이 DB에 추가되었습니다.');
                            }
                        }
                    }
                } else {
                    alert('서버 오류가 발생했습니다.');
                }
            };
            xhr.send();
        });
    }



    // 메인에서 카드 선택시
    const btns = document.querySelectorAll('.MakeInvitation');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const naverAccessToken = sessionStorage.getItem("naver_access_token");
            console.log(naverAccessToken);
            if (naverAccessToken === null) {
                window.open('/api_Auth/login');
            } else {
                const naverEmailSession = sessionStorage.getItem('naver_email');
                console.log(naverEmailSession);

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/api_CreateTemplate');
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('naver_email', naverEmailSession);
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        console.log('POST 요청에 성공했습니다.');
                        let template_ID = xhr.responseText
                        let templateURL = `http://localhost:3000/data/template_${template_ID}.html`
                        window.open(templateURL, '_blank');
                        console.log(xhr.responseText);
                    } else {
                        console.error('POST 요청에 실패했습니다.');
                    }
                };
                xhr.send(JSON.stringify({ template_ID: 'template001' }));
            }
        });
    });

    function observeElements(observermain, elements) {
        elements.forEach(element => {
            observermain.observe(element);
        });
    }

    let observermain = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.5 });

    let MainBanner = document.querySelectorAll('.BannerDecoWrap');
    let GuideWrap = document.querySelectorAll('.GuideWrap');
    let ContentsGrid = document.querySelectorAll('.GridItems');
    let SNSWrap = document.querySelectorAll('.SNSWrap');
    observeElements(observermain, MainBanner);
    observeElements(observermain, GuideWrap);
    observeElements(observermain, ContentsGrid);
    observeElements(observermain, SNSWrap);



    // 메인페이지 카드 섹션
    $(document).on("mouseenter", ".ImgArea", function () {
        console.log('asdasd');
        $(this).find(".ItemBtns").css({
            "transform": "translateY(-20px)",
            "opacity": "1",
            "transition": "all 0.3s ease"
        });
        $(this).find(".ItemDimmedLayer").css({
            "opacity": "1",
            "transition": "all 0.3s ease"
        });
        $(this).find(".ItemArrow").css({
            "transform": "translateY(-32px)",
            "transform": "translateX(-32px)",
            "opacity": "1",
            "transition": "all 0.3s ease"
        });
    });

    $(document).on("mouseleave", ".ImgArea", function () {
        $(this).find(".ItemBtns").css({
            "transform": "translateY(0)",
            "opacity": "0",
            "transition": "all 0.3s ease"
        });
        $(this).find(".ItemDimmedLayer").css({
            "opacity": "0",
            "transition": "all 0.3s ease"
        });
        $(this).find(".ItemArrow").css({
            "transform": "translateY(0px)",
            "transform": "translateX(0px)",
            "opacity": "0",
            "transition": "all 0.3s ease"
        });
    });


    // 카카오 SDK 초기화
    Kakao.init('aead73005a77433d268644553628caba');


    // 카카오 공유하기
    function shareKakao() {
        let InviteTitleInfo = document.title;
        let htmlURL = document.getElementById('InputURL');
        let templateURL = '';
        console.log(InviteTitleInfo);
        if (htmlURL !== null) {
            let url = htmlURL.value;
            templateURL = `http://localhost:3000/data/${url}.html`;
        }
        Kakao.Share.sendDefault({
            objectType: 'location',
            address: '경기 성남시 분당구 판교로 344',
            addressTitle: '카카오 판교오피스 카페톡',
            content: {
                title: InviteTitleInfo,
                //   description: 'null',
                imageUrl: 'http://k.kakaocdn.net/dn/bSbH9w/btqgegaEDfW/vD9KKV0hEintg6bZT4v4WK/kakaolink40_original.png',
                link: {
                    mobileWebUrl: templateURL,
                    webUrl: templateURL,
                },
            },
            buttons: [
                {
                    title: '웹으로 보기',
                    link: {
                        mobileWebUrl: templateURL,
                        webUrl: templateURL,
                    },
                },
            ],
        });
    }


    let KakaoShare = document.getElementById('KakaoShareBtn');
    if (KakaoShare) {
        KakaoShare.addEventListener('click', shareKakao);
    }



    // 청첩장 주소 복사

    let InviteAddressCopyBtn = document.getElementById('InviteAddressCopyBtn');
    if (InviteAddressCopyBtn) {
        InviteAddressCopyBtn.addEventListener('click', function () {
            let htmlURL = document.getElementById('InputURL');
            let URLVal = htmlURL ? htmlURL.value : '';
            let originURL = `http://localhost:3000/html/detail.html`;
            let templateURL = `http://localhost:3000/data/${URLVal}.html`;
            console.log(templateURL);
            console.log(URLVal);

            if (URLVal === '') {
                navigator.clipboard.writeText(originURL).then(function () {
                    alert('청첩장 주소가 복사되었습니다.');
                    console.log('case1');
                }, function (err) {
                    console.error('Failed to copy: ', err);
                });
            }
            else if (htmlURL) {
                navigator.clipboard.writeText(templateURL).then(function () {
                    alert('청첩장 주소가 복사되었습니다.');
                    console.log('case2');
                }, function (err) {
                    console.error('Failed to copy: ', err);
                });
            } else {
                var currentUrl = window.location.href;
                navigator.clipboard.writeText(currentUrl).then(function () {
                    alert('청첩장 주소가 복사되었습니다.');
                    console.log('case3');
                }, function (err) {
                    console.error('Failed to copy: ', err);
                });
            }
        });

    }


    // 스크롤시 애니메이션 효과 적용
    function observeElements(observer, elements) {
        elements.forEach(element => {
            observer.observe(element);
        });
    }

    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    });

    let fadeinParents = document.querySelectorAll('.side_contents');
    observeElements(observer, fadeinParents);

    let fadeinElements = document.querySelectorAll('.side_contents > *');
    observeElements(observer, fadeinElements);

    let OrderSection = document.querySelectorAll('.OrderSection > *');
    observeElements(observer, OrderSection);


    // 미리보기 화면 코드

    const ScrollPrevent = document.body;
    let Dimmed = document.getElementById('PreviewDimmed');
    let PreviewPageTarget = document.querySelector('.PreviewPage');
    let sideContents = document.querySelectorAll('.side_contents');
    let DeleteBtn = document.querySelector('.close-button');
    let sideContentsArray = Array.from(sideContents).sort((a, b) => {
        return a.getAttribute('data-order') - b.getAttribute('data-order');
    });



    // 미리보기 버튼 클릭시 화면
    let PreviewBtn = document.querySelector(".ProgressTemporarySave"); //미리보기 버튼

    if (PreviewBtn) {
        PreviewBtn.addEventListener('click', function () {
            // 클릭 이벤트 처리 코드
            PreviewPageTarget.innerHTML = '';

            sideContentsArray.forEach(function (item) {
                let cloneItem = item.cloneNode(true);
                cloneItem.style.zIndex = 10003; // z-index 변경
                cloneItem.style.top = "10%"; // top 값 변경
                DeleteBtn.style.display = "block";
                ScrollPrevent.style.overflow = "hidden";
                PreviewPageTarget.appendChild(cloneItem);
            });

            Dimmed.classList.toggle('is-active');
            let fadeinParents = document.querySelectorAll('.side_contents');
            observeElements(observer, fadeinParents);

            let fadeinElements = document.querySelectorAll('.side_contents > *');
            observeElements(observer, fadeinElements);

            let OrderSection = document.querySelectorAll('.OrderSection > *');
            observeElements(observer, OrderSection);
        });
    }

    function toggleElements() {
        Dimmed.classList.toggle('is-active');
        ScrollPrevent.style.overflowY = "scroll";
        DeleteBtn.style.display = "none";
        // Remove cloned elements
        Array.from(PreviewPageTarget.querySelectorAll('.side_contents')).forEach(function (item) {
            item.remove();
        });
    }

    if (Dimmed) {
        // Add event listener to toggle the "is-active" class of the Dimmed element
        Dimmed.addEventListener("click", toggleElements);
    }

    if (DeleteBtn) {
        DeleteBtn.addEventListener("click", toggleElements);
    }


    // --> 타겟 이동 요소 정리

    function addScrollEventListener(inputs, targetSelector) {
        inputs.forEach((input) => {
            if (input !== null) {
                input.addEventListener('click', () => {
                    const targetElement = document.querySelector(targetSelector);
                    if (targetElement !== null) {
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }
        });
    }

    // 신랑쪽 정보 입력시 스크롤
    let GroomInputs = [
        document.getElementById('GroomFirstNameInput'),
        document.getElementById('GroomLastNameInput'),
        document.getElementById('SelectGroomRelationship'),
        document.getElementById('GroomFatherFirstNameInput'),
        document.getElementById('GroomFatherLastNameInput'),
        document.getElementById('GroomMotherFirstNameInput'),
        document.getElementById('GroomMotherLastNameInput'),
        document.getElementById('Groomfatherstatus'),
        document.getElementById('Groommotherstatus')
    ];

    addScrollEventListener(GroomInputs, '#scrollFamilyinfo');

    // 신부쪽 정보 입력시 스크롤
    let BrideInputs = [
        document.getElementById('BrideFirstNameInput'),
        document.getElementById('BrideLastNameInput'),
        document.getElementById('SelectBrideRelationship'),
        document.getElementById('BrideFatherFirstNameInput'),
        document.getElementById('BrideFatherLastNameInput'),
        document.getElementById('BrideMotherFirstNameInput'),
        document.getElementById('BrideMotherLastNameInput'),
        document.getElementById('Bridefatherstatus'),
        document.getElementById('Bridemotherstatus')
    ];

    addScrollEventListener(BrideInputs, '#scrollFamilyinfo');

    let weddingInputs = [
        document.getElementById('date'),
        document.getElementById('SelectAMPM'),
        document.getElementById('SelectTime'),
        document.getElementById('SelectMinute')
    ];

    addScrollEventListener(weddingInputs, '#TextDateCalendar');

    // 예식장 명, 층, 홀 입력시 스크롤
    let weddingInfoInputs = [
        document.getElementById('WeddingLocateTitleInput'),
        document.getElementById('WeddingHallInfoInput'),
        document.getElementById('SearchAddressInput'),
        document.getElementById('SearchAddressBtn')
    ];

    addScrollEventListener(weddingInfoInputs, '.LocationSection');

    // 초대 글 작성시 스크롤
    let inviteInfoInputs = [
        document.getElementById('InviteTitleInput'),
        document.getElementById('TextBoxInput'),
        document.getElementById('custom-select-container-invite'),
    ];

    addScrollEventListener(inviteInfoInputs, '.TabContent');



    // 가족관계 상태값 정의

    function handleStatusCheckboxChange(statusCheckbox, statusTypeSelect, statusInfoElement, mumElement) {
        const handleStatusTypeSelectChange = () => {
            const selectedValue = statusTypeSelect.value;
            if (selectedValue === "국화꽃") {
                if (mumElement) mumElement.style.display = "block";
                statusInfoElement.innerText = "";
            } else if (selectedValue === "故") {
                if (mumElement) mumElement.style.display = "none";
                statusInfoElement.innerText = "故";
            }
        };

        const handleStatusCheckboxClick = () => {
            let selectedValue = statusTypeSelect.value;
            if (statusCheckbox.checked) {
                statusTypeSelect.removeAttribute("disabled");
                statusTypeSelect.style.cursor = 'pointer';
                statusTypeSelect.onmouseover = function () {
                    statusTypeSelect.style.border = '1px solid var(--ColorTextPrimary)';
                }
                statusTypeSelect.onmouseout = function () {
                    statusTypeSelect.style.border = '1px solid var(--ColorBorderSolid)';
                }
            } else {
                statusTypeSelect.setAttribute("disabled", "disabled");
                statusTypeSelect.style.cursor = 'not-allowed';
                statusTypeSelect.value = "故";
                selectedValue = "";
                if (mumElement) mumElement.style.display = "none";
            }
            statusInfoElement.innerText = selectedValue;
        };

        statusCheckbox.addEventListener("click", handleStatusCheckboxClick);
        statusTypeSelect.addEventListener("change", handleStatusTypeSelectChange);
    }


    // 신랑 아버지 상태값 체크박스 선택
    const GroomFatherStatusCheckbox = document.getElementById('Groomfatherstatus');
    if (GroomFatherStatusCheckbox) {
        const GroomFatherStatusTypeSelect = document.getElementById("Groomfatherstatustype");
        const GroomFatherStatusInfo = document.querySelector("#GroomFatherStatusInfo");
        const GroomFatherMum = document.getElementById('GroomFatherMum');
        handleStatusCheckboxChange(GroomFatherStatusCheckbox, GroomFatherStatusTypeSelect, GroomFatherStatusInfo, GroomFatherMum);
    }

    // 신랑 어머니 상태값 체크박스 선택
    const GroomMotherStatusCheckbox = document.getElementById('Groommotherstatus');
    if (GroomMotherStatusCheckbox) {
        const GroomMotherStatusTypeSelect = document.getElementById("Groommotherstatustype");
        const GroomMotherStatusInfo = document.querySelector("#GroomMotherStatusInfo");
        const GroomMotherMum = document.getElementById('GroomMotherMum');
        handleStatusCheckboxChange(GroomMotherStatusCheckbox, GroomMotherStatusTypeSelect, GroomMotherStatusInfo, GroomMotherMum);
    }

    // 신부 아버지 상태값 체크박스 선택
    const BrideFatherStatusCheckbox = document.getElementById('Bridefatherstatus');
    if (BrideFatherStatusCheckbox) {
        const BrideFatherStatusTypeSelect = document.getElementById("Bridefatherstatustype");
        const BrideFatherStatusInfo = document.querySelector("#BridefatherStatusInfo");
        const BrideFatherMum = document.getElementById('BrideFatherMum');
        handleStatusCheckboxChange(BrideFatherStatusCheckbox, BrideFatherStatusTypeSelect, BrideFatherStatusInfo, BrideFatherMum);
    }

    // 신부 어머니 상태값 체크박스 선택
    const BrideMotherStatusCheckbox = document.getElementById('Bridemotherstatus');
    if (BrideMotherStatusCheckbox) {
        const BrideMotherStatusTypeSelect = document.getElementById("Bridemotherstatustype");
        const BrideMotherStatusInfo = document.querySelector("#BrideMotherStatusInfo");
        const BrideMotherMum = document.getElementById('BrideMotherMum');
        handleStatusCheckboxChange(BrideMotherStatusCheckbox, BrideMotherStatusTypeSelect, BrideMotherStatusInfo, BrideMotherMum);
    }


    let toggleQR = document.getElementById('KakaoQR');
    if (toggleQR) {
        toggleQR.onclick = () => {
            toggleQR.classList.toggle('active');
        }
    }

    let toggleDDay = document.getElementById('DDay');
    if (toggleDDay) {
        toggleDDay.onclick = () => {
            toggleDDay.classList.toggle('active');
            let DDayClass = document.querySelectorAll(".dday");

            DDayClass.forEach(DDayClass => {
                if (DDayClass.style.display === "none") {
                    DDayClass.style.display = "block";
                } else {
                    DDayClass.style.display = "none";
                }
            });
        }
    }



    // 아코디언 메뉴& 토글버튼
    let toggleFold = document.getElementById('AccountFold'); // 토글버튼

    if (toggleFold) {
        toggleFold.onclick = () => {
            toggleFold.classList.toggle('active');
            let accordions = document.querySelectorAll(".accordion-content");

            accordions.forEach(accordion => {
                if (accordion.style.display === "block") {
                    accordion.style.display = "none";
                } else {
                    accordion.style.display = "block";
                }
            });
        }
    }

    var accordion = document.querySelector(".accordion");

    if (accordion) {
        accordion.addEventListener("click", function (e) {
            e.preventDefault();
            var target = e.target;
            if (target.classList.contains("accordion-title")) {
                var content = target.nextElementSibling;
                if (content.style.display === "block") {
                    $(content).slideUp();
                } else {
                    $(content).slideDown();
                }
            }
        });
    }




    // 계좌번호 복사

    let copyAccount = document.getElementById('copybtn');
    if (copyAccount) {
        copyAccount.addEventListener('click', function () {
            var element = document.getElementById('accountinformation');
            if (element) {
                var value = element.innerText;
                navigator.clipboard.writeText(value).then(function () {
                    alert('계좌번호가 복사되었습니다.');
                }, function (err) {
                    console.error('Failed to copy: ', err);
                });
            }
        });

    }

    // 대표 이미지 업로드 크롭
    $(function () {
        var cropper;

        $('#photoBtn').on('change', function () {
            $('.photo_them').css("display", "block");
            $('#complete').css("display", "block");
            $('.them_img').empty().append('<img id="image" src="">');
            var image = $('#image');
            var imgFile = $('#photoBtn').val();
            var fileForm = /(.*?)\.(jpg|jpeg|png)$/;
            let BG = document.getElementById('CropDimmed');

            if (imgFile.match(fileForm)) {
                var reader = new FileReader();
                reader.onload = function (event) {
                    image.attr("src", event.target.result);
                    cropper = image.cropper({
                        dragMode: 'move',
                        viewMode: 1,
                        aspectRatio: 200 / 300,
                        autoCropArea: 0.9,
                        minContainerWidth: 600,
                        minContainerHeight: 600,
                        restore: false,
                        guides: true,
                        center: true,
                        highlight: true,
                        cropBoxMovable: false,
                        cropBoxResizable: false,
                        toggleDragModeOnDblclick: false,
                    });
                };
                BG.classList.toggle('is-active');
                reader.readAsDataURL(event.target.files[0]);
            } else {
                alert("이미지 파일(jpg, png형식의 파일)만 올려주세요");
                $('#photoBtn').focus();
                $('.photo_them').css("display", "none");
                $('#complete').css("display", "none");
                return;
            }
        });

        $('#complete').on('click', function () {
            var files = $('#photoBtn')[0].files;
            var fileArray = [];

            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                fileArray.push(file);

                if (file.type.match('image.*')) {
                    compressImage(file, function (compressedFile) {
                        var formData = new FormData();
                        formData.append("images", compressedFile);

                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "../api_TitleImgUpload");
                        xhr.send(formData);
                        console.log(formData);

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                if (xhr.status === 200) {
                                    // 서버로부터의 응답 처리
                                    console.log(xhr.responseText);
                                    let resURL = xhr.responseText;
                                    let imageUrl = JSON.parse(resURL).fileUrls;
                                    console.log(imageUrl);
                                    // 기존 이미지 URL 덮어쓰기
                                    $('#preview-image').attr('src', imageUrl);
                                    $('#TitleImgUpload').attr('src', imageUrl);
                                    $('#KaKaosrc').attr('src', imageUrl);
                                    alert('대표 이미지가 변경되었습니다.');

                                    // 수정 시작
                                    var cropper = $('#image').data('cropper');
                                    var canvas;
                                    var BG = document.getElementById('CropDimmed');
                                    canvas = cropper.getCroppedCanvas({
                                        width: 4000,
                                        height: 1000
                                    });
                                    // 수정 끝

                                    BG.classList.toggle('is-active');
                                    $('.photo_them').css("display", "none");
                                    $('#complete').css("display", "none");
                                } else {
                                    console.log('There was a problem with the request.');
                                }
                            }
                        };

                    });
                } else {
                    alert('the file ' + file.name + ' is not an image<br/>');
                }
            }
        });

        function compressImage(file, callback) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function (event) {
                var img = new Image();
                img.src = event.target.result;
                img.onload = function () {
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                    var MAX_WIDTH = 800;
                    var MAX_HEIGHT = 600;
                    var width = img.width;
                    var height = img.height;

                    if (width > height) {
                        if (width > MAX_WIDTH) {
                            height *= MAX_WIDTH / width;
                            width = MAX_WIDTH;
                        }
                    } else {
                        if (height > MAX_HEIGHT) {
                            width *= MAX_HEIGHT / height;
                            height = MAX_HEIGHT;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(function (blob) {
                        var compressedFile = new File([blob], file.name, {
                            type: file.type,
                            lastModified: Date.now()
                        });
                        callback(compressedFile);
                    }, file.type, 0.2);
                };
            };
        }

        function getCroppedCanvas(image, cropper, options) {
            options = options || {};
            var canvas = document.createElement('canvas');
            var width = options.width || image.width();
            var height = options.height || image.height();
            canvas.width = width;
            canvas.height = height;
            cropper.getCroppedCanvas({
                width: width,
                height: height,
            }).toBlob(function (blob) {
                var newImg = document.createElement('img');
                var url = URL.createObjectURL(blob);
                newImg.onload = function () {
                    canvas.getContext('2d').drawImage(newImg, 0, 0, width, height);
                    URL.revokeObjectURL(url);
                };
                newImg.src = url;
            });
            return canvas;
        }
    });






    // 클래스 영역 순서바꾸기

    $(function () {
        $('.ToggleArea').sortable({
            cursor: 'move',
            placeholder: 'highlight',
            start: function (event, ui) {
                ui.item.toggleClass('highlight');
            },
            stop: function (event, ui) {
                ui.item.toggleClass('highlight');
            },
            update: function (event, ui) {
                const inputArea = document.querySelector('.ToggleArea');
                const inputChildElements = Array.from(inputArea.querySelectorAll('.ToggleArea > *'));
                const contentsArea = document.querySelector('.OrderSection');
                const contentsChildElements = Array.from(contentsArea.querySelectorAll('.OrderSection > *'));
                console.log(contentsChildElements);

                // inputChildElements 배열의 순서에 따라 contentsChildElements 배열 순서를 동기화
                inputChildElements.forEach((inputChildElement, index) => {
                    const inputId = inputChildElement.dataset.id;
                    const contentsChildElement = contentsChildElements.find(contentsChildElement => contentsChildElement.dataset.id === inputId);
                    console.log(inputId);
                    console.log(contentsChildElement);
                    if (contentsChildElement) {
                        contentsArea.appendChild(contentsChildElement);
                    }
                });
            },
            create: function () {
            }
        });
    });

    // 디자인 선택 탭
    $('ul.TabListGallery li').click(function () {							//선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.

        $('ul.TabListGallery li').removeClass('Active');     //선택 되있던 탭의 Active css를 제거하고 
        $(this).addClass('Active');							////선택된 탭에 Active class를 삽입해줍니다.

        if (this.id == 'BoardType') {  // DesignArch 선택
            console.log('BoardType');
            $('.GalleryArea').show();
        } else if (this.id == 'SlideType') {  // DesignTrip 선택
            console.log('DesignTrip');
            $('.GalleryArea').hide();
        }
        else {
            console.log('null');
        }
    });


    // 이미지 상세보기에 대한 코드 정리
    function showImagePreview(thumbnails) {
        let imageOverlay = document.getElementById("GalleryPreview");
        let fullImage = document.querySelector(".full-image");
        let closeButton = document.getElementById("GalleryPreviewExit");

        thumbnails.forEach(function (thumbnail) {
            thumbnail.addEventListener("click", function (event) {
                event.preventDefault();
                imageOverlay.style.display = "block";
                imageOverlay.style.zIndex = "10001";
                fullImage.src = this.src;
                closeButton.style.display = "block";
            });
        });

        closeButton.addEventListener("click", function () {
            imageOverlay.style.display = "none";
        });
    }


    // 다중업로드한 사진 순서 바꾸기 이동
    var storedFiles = [];
    $(function () {
        $('.cvf_uploaded_files').sortable({
            cursor: 'move',
            placeholder: 'highlight',
            start: function (event, ui) {
                ui.item.toggleClass('highlight');
            },
            stop: function (event, ui) {
                ui.item.toggleClass('highlight');
            },
            update: function (event, ui) {
                // 현재 파일의 순서를 배열로 가져옵니다
                var currentOrder = $(this).sortable('toArray');
                console.log(currentOrder);
                // storedFiles 배열을 초기화합니다
                storedFiles = [];
                // .grid-container를 비웁니다
                $('.grid-container').empty();

                // 현재 순서대로 .grid-container에 파일을 추가하고, storedFiles 배열에 파일을 저장합니다
                for (var i = 0; i < currentOrder.length; i++) {
                    // FileReader 객체를 생성합니다.
                    var reader = new FileReader();
                    // File 객체를 생성하고, FileReader 객체에 전달합니다.
                    var file = new File([storedFiles[currentOrder[i]]], currentOrder[i]);
                    storedFiles.push(file);

                    // 파일의 내용을 읽어오는 것이 완료되면 실행될 함수를 정의합니다.
                    reader.onload = (function (file) {
                        var imgElements = document.querySelectorAll('.img-thumb'); // 클래스명은 img-class로 가정
                        var dataUrl = imgElements[i].src;
                        console.log(dataUrl); // 선택된 각 img 요소의 src 값을 출력
                        $('.grid-container').css('display', 'grid');
                        $('.grid-container').append(
                            "<li class = 'grid-item' file = '" + file.name + "'>" +
                            "<img class = 'grid-thumb' file = '" + file.name + "' id = 'appendimg' src = '" + dataUrl + "' />" +
                            "</li>"
                        );
                    })(file);
                    let thumbnails = document.querySelectorAll(".grid-thumb");
                    showImagePreview(thumbnails);

                    // 파일의 내용을 data URL로 읽어옵니다.
                    reader.readAsDataURL(file);
                }
            },
            create: function () {
            }
        });
    });

    // 호버시 삭제버튼 노출 함수 정리
    function addHoverDeleteButton(file) {
        var HoverImg = document.querySelector(".multiimg[file='" + file.name + "']");
        var DeleteImg = document.querySelector(".cvf_delete_image[file='" + file.name + "']");

        HoverImg.onmouseover = function () {
            if (DeleteImg) {
                DeleteImg.style.opacity = "1";
            }
        };
        HoverImg.onmouseout = function () {
            if (DeleteImg) {
                DeleteImg.style.opacity = "0";
            }
        };
    }

    // 클릭시 삭제 함수 정리
    function deleteImage(e) {
        e.preventDefault();
        var file = $(this).parent().attr('file');
        var viewimg = document.querySelector(".grid-item[file='" + file + "']");
        console.log('이미지삭제');
        $(this).parent().remove();
        $(viewimg).remove();

        for (var i = 0; i < storedFiles.length; i++) {
            if (storedFiles[i].name == file) {
                storedFiles.splice(i, 1);
                break;
            }
        }
    }


    // 드래그하여 다중 이미지 업로드
    let dropzone = document.querySelector(".ImgGroupUpload_Btn");
    let MAX_IMAGES = 30;
    let IMAGES_PER_LOAD = 9;
    let LoadMore = document.getElementById('LoadMoreBtn');
    let displayedImages = 0;

    if (dropzone) {
        dropzone.addEventListener("dragover", function (event) {
            event.preventDefault();
            event.stopPropagation();
            dropzone.style.backgroundColor = "#eff0f5";
        });

        dropzone.addEventListener("dragleave", function (event) {
            event.preventDefault();
            event.stopPropagation();
            dropzone.style.backgroundColor = "";
        });

        dropzone.addEventListener("drop", function (event) {
            event.preventDefault();
            event.stopPropagation();
            dropzone.style.backgroundColor = "";
            files = Array.from(event.dataTransfer.files);

            // 이미지 갯수 확인 후 최대갯수 안내팝업 노출
            let imgCount = displayedImages + files.length;
            console.log(imgCount)
            if (imgCount > MAX_IMAGES) {
                alert("이미지는 30개까지 첨부하실 수 있습니다.");
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                console.log(file);

                // 이미지 삭제
                $('body').on('click', 'a.cvf_delete_image', deleteImage);

                // 이미지 타입 매칭 후 노출
                if (file.type.match('image.*')) {
                    displayedImages++;
                    const readImg = new FileReader();
                    readImg.onload = (function (file) {
                        return function (e) {
                            $('.GalleryTitleArea').show();
                            $('.cvf_uploaded_files').append(
                                "<li class='multiimg' id='multiimg_" + file.name + "' file = '" + file.name + "'>" +
                                "<img class = 'img-thumb' src = '" + e.target.result + "' />" +
                                "<a href = '#' class = 'cvf_delete_image' id='deleteimg_" + file.name + "' file = '" + file.name + "' title = 'Cancel'><img class = 'delete-btn' src = '../Resource/assets/Icon/Delete.svg' /></a>" +
                                "</li>"
                            );
                            $('.cvf_uploaded_files').css('overflow-x', 'scroll');
                            $('.cvf_uploaded_files').css('overflow-y', 'hidden');
                            $('.grid-container').css('display', 'grid');
                            $('.grid-container').append(
                                "<li class = 'grid-item' file = '" + file.name + "'>" +
                                "<img class = 'grid-thumb' id = 'appendimg' src = '" + e.target.result + "' />" +
                                "</li>"
                            );
                            // 업로드한 이미지 상세보기
                            let thumbnails = document.querySelectorAll(".grid-thumb");
                            showImagePreview(thumbnails);

                            // 호버시 삭제
                            addHoverDeleteButton(file);

                            if (displayedImages > 9) {
                                LoadMore.style.display = 'block';
                            }
                            if (displayedImages >= MAX_IMAGES) {
                                LoadMore.style.display = 'block';
                                $('.grid-item').slice(9).css('display', 'none');

                            } else if (displayedImages >= IMAGES_PER_LOAD) {
                                // 10번째 이미지부터 숨김 처리
                                $('.grid-item').slice(9).css('display', 'none');
                            }
                        };
                    })(file);
                    readImg.readAsDataURL(file);
                } else {
                    alert('the file ' + file.name + ' is not an image<br/>');
                }
            }
        });
    }

    if (LoadMore) {
        LoadMore.addEventListener("click", function () {
            const start = 9;
            const end = start + IMAGES_PER_LOAD;
            console.log(start);
            console.log(end);
            $('.grid-item').slice(start, end).show();
            console.log(displayedImages);
            if (end >= displayedImages) {
                LoadMore.style.display = 'none';
            }
            IMAGES_PER_LOAD += 9; // 9씩 증가
        });
    }








    // 버튼 눌러 다중이미지 업로드

    $('body').on('change', '.user_picked_files', function (event) {

        files = Array.from(event.target.files);
        let i = 0;

        for (i = 0; i < files.length; i++) {
            let readImg = new FileReader();
            let file = files[i];
            console.log(file);

            // 이미지 삭제
            $('body').on('click', 'a.cvf_delete_image', deleteImage);

            // 이미지 갯수 확인 후 최대갯수 안내팝업 노출
            let imgCount = displayedImages + 1;
            console.log(imgCount)
            if (imgCount > MAX_IMAGES) {
                alert("이미지는 30개까지 첨부하실 수 있습니다.");
                return;
            }

            // 이미지 타입 매칭 후 노출
            if (file.type.match('image.*')) {
                storedFiles.push(file);
                readImg.onload = (function (file) {
                    displayedImages++;
                    return function (e) {
                        $('.GalleryTitleArea').show();
                        $('.cvf_uploaded_files').append(
                            "<li class='multiimg' id='multiimg_" + file.name + "' file = '" + file.name + "'>" +
                            "<img class = 'img-thumb' src = '" + e.target.result + "' />" +
                            "<a href = '#' class = 'cvf_delete_image' id='deleteimg_" + file.name + "' file = '" + file.name + "' title = 'Cancel'><img class = 'delete-btn' src = '../Resource/assets/Icon/Delete.svg' /></a>" +
                            "</li>"
                        );
                        $('.cvf_uploaded_files').css('overflow-x', 'scroll');
                        $('.cvf_uploaded_files').css('overflow-y', 'hidden');
                        $('.grid-container').css('display', 'grid');
                        $('.grid-container').append(
                            "<li class = 'grid-item' file = '" + file.name + "'>" +
                            "<img class = 'grid-thumb' id = 'appendimg' src = '" + e.target.result + "' />" +
                            "</li>"
                        );

                        // 업로드한 이미지 상세보기
                        let thumbnails = document.querySelectorAll(".grid-thumb");
                        showImagePreview(thumbnails);

                        // 호버시 삭제
                        addHoverDeleteButton(file);

                        if (displayedImages > 9) {
                            LoadMore.style.display = 'block';
                        }
                        if (displayedImages >= MAX_IMAGES) {
                            LoadMore.style.display = 'block';
                            $('.grid-item').slice(9).css('display', 'none');

                        } else if (displayedImages >= IMAGES_PER_LOAD) {
                            // 10번째 이미지부터 숨김 처리
                            $('.grid-item').slice(9).css('display', 'none');
                        }
                    };
                })(file);
                readImg.readAsDataURL(file);
            } else {
                alert('the file ' + file.name + ' is not an image<br/>');
            }
        }
    });



    // 카카오지도 API
    kakao.maps.load(() => {
        const mapDivs = document.querySelectorAll('.mapinfo');
        const mapoptions = {
            center: new kakao.maps.LatLng(37.559073, 126.91030),
            level: 3
        };

        const markers = []; // 마커 객체를 저장할 배열
        const infowindows = []; // 인포윈도우 객체를 저장할 배열

        const searchInput = document.getElementById('SearchAddressInput');
        const searchBtn = document.getElementById('SearchAddressBtn');
        const addressinfo = document.getElementById('WeddingAddress');

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const postpopup = new daum.Postcode({
                    oncomplete: function (data) {
                        searchInput.value = data.address;
                        addressinfo.innerText = searchInput.value;
                        const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
                        ps.keywordSearch(data.address, placesSearchCB);
                    }
                });
                postpopup.open();
            });
        }

        function placesSearchCB(data, status, pagination) {
            if (status === kakao.maps.services.Status.OK) {
                const place = data[0];
                const bounds = new kakao.maps.LatLngBounds();
                const newCenter = new kakao.maps.LatLng(place.y, place.x);
                markers.forEach((marker) => {
                    marker.setPosition(newCenter);
                    bounds.extend(newCenter);
                    marker.getMap().setBounds(bounds);
                });
            } else {
                alert('해당 위치의 주소지를 검색할 수 없습니다. 마커 위치를 다시 배치해 주세요.');
            }
        }

        for (let i = 0; i < mapDivs.length; i++) {
            const map = new kakao.maps.Map(mapDivs[i], mapoptions);

            const marker = new kakao.maps.Marker({
                position: map.getCenter(),
                draggable: true
            });
            marker.setMap(map);
            markers.push(marker);

            kakao.maps.event.addListener(marker, 'dragend', function () {
                const position = marker.getPosition();
                const lat = position.getLat();
                const lng = position.getLng();
                const latlng = new kakao.maps.LatLng(lat, lng);
                marker.setPosition(latlng);
                alert('선택하신 위치로 장소가 변경되었습니다. 예식 장소가 정확한지 꼭 확인해 주세요!');

                const geocoder = new kakao.maps.services.Geocoder();
                geocoder.coord2Address(lng, lat, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const address = result[0].address.address_name;
                        const ps = new kakao.maps.services.Places(); // 장소 검색 객체 생성
                        ps.keywordSearch(address, placesSearchCB);
                    } else {
                        alert('검색 결과가 없습니다.');
                    }
                });
            });
        }

        // 네이버 지도 길찾기

        // 'NaverNav' ID를 가진 클래스 선택
        const naverNav = document.getElementById('NaverNav');
        if (naverNav) {
            naverNav.addEventListener('click', () => {
                const geocoder = new kakao.maps.services.Geocoder();
                const position = markers[0].getPosition(); // Marker의 위치 가져오기
                const lat = position.getLat();
                const lng = position.getLng();

                // Marker의 위치를 기반으로 주소값 가져오기
                geocoder.coord2Address(lng, lat, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const address = result[0].address.address_name;

                        // 네이버지도 검색 경로 URL 생성
                        const naverUrl = 'https://map.naver.com/v5/search/' + encodeURIComponent(address);

                        // 새 창에서 네이버지도 검색 경로 열기
                        window.open(naverUrl);
                    } else {
                        alert('주소를 찾을 수 없습니다.');
                    }
                });
            });
        }

        // 'KakaoNav' ID를 가진 클래스 선택
        const kakaoNav = document.getElementById('KakaoNav');
        if (kakaoNav) {
            kakaoNav.addEventListener('click', () => {
                const geocoder = new kakao.maps.services.Geocoder();
                const position = markers[0].getPosition(); // Marker의 위치 가져오기
                const lat = position.getLat();
                const lng = position.getLng();

                // Marker의 위치를 기반으로 주소값 가져오기
                geocoder.coord2Address(lng, lat, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const address = result[0].address.address_name;

                        // 카카오맵 URL 생성
                        const kakaoUrl = 'https://map.kakao.com/link/search/' + encodeURIComponent(address);

                        // 카카오네비게이션 앱이 설치되어 있는지 확인
                        const isKakaoNavi = (function () {
                            const ua = navigator.userAgent.toLowerCase();
                            return (ua.indexOf('kakaonavi') > -1);
                        })();

                        if (isKakaoNavi) {
                            // 카카오네비게이션 앱이 설치되어 있으면 앱을 열고 해당 위치로 길 안내
                            window.location.href = 'kakaonavi://route?ep=' + lat + ',' + lng + '&by=CAR&name=' + encodeURIComponent(address);
                        } else {
                            // 카카오네비게이션 앱이 없으면 웹페이지에서 해당 위치로 검색 결과 표시
                            window.open(kakaoUrl);
                        }
                    } else {
                        alert('주소를 찾을 수 없습니다.');
                    }
                });
            });
        }



        // 'TmapNav' ID를 가진 클래스 선택
        const tmapNav = document.getElementById('TmapNav');
        if (tmapNav) {
            tmapNav.addEventListener('click', () => {
                const geocoder = new kakao.maps.services.Geocoder();
                const position = markers[0].getPosition(); // Marker의 위치 가져오기
                const lat = position.getLat();
                const lng = position.getLng();

                // Marker의 위치를 기반으로 주소값 가져오기
                geocoder.coord2Address(lng, lat, (result, status) => {
                    if (status === kakao.maps.services.Status.OK) {
                        const address = result[0].address.address_name;

                        // 티맵네비게이션 URL 생성
                        const tmapUrl = 'tmap://route?goalx=' + lng + '&goaly=' + lat + '&goalname=' + encodeURIComponent(address);

                        // 티맵네비게이션 앱이 설치되어 있는지 확인
                        const isTmap = (function () {
                            const ua = navigator.userAgent.toLowerCase();
                            return (ua.indexOf('tmap') > -1);
                        })();

                        if (isTmap) {
                            // 티맵네비게이션 앱이 설치되어 있으면 앱을 열고 주소값으로 길 안내
                            window.location.href = tmapUrl;
                        } else {
                            // 티맵네비게이션 앱이 없으면 모바일에서 확인 안내
                            confirm('모바일에서 확인하실 수 있습니다.');
                        }
                    } else {
                        alert('주소를 찾을 수 없습니다.');
                    }
                });
            });
        }

    });

    //--> 확대방지
    document.body.addEventListener('touchstart', function (e) {
        if ((e.touches.length > 1) || e.targetTouches.length > 1) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
        }
    }, { passive: false });



    // --> 미리보기 팝업띄우기

    let PreviewTemplate1 = document.getElementById("template1");
    let PreviewTemplate2 = document.getElementById("template2");
    let BG = document.querySelector('.BgDimmed');
    if (PreviewTemplate1 != null) {
        PreviewTemplate1.addEventListener('click', function () {
            BG.classList.toggle('is-active');
        });
    }
    if (PreviewTemplate2 != null) {
        PreviewTemplate2.addEventListener('click', function () {
            BG.classList.toggle('is-active');
        });
    }
    if (BG != null) {
        BG.addEventListener('click', function () {
            // BG.classList.toggle('is-active');
        });
    }

    // 초대 셀렉트 박스

    (function () {
        let selectInvite = document.querySelector('#custom-select-invite');
        let optionsContainerInvite = document.querySelector('#custom-options-invite');
        let optionsInvite;

        if (!selectInvite || !optionsContainerInvite) {
            return;
        } else {
            optionsInvite = optionsContainerInvite.querySelectorAll(".custom-option");
        }

        selectInvite.addEventListener('click', toggleOptions);
        optionsInvite.forEach(option => option.addEventListener('click', selectOption));

        function toggleOptions() {
            if (optionsContainerInvite.style.display === 'grid') {
                optionsContainerInvite.style.display = 'none';
                optionsContainerInvite.style.animation = 'slideDown 0.2s ease';
            } else {
                optionsContainerInvite.style.display = 'none';
                optionsContainerInvite.style.display = 'grid';
                optionsContainerInvite.style.animation = 'slideUp 0.2s ease';
            }
        }

        function selectOption() {
            selectInvite.value = this.dataset.value;
            optionsContainerInvite.style.display = 'none';
            // 초대합니다 입력박스
            var inputBox = document.getElementById("TextBoxInput");
            var invitebody = document.getElementById("InviteBodyText");
            var childElement = this.querySelector(".optiondecription");
            var childElementText = childElement.innerText;
            inputBox.value = childElementText;
            invitebody.innerText = childElementText;
        }

        document.addEventListener('click', hideOptions);

        function hideOptions(event) {
            if (!optionsContainerInvite.contains(event.target) && !selectInvite.contains(event.target)) {
                optionsContainerInvite.style.display = 'none';
            }
        }
    })();




    // 계좌번호 그룹추가
    let accountitemIdx = 3;
    let accordionitemIdx = 3;
    let AccountBtn = document.getElementById('AddAccountBtn');

    if (AccountBtn) {
        AccountBtn.addEventListener("click", function () {
            if (accordionitemIdx >= 7) {
                alert("최대 만들 수 있는 계좌그룹의 갯수를 초과하였습니다");
                return;
            }
            var accountGroup = document.getElementById("AccountGroup");
            var accountItem = document.createElement("div");
            accountItem.classList.add("AccountItem");
            accountItem.id = "AccointItem" + accountitemIdx;
            accountGroup.appendChild(accountItem);
            accountitemIdx++;

            var childDivs = document.querySelectorAll(".DetailItem");
            var firstChild = childDivs[0];
            accountItem.appendChild(firstChild.cloneNode(true));

            // Add the li element to the accordion
            var accordion = document.querySelector(".accordion");
            var newLi = document.createElement("li");
            newLi.classList.add("accordionitem");
            newLi.id = "accordionitem" + accordionitemIdx;
            accordion.appendChild(newLi);
            accordionitemIdx++;

            var childLi = document.querySelectorAll(".licontents");
            var firstChildLi = childLi[0];
            newLi.appendChild(firstChildLi.cloneNode(true));
        });
    }


    // 서체 변경 셀렉트박스

    const select = document.querySelector('.custom-select');
    const optionsContainer = document.querySelector('.custom-options');

    if (select && optionsContainer) {
        const options = optionsContainer.querySelectorAll(".custom-option");

        select.addEventListener('click', toggleOptions);
        options.forEach(option => option.addEventListener('click', selectOption));

        function toggleOptions() {
            if (optionsContainer.style.display === 'grid') {
                optionsContainer.style.display = 'none';
                optionsContainer.style.animation = 'slideDown 0.2s ease';
            } else {
                optionsContainer.style.display = 'none';
                optionsContainer.style.display = 'grid';
                optionsContainer.style.animation = 'slideUp 0.2s ease';
            }
        }
    } else {
        return;
    }


    function selectOption() {
        select.value = this.dataset.value;
        optionsContainer.style.display = 'none';
        changeFontFamily(select.value);
    }

    document.addEventListener('click', hideOptions);

    function hideOptions(event) {
        if (!optionsContainer.contains(event.target) && !select.contains(event.target)) {
            optionsContainer.style.display = 'none';
        }
    }

    function changeFontFamily(fontFamily) {
        const bodyTextElements = document.querySelectorAll('.WeddingBodyText');
        bodyTextElements.forEach(element => element.style.fontFamily = fontFamily);

        const titleTextElements = document.querySelectorAll('.WeddingTitleText');
        titleTextElements.forEach(element => element.style.fontFamily = fontFamily);

        const yearMonthElements = document.querySelectorAll('.year-month');
        yearMonthElements.forEach(element => element.style.fontFamily = fontFamily);

        const secCalElements = document.querySelectorAll('.sec_cal');
        secCalElements.forEach(element => element.style.fontFamily = fontFamily);

        const sideContentsElements = document.querySelectorAll('.side_contents');
        sideContentsElements.forEach(element => element.style.fontFamily = fontFamily);

        const btnIconElements = document.querySelectorAll('.BtnIcon');
        btnIconElements.forEach(element => element.style.fontFamily = fontFamily);
    }



    $("#size").change(function () {
        $('.WeddingBodyText').css("font-size", $(this).val() + "px");
        $('.WeddingTitleText').css("font-size", $(this).val() + "px");
        $('.sec_cal').css("font-size", $(this).val() + "px");
    });


    // 디자인 선택 탭
    $('ul.TabListDesign li').click(function () {							//선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.

        $('ul.TabListDesign li').removeClass('Active');     //선택 되있던 탭의 Active css를 제거하고 
        $(this).addClass('Active');							////선택된 탭에 Active class를 삽입해줍니다.

        if (this.id == 'DesignArch') {  // DesignArch 선택
            console.log('DesignArch');
            $('.TitleSection').show();
        } else if (this.id == 'DesignTrip') {  // DesignTrip 선택
            console.log('DesignTrip');
            $('.TitleSection').hide();
        } else if (this.id == 'DesignTogether') {  // DesignTogether 선택
            console.log('DesignTogether');
            $('.TitleSection').hide();
        }
        else {
            console.log('null');
        }
    });

    // 배경음악 탭
    $('ul.TabListBGM li').click(function () {							//선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.

        $('ul.TabListBGM li').removeClass('Active');     //선택 되있던 탭의 Active css를 제거하고 
        $(this).addClass('Active');							////선택된 탭에 Active class를 삽입해줍니다.

        if (this.id == 'NoneAudio') {  //BGM 미적용
            console.log('아무것도 선택안된상태');
            $('.audio').attr("src", "");
            console.log($('.audio').attr("src"));
        } else if (this.id == 'BaseAudio_1') {  //베이스오디오_1
            console.log('BaseAudio_1');
            $('.audio').attr("src", "../Resource/Audio/wedding_1.mp3");
            console.log($('.audio').attr("src"));
        } else if (this.id == 'BaseAudio_2') {  //베이스오디오_2
            console.log('BaseAudio_2');
            $('.audio').attr("src", "../Resource/Audio/wedding_2.mp3");
        } else if (this.id == 'BaseAudio_3') {  //베이스오디오_3
            console.log('BaseAudio_3');
            $('.audio').attr("src", "../Resource/Audio/wedding_3.mp3");
        }
        else {
            console.log('null');
        }
    });

    // 재생,일시정지 버튼

    var btn = document.querySelector(".AudioControl");
    var playing = false;

    btn.addEventListener("click", function () {
        var buttonplay = document.getElementById('button');
        var buttonpause = document.getElementById('buttonpause');
        // var music = new Audio("../Resource/Audio/wedding_1.mp3");

        if (!playing) {
            buttonpause.style.display = "block";
            buttonplay.style.display = "none";
            playing = true;
            // music.play();
        } else {
            buttonpause.style.display = "none";
            buttonplay.style.display = "block";
            playing = false;
            // music.pause();
        }
    });

    // 이펙트 탭
    $('ul.TabListEffect li').click(function () {							//선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.

        $('ul.TabListEffect li').removeClass('Active');     //선택 되있던 탭의 Active css를 제거하고 
        $(this).addClass('Active');							////선택된 탭에 Active class를 삽입해줍니다.

        if (this.id == 'NoneEffect') {  //효과 미적용
            console.log('아무것도 선택안된상태');
            $('.effects').attr("src", "");
        } else if (this.id == 'CherryblossomEffect') {  //벚꽃 효과 적용
            console.log('체리블라썸');
            $('.effects').attr("src", "../Resource/assets/Effect/effect_cherryblossom.png");
        } else if (this.id == 'SnowEffect') {  // 눈 효과 적용
            console.log('스노우');
            $('.effects').attr("src", "../Resource/effects/snow_00.mp4");
        }
        else {
            console.log('null');
        }
    });


    // 폰트 크기 탭

    $('ul.TabList li').click(function () {							//선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.
        var tab_id = $(this).attr('data-tab');
        console.log(tab_id);

        $('ul.TabList li').removeClass('Active');			//선택 되있던 탭의 Active css를 제거하고 
        $('.TabContent').removeClass('Active');

        $(this).addClass('Active');								////선택된 탭에 Active class를 삽입해줍니다.
        $("#" + tab_id).addClass('Active');
    });


    $('ul.TabListFont li').click(function () {							//선택자를 통해 tabs 메뉴를 클릭 이벤트를 지정해줍니다.

        $('ul.TabListFont li').removeClass('Active');			//선택 되있던 탭의 Active css를 제거하고 

        $(this).addClass('Active');								////선택된 탭에 Active class를 삽입해줍니다.
        $('.WeddingBodyText').css("font-size", $(this).val() + "px");
        $('.WeddingBodyTitle').css("font-size", $(this).val() + "px");
        $('.WeddingTitleText').css("font-size", $(this).val() + 5 + "px");
        $('.sec_cal .cal_nav .year-month').css("font-size", $(this).val() + 5 + "px");
    });


}



// 연동할 캘린더

$(document).ready(function () {
    calendarInit();
});

function calendarInit() {

    var date = new Date();
    var utc = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);
    var kstGap = 9 * 60 * 60 * 1000;
    var today = new Date(utc + kstGap);

    var thisMonth = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    function renderCalendar(thisMonth) {
        // 렌더링 코드는 그대로 유지
        // 렌더링을 위한 데이터 정리
        currentYear = thisMonth.getFullYear(); //달력 연도
        currentMonth = thisMonth.getMonth(); //달력 월
        currentDate = thisMonth.getDate(); // 달력 일

        // 이번 달의 첫 날과 마지막 날 구하기
        var firstDay = new Date(currentYear, currentMonth, 1);
        var lastDay = new Date(currentYear, currentMonth + 1, 0);

        // 이번 달의 첫 날이 무슨 요일인지 구하기 (0 = 일요일, 1 = 월요일, ...)
        var firstDayOfWeek = firstDay.getDay();

        // 이전 달의 마지막 날 구하기
        var prevMonthLastDay = new Date(currentYear, currentMonth, 0);
        var prevMonthLastDate = prevMonthLastDay.getDate();

        // 다음 달의 첫 날 구하기
        var nextMonthFirstDay = new Date(currentYear, currentMonth + 1, 1);

        // 현재 월 표기
        // $('.year-month').text((currentMonth + 1) + '월 ' + currentDate + '일');

        // 렌더링 html 요소 생성
        var calendar = document.querySelector('.dates');
        if (calendar) {
            calendar.innerHTML = '';
        }

        if (calendar) {
            // 이전 달의 마지막 주
            for (var i = firstDayOfWeek - 1; i >= 0; i--) {
                var date = prevMonthLastDate - i;
                calendar.innerHTML += '<div class="day prev disable">' + date + '</div>';
            }
        } else {
        }

        // 이번 달
        for (var i = 1; i <= lastDay.getDate(); i++) {
            var dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
            var className = 'day current';
            if (dayOfWeek == 0) {
                className += ' sunday';
            } else if (dayOfWeek == 6) {
                className += ' saturday';
            }
            if (i == currentDate) {
                className += ' today';
            }
            if (calendar) {
                calendar.innerHTML += '<div class="' + className + '">' + i + '</div>';
            }
        }

        // 다음 달의 첫 주
        for (var i = 1; i <= 6 - lastDay.getDay(); i++) {
            var date = i;
            if (calendar) {
                calendar.innerHTML += '<div class="day next disable">' + date + '</div>';
            }
        }

        // 이번 달에 속하지 않는 날짜에 대한 클래스 지정
        var prevMonthDates = document.querySelectorAll('.day.prev');
        var nextMonthDates = document.querySelectorAll('.day.next');
        for (var i = 0; i < prevMonthDates.length; i++) {
            prevMonthDates[i].classList.add('disable');
        }
        for (var i = 0; i < nextMonthDates.length; i++) {
            nextMonthDates[i].classList.add('disable');
        }

        // 오늘 날짜 표기
        if (today.getMonth() == currentMonth) {
            var currentMonthDates = document.querySelectorAll('.dates .current');
            if (currentMonthDates.length > 0) {
                currentMonthDates[today.getDate() - 1].classList.add('today');

                let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
                var currentday = days[today.getDay()];

                // var weddingDayTitle = document.getElementById("CalWeddingDayTitle");
                // if (weddingDayTitle) {
                //     weddingDayTitle.innerText = currentday;
                // }

                // var weddingDateTitle = document.getElementById("WeddingDateTitle");
                // if (weddingDateTitle) {
                //     weddingDateTitle.innerText = (currentMonth + 1) + '월 ' + currentDate + '일';
                // }
            } else {
            }
        }

    }

    // renderCalendar() 함수 호출
    renderCalendar(thisMonth);
}

// 인풋 캘린더

var dateChange = () => {
    let dateInput = document.getElementById("date");
    let dateArr = dateInput.value.split('-');
    let selectedDate = new Date(Date.UTC(dateArr[0], dateArr[1] - 1, dateArr[2]));
    selectedDate.setHours(selectedDate.getHours() + 9);  // 한국 표준시의 오프셋은 9시간
    let todaydate = new Date();
    let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    let dayName = days[selectedDate.getDay()];

    console.log(selectedDate);

    // 선택한 연,월,일 정리
    // var KorDate = selectedDate.setHours(selectedDate.getHours() + 9);
    var SelectYear = selectedDate.getFullYear();
    var SelectMonth = selectedDate.getMonth();
    var SelectDate = selectedDate.getDate();

    console.log(SelectYear);
    console.log(SelectMonth);
    console.log(SelectDate);

    // 선택한 달의 첫 날과 마지막 날 구하기
    var SelectfirstDay = new Date(SelectYear, SelectMonth, 1);
    var SelectlastDay = new Date(SelectYear, SelectMonth + 1, 0);
    console.log(SelectfirstDay);
    console.log(SelectlastDay);

    // 선택한 달의 첫 날이 무슨 요일인지 구하기 (0 = 일요일, 1 = 월요일, ...)
    var firstDayOfWeek = SelectfirstDay.getDay();

    // 선택한 달의 마지막 날 구하기
    var prevMonthLastDay = new Date(SelectYear, SelectMonth, 0);
    var prevMonthLastDate = prevMonthLastDay.getDate();

    // 선택한 다음 달의 첫 날 구하기
    var nextMonthFirstDay = new Date(SelectYear, SelectMonth + 1, 1);

    // 렌더링 html 요소 생성
    var calendar = document.querySelector('.dates');
    calendar.innerHTML = '';

    // 선택한 달의 마지막 주
    for (var i = firstDayOfWeek - 1; i >= 0; i--) {
        var date = prevMonthLastDate - i;
        calendar.innerHTML += '<div class="day prev disable">' + date + '</div>';
    }

    // 선택한 이번 달
    for (var i = 1; i <= SelectlastDay.getDate(); i++) {
        var dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
        var className = 'day current';
        if (dayOfWeek == 0) {
            className += ' sunday';
        } else if (dayOfWeek == 6) {
            className += ' saturday';
        }
        if (i == currentDate) {
            className += ' today';
        }
        calendar.innerHTML += '<div class="' + className + '">' + i + '</div>';
    }

    // 다음 달의 첫 주
    for (var i = 1; i <= 6 - SelectlastDay.getDay(); i++) {
        var date = i;
        calendar.innerHTML += '<div class="day next disable">' + date + '</div>';
    }


    if (selectedDate < todaydate) {
        alert("오늘 날짜 이전의 날짜는 선택할 수 없습니다.");
        return;
    }

    // 날짜 표기 방법에 대한 정의 : 10보다 작으면 20 -> 2로 표기
    let monthDisplay = (parseInt(dateArr[1]) < 10) ? dateArr[1].replace("0", "") : dateArr[1];
    let dateDisplay = (parseInt(dateArr[2]) < 10) ? dateArr[2].replace("0", "") : dateArr[2];

    // 영역별 월/일/요일 표기
    document.getElementById("TextDateCalendar").innerText = `${monthDisplay}월 ${dateDisplay}일`;
    document.getElementById("WeddingDateTitle").innerText = `${monthDisplay}월 ${dateDisplay}일`;
    document.getElementById("CalWeddingDayTitle").innerText = dayName;
    document.getElementById("WeddingDayTitle").innerText = dayName;

    // 갱신될때마다 Today 초기화
    let currentMonthDates = document.querySelectorAll('.dates .current');
    currentMonthDates.forEach(date => {
        date.classList.remove('today');
    });

    // 디데이 관련 코드
    let today = new Date();
    let dDay = selectedDate - today;
    let dDayInDays = Math.floor(dDay / (1000 * 60 * 60 * 24));
    let dDaycount = document.getElementById('dday');
    dDaycount.innerText = `${dDayInDays}` + '일';

    // 선택한 일자 표기
    currentMonthDates[parseInt(dateInput.value.split('-')[2]) - 1].classList.add('today');
};




function handleOnChange(e, target) {

    // 신랑 신부 관계
    let relationship = e.options[e.selectedIndex].text;
    let RelationText = "의 " + "" + relationship

    // 선택된 셀렉트박스의 값이, 해당 아이디값과 일치하는지 검사
    if (e.id === "SelectGroomRelationship") {
        // 선택된 ID에 텍스트 출력
        document.getElementById("GroomRelationship").innerText = RelationText;
    } else if (e.id === "SelectBrideRelationship") {
        // 선택된 ID에 텍스트 출력
        document.getElementById("BrideRelationship").innerText = RelationText;
    }

    // 예식 시간 및 요일
    let AMPM = e.options[e.selectedIndex].text;

    if (e.id === "SelectAMPM") {
        // 선택된 ID에 텍스트 출력
        document.getElementById("AMPM").innerText = AMPM;
        document.getElementById("CalAMPM").innerText = AMPM;
    } else if (e.id === "SelectTime") {
        // 선택된 ID에 텍스트 출력
        document.getElementById("WeddingTime").innerText = AMPM;
        document.getElementById("CalWeddingTime").innerText = AMPM;
    } else if (e.id === "SelectMinute") {
        // 선택된 ID에 텍스트 출력
        document.getElementById("WeddingMinute").innerText = AMPM;
        document.getElementById("CalWeddingMinute").innerText = AMPM;
    }

}

// 예식장 명 입력
function WeddingLocationInput() {
    var WeddingLocateTitle = document.getElementById("WeddingLocateTitleInput").value;
    document.getElementById("WeddingLocateTitle").innerText = WeddingLocateTitle;
    document.getElementById("WeddingLocateTitleMap").innerText = WeddingLocateTitle;
}

// 예식장 층,홀 입력
function WeddingHallInfoInput() {
    var WeddingLocateTitle = document.getElementById("WeddingHallInfoInput").value;
    document.getElementById("WeddingHallInfo").innerText = WeddingLocateTitle;
    document.getElementById("WeddingHallInfoMap").innerText = WeddingLocateTitle;
}


// 청첩장 제목 입력
function InvitationTitleInput() {
    var inputTitleBox = document.getElementById("InvitationTitleInput");
    document.title = inputTitleBox.value;
}

// 신랑 성
function printGroomFirst() {
    let GroomFirstName = document.getElementById('GroomFirstNameInput').value;
    document.getElementById("GroomFirstName").innerText = GroomFirstName;
    document.getElementById("GroomFirstName2").innerText = GroomFirstName;
};

// 신랑 이름
function printGroomLast() {
    let GroomLastName = document.getElementById('GroomLastNameInput').value;
    document.getElementById("GroomLastName").innerText = GroomLastName;
    document.getElementById("GroomLastName2").innerText = GroomLastName;
};

// 신랑 아버님 성
function printGroomFatherFirst() {
    let GroomFirstName = document.getElementById('GroomFatherFirstNameInput').value;
    document.getElementById("GroomFatherFirstName").innerText = GroomFirstName;
};
// 신랑 아버님 이름
function printGroomFatherLast() {
    let GroomLastName = document.getElementById('GroomFatherLastNameInput').value;
    document.getElementById("GroomFatherLastName").innerText = GroomLastName;
};

// 신랑 어머님 성
function printGroomMotherFirst() {
    let GroomFatherFirstName = document.getElementById('GroomMotherFirstNameInput').value;
    document.getElementById("GroomMotherFirstName").innerText = GroomFatherFirstName;
};
// 신랑 어머님 이름
function printGroomMotherLast() {
    let GroomMotherLastName = document.getElementById('GroomMotherLastNameInput').value;
    document.getElementById("GroomMotherLastName").innerText = GroomMotherLastName;
};


// 신부 성
function printBrideFirst() {
    let BrideFirstName = document.getElementById('BrideFirstNameInput').value;
    document.getElementById("BrideFirstName").innerText = BrideFirstName;
    document.getElementById("BrideFirstName2").innerText = BrideFirstName;
};
// 신부 이름
function printBrideLast() {
    let BrideLastName = document.getElementById('BrideLastNameInput').value;
    document.getElementById("BrideLastName").innerText = BrideLastName;
    document.getElementById("BrideLastName2").innerText = BrideLastName;
};

// 신부 아버님 성
function printBrideFatherFirst() {
    let BrideFatherFirstName = document.getElementById('BrideFatherFirstNameInput').value;
    document.getElementById("BrideFatherFirstName").innerText = BrideFatherFirstName;
};
// 신부 아버님 이름
function printBrideFatherLast() {
    let BrideFatherLastName = document.getElementById('BrideFatherLastNameInput').value;
    document.getElementById("BrideFatherLastName").innerText = BrideFatherLastName;
};

// 신부 어머님 성
function printBrideMotherFirst() {
    let BrideMotherFirstName = document.getElementById('BrideMotherFirstNameInput').value;
    console.log(BrideMotherFirstName);
    document.getElementById("BrideMotherFirstName").innerText = BrideMotherFirstName;
};
// 신부 어머님 이름
function printBrideMotherLast() {
    let BrideMotherLastName = document.getElementById('BrideMotherLastNameInput').value;
    console.log(BrideMotherLastName);
    document.getElementById("BrideMotherLastName").innerText = BrideMotherLastName;
};

// URL 입력필드
function printURL() {
    let PrintURL = document.getElementById('InputURL').value;

    document.getElementById("CustomUrl").innerText = PrintURL;
};

// 초대 제목
function printInvite() {
    let PrintInvite = document.getElementById('InviteTitleInput').value;

    document.getElementById("InviteTitle").innerText = PrintInvite;
};

// 초대 문구
function printInviteBody() {
    let PrintInvite = document.getElementById('TextBoxInput').value;

    document.getElementById("InviteBodyText").innerText = PrintInvite;
};

// 신랑측 계좌번호
function printAccountGroom() {
    let PrintAccount = document.getElementById('AccountGroomInput').value;

    document.getElementById("accountinformation").innerText = PrintAccount;
};

// 신랑측 은행
function printBankGroom() {
    let PrintAccount = document.getElementById('BankGroomInput').value;

    document.getElementById("bankinfo").innerText = PrintAccount;
};

// 신랑측 예금주
function printHolderGroom() {
    let PrintAccount = document.getElementById('HolderGroomInput').value;

    document.getElementById("holderinfo").innerText = PrintAccount;
};




document.addEventListener('DOMContentLoaded', () => {
    let saveButton = document.getElementById('SavedBtn');
    console.log(saveButton);

    let saveAlert = document.querySelector('.ModalSaveComplete');
    const scrollPreventEvent = document.body;
    let dimmed = document.getElementById('SaveCompleteDimmed');
    let deleteBtn = document.querySelector('.close-button');


    let toggleElements = () => {
        dimmed.classList.toggle('is-active');
        saveAlert.classList.toggle('is-active');
        saveAlert.style.animation = 'slideUp 0.2s ease';
        deleteBtn.style.display = 'none';
        scrollPreventEvent.style.overflowY = 'scroll';
    };

    // 템플릿 저장버튼 클릭시 동작하는 Script 정리
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            console.log('오류체크');
            let fileArray = [];
            let imageUrls = []; // array to hold the image urls returned by the server

            // files 변수가 존재하지 않을 경우 빈 배열로 처리
            if (!files) {
                files = [];
            }

            for (let i = 0; i < files.length; i++) {
                var file = files[i];
                fileArray.push(file);

                // 이미지 타입 매칭 후 노출
                if (file.type.match('image.*')) {
                    // 이미지 정보를 FormData에 추가
                    var formData = new FormData();
                    formData.append("images", file);

                    // 이미지 압축
                    compressImage(file, function (compressedFile) {
                        formData.set('images', compressedFile, compressedFile.name);

                        // XMLHttpRequest 객체를 생성하여 FormData를 서버로 전송
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "/api_MultiImgUpload");
                        xhr.send(formData);

                        xhr.onreadystatechange = function () {
                            if (xhr.readyState === XMLHttpRequest.DONE) {
                                if (xhr.status === 200) {
                                    // 서버로부터의 응답 처리
                                    console.log(xhr.responseText);
                                    let resURL = xhr.responseText
                                    let AWSresURL = JSON.parse(resURL).fileUrls;
                                    console.log(AWSresURL);
                                    imageUrls.push(...AWSresURL); // add the urls to the imageUrls array
                                    if (imageUrls.length === files.length) { // check if all images have been uploaded
                                        saveInvitationWithImages(imageUrls);
                                    }
                                } else {
                                    console.log('There was a problem with the request.');
                                }
                            }
                        };

                    });
                } else {
                    alert('the file ' + file.name + ' is not an image<br/>');
                }
            }

            // 이미지를 압축하는 함수
            function compressImage(file, callback) {
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                    var img = new Image();
                    img.src = event.target.result;
                    img.onload = function () {
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        var MAX_WIDTH = 800;
                        var MAX_HEIGHT = 600;
                        var width = img.width;
                        var height = img.height;

                        if (width > height) {
                            if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                            }
                        } else {
                            if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                            }
                        }
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, width, height);

                        canvas.toBlob(function (blob) {
                            var compressedFile = new File([blob], file.name, { type: file.type, lastModified: Date.now() });
                            callback(compressedFile);
                        }, file.type, 0.2);
                    };
                };
            }



            // function to save invitation with images
            function saveInvitationWithImages(imageUrls) {

                // 
                const ModalGroups = document.querySelector('.ModalGroups');
                const ModalGroupsData = ModalGroups.outerHTML;

                // 좌측 사이드 템플릿과 이미지URL을 DB에 저장하는 함수
                const sideContentsEl = document.querySelector('.side_contents');
                const sideContents = sideContentsEl.outerHTML;
                const imageListItems = sideContentsEl.querySelectorAll('.grid-item');

                for (let i = 0; i < imageUrls.length; i++) {
                    const url = imageUrls[i];
                    const imgElement = imageListItems[i].querySelector('.grid-thumb');
                    imgElement.src = url;
                    console.log(url);
                }
                let URLINFO = window.location.pathname.split('/').pop().replace('template_', '').replace('.html', '');
                console.log(`URLInfo: ${URLINFO}`);

                // 변경된 HTML 코드를 sideContents 변수에 다시 할당
                const updatedSideContents = sideContentsEl.outerHTML;


                // DB post 데이터 정리
                // 저장 버튼 클릭시 정적 파일 형성 Post 

                // // 데이터를 가져올 요소 정리
                // 네이버 ID
                const naverEmail = sessionStorage.getItem('naver_email');
                console.log('Naver Email Data:' + JSON.stringify(naverEmail));

                // |- 디자인 영역 탭

                // └─ 디자인 테마 JSON
                const ThemeElement = document.querySelector('.TabItemDesign.Active');
                const ThemeData = ThemeElement.id;
                console.log('Theme Data:' + JSON.stringify(ThemeData));

                // └─ BGM JSON
                const BGMElement = document.querySelector('.TabItemBGM.Active');
                const ActiveBGMElementData = BGMElement.id;
                console.log('ActiveBGMElement Data:' + JSON.stringify(ActiveBGMElementData));

                // └─ 효과 JSON
                const EffectElement = document.querySelector('.TabItemEffect.Active');
                const ActiveEffectElementData = EffectElement.id;
                console.log('ActiveEffectElement Data:' + JSON.stringify(ActiveEffectElementData));

                // └─ 서체 타입 JSON
                const Fontselect = document.getElementById('custom-select');
                const FontselectData = Fontselect.value;
                console.log('Fontselect Data:' + JSON.stringify(FontselectData));

                // └─ 폰트 크기 JSON
                const FontSize = document.querySelector('.TabItemFont.Active');
                const FontSizeData = FontSize.value;
                console.log('FontSize Data:' + JSON.stringify(FontSizeData));

                // |- 메인 꾸미기 탭

                // // └─ 청첩장 URL JSON
                // const inputURL = document.getElementById('InputURL');
                // const UrlData = inputURL.value;
                // console.log('url Data:' + JSON.stringify(UrlData));

                // └─ 청첩장 타이틀 JSON
                const InvitationTitle = document.getElementById('InvitationTitleInput');
                const InvitationTitleData = InvitationTitle.value;
                console.log('InvitationTitle Data:' + JSON.stringify(InvitationTitleData));

                // └─ 타이틀 이미지 SRC JSON
                const TitleUploadImg = document.getElementById('TitleImgUpload');
                const TitleUploadImgData = TitleUploadImg.src;
                console.log('TitleUploadImg Data:' + JSON.stringify(TitleUploadImgData));

                // └─ 카카오 공유하기 이미지 SRC JSON
                const KaKaoShareImg = document.getElementById('KaKaosrc');
                const KaKaoShareImgData = KaKaoShareImg.src;
                console.log('KaKaoShareImg Data:' + JSON.stringify(KaKaoShareImgData));

                // |- 신랑 정보 탭

                // └─ 신랑 성함 JSON
                const GroomFirstName = document.getElementById('GroomFirstNameInput');
                const GroomLastName = document.getElementById('GroomLastNameInput');
                const SelectGroomRelationship = document.getElementById('SelectGroomRelationship');
                const GroomFirstNameData = GroomFirstName.value;
                const GroomLastNameData = GroomLastName.value;
                const SelectGroomRelationshipData = SelectGroomRelationship.value;
                console.log('GroomFirstName Data:' + JSON.stringify(GroomFirstNameData));
                console.log('GroomLastName Data:' + JSON.stringify(GroomLastNameData));
                console.log('SelectGroomRelationship Data:' + JSON.stringify(SelectGroomRelationshipData));

                // └─ 신랑 아버지 JSON
                const GroomFatherFirstName = document.getElementById('GroomFatherFirstNameInput');
                const GroomFatherLastName = document.getElementById('GroomFatherLastNameInput');
                const GroomFatherFirstNameData = GroomFatherFirstName.value;
                const GroomFatherLastNameData = GroomFatherLastName.value;
                const Groomfatherstatus = document.getElementById('Groomfatherstatus');
                const GroomfatherstatusData = Groomfatherstatus.checked;
                const Groomfatherstatustype = document.getElementById('Groomfatherstatustype');
                const GroomfatherstatustypeData = Groomfatherstatustype.value;

                console.log('GroomFatherFirstName Data:' + JSON.stringify(GroomFatherFirstNameData));
                console.log('GroomFatherLastName Data:' + JSON.stringify(GroomFatherLastNameData));
                console.log('Groomfatherstatus Data:' + JSON.stringify(GroomfatherstatusData));
                console.log('Groomfatherstatustype Data:' + JSON.stringify(GroomfatherstatustypeData));

                // └─ 신랑 어머니 JSON
                const GroomMotherFirstName = document.getElementById('GroomMotherFirstNameInput');
                const GroomMotherLastName = document.getElementById('GroomMotherLastNameInput');
                const GroomMotherFirstNameData = GroomMotherFirstName.value;
                const GroomMotherLastNameData = GroomMotherLastName.value;
                const Groommotherstatus = document.getElementById('Groommotherstatus');
                const GroommotherstatusData = Groommotherstatus.checked;
                const Groommotherstatustype = document.getElementById('Groommotherstatustype');
                const GroommotherstatustypeData = Groommotherstatustype.value;

                console.log('GroomMotherFirstName Data:' + JSON.stringify(GroomMotherFirstNameData));
                console.log('GroomMottherLastName Data:' + JSON.stringify(GroomMotherLastNameData));
                console.log('GroomMotherstatus Data:' + JSON.stringify(GroommotherstatusData));
                console.log('GroomMotherstatustype Data:' + JSON.stringify(GroommotherstatustypeData));


                // |- 신부 정보 탭

                // └─ 신랑 성함 JSON
                const BrideFirstName = document.getElementById('BrideFirstNameInput');
                const BrideLastName = document.getElementById('BrideLastNameInput');
                const SelectBrideRelationship = document.getElementById('SelectBrideRelationship');
                const BrideFirstNameData = BrideFirstName.value;
                const BrideLastNameData = BrideLastName.value;
                const SelectBrideRelationshipData = SelectBrideRelationship.value;
                console.log('BrideFirstName Data:' + JSON.stringify(BrideFirstNameData));
                console.log('BrideLastName Data:' + JSON.stringify(BrideLastNameData));
                console.log('SelectBrideRelationship Data:' + JSON.stringify(SelectBrideRelationshipData));

                // └─ 신랑 아버지 JSON
                const BrideFatherFirstName = document.getElementById('BrideFatherFirstNameInput');
                const BrideFatherLastName = document.getElementById('BrideFatherLastNameInput');
                const BrideFatherFirstNameData = BrideFatherFirstName.value;
                const BrideFatherLastNameData = BrideFatherLastName.value;
                const Bridefatherstatus = document.getElementById('Bridefatherstatus');
                const BridefatherstatusData = Bridefatherstatus.checked;
                const Bridefatherstatustype = document.getElementById('Bridefatherstatustype');
                const BridefatherstatustypeData = Bridefatherstatustype.value;

                console.log('BrideFatherFirstName Data:' + JSON.stringify(BrideFatherFirstNameData));
                console.log('BrideFatherLastName Data:' + JSON.stringify(BrideFatherLastNameData));
                console.log('Bridefatherstatus Data:' + JSON.stringify(BridefatherstatusData));
                console.log('Bridefatherstatustype Data:' + JSON.stringify(BridefatherstatustypeData));

                // └─ 신랑 어머니 JSON
                const BrideMotherFirstName = document.getElementById('BrideMotherFirstNameInput');
                const BrideMotherLastName = document.getElementById('BrideMotherLastNameInput');
                const BrideMotherFirstNameData = BrideMotherFirstName.value;
                const BrideMotherLastNameData = BrideMotherLastName.value;
                const Bridemotherstatus = document.getElementById('Bridemotherstatus');
                const BridemotherstatusData = Bridemotherstatus.checked;
                const Bridemotherstatustype = document.getElementById('Bridemotherstatustype');
                const BridemotherstatustypeData = Bridemotherstatustype.value;

                console.log('BrideMotherFirstName Data:' + JSON.stringify(BrideMotherFirstNameData));
                console.log('BrideMotherLastName Data:' + JSON.stringify(BrideMotherLastNameData));
                console.log('Bridemotherstatus Data:' + JSON.stringify(BridemotherstatusData));
                console.log('Bridemotherstatustype Data:' + JSON.stringify(BridemotherstatustypeData));

                // |- 예식 정보 탭

                // └─ 예식 일자 JSON

                const WeddingDate = document.getElementById("TextDateCalendar").innerText;
                const WeddingDay = document.getElementById("CalWeddingDayTitle").innerText;

                const DdayToggle = document.getElementById('DDay');
                const WeddingDateData = `${WeddingDate} ${WeddingDay}`
                // const WeddingDateData = `${WeddingDate} ${WeddingDay}`
                const DdayToggleData = DdayToggle.classList.contains('active');
                console.log('WeddingDate Data:' + JSON.stringify(WeddingDateData));
                console.log('DdayToggle Data:' + JSON.stringify(DdayToggleData));

                // └─ 예식 시간 JSON
                const WeddingAMPM = document.getElementById('SelectAMPM');
                const WeddingTime = document.getElementById('SelectTime');
                const WeddingMinute = document.getElementById('SelectMinute');
                const WeddingAMPMData = WeddingAMPM.value;
                const WeddingTimeData = WeddingTime.value;
                const WeddingMinuteData = WeddingMinute.value;
                console.log('WeddingAMPM Data:' + JSON.stringify(WeddingAMPMData));
                console.log('WeddingTime Data:' + JSON.stringify(WeddingTimeData));
                console.log('WeddingMinute Data:' + JSON.stringify(WeddingMinuteData));

                // └─ 예식장 명
                const WeddingLocation = document.getElementById('WeddingLocateTitleInput');
                const WeddingLocationData = WeddingLocation.value;
                console.log('WeddingLocation Data:' + JSON.stringify(WeddingLocationData));

                // └─ 예식장 층과 홀
                const WeddingLocationHall = document.getElementById('WeddingHallInfoInput');
                const WeddingLocationHallData = WeddingLocationHall.value;
                console.log('WeddingLocationHall Data:' + JSON.stringify(WeddingLocationHallData));

                // └─ 예식장 주소
                const WeddingAddress = document.getElementById('SearchAddressInput');
                const WeddingAddressData = WeddingAddress.value;
                console.log('WeddingAddress Data:' + JSON.stringify(WeddingAddressData));


                // |- 초대 글 탭

                // └─ 초대문구 타이틀 JSON
                const InviteTitle = document.getElementById('InviteTitleInput');
                const InviteTitleData = InviteTitle.value;
                console.log('InviteTitle Data:' + JSON.stringify(InviteTitleData));

                // └─ 초대문구 본문 JSON
                const InvitationBody = document.getElementById('TextBoxInput');
                const InvitationBodyData = InvitationBody.value;
                console.log('InvitationBody Data:' + JSON.stringify(InvitationBodyData));


                // |- 계좌 정보 탭

                // └─ 그룹명 타이틀 JSON


                // |- 이미지 갤러리 탭

                // └─ 갤러리 타입 JSON
                const GalleryType = document.querySelector('.TabItemGallery.Active');
                const GalleryTypeData = GalleryType.id;
                console.log('GalleryType Data:' + JSON.stringify(GalleryTypeData));

                // └─ 이미지그룹 JSON

                const ImgGroupElements = document.querySelectorAll('.grid-thumb');
                const ImgGroupElementData = Array.from(ImgGroupElements).map(element => element.src);
                console.log('ImgGroup Data:' + JSON.stringify(ImgGroupElementData));

                // |- 방명록 탭

                // └─ 방명록 비밀번호 JSON
                const BoardPassword = document.getElementById('boardpassword');
                const BoardPasswordData = BoardPassword.value;
                console.log('BoardPassword Data:' + JSON.stringify(BoardPasswordData));


                // |- 순서변경 탭

                // └─ 순서 변경 데이터 JSON
                const OrderTab = document.querySelector('.OrderSection');
                const OrderTabData = Array.from(OrderTab.querySelectorAll('.OrderSection > *')).map(el => {
                    const obj = {};
                    for (const attr of el.attributes) {
                        obj[attr.name] = attr.value;
                    }
                    return obj;
                });
                const OrderTabJSON = JSON.stringify(OrderTabData);
                console.log('OrderTab Data:' + OrderTabJSON);

                // 템플릿 ID 조회용
                let templateID = window.location.pathname.split('/').pop().replace('template_', '').replace('.html', '');
                console.log(`URLInfo: ${templateID}`);


                // 청첩장 DB 저장 Data

                let DBData = {
                    user_naver_ID: naverEmail,
                    templateID: templateID,
                    theme_type: ThemeData,
                    BGM_type: ActiveBGMElementData,
                    effect_type: ActiveEffectElementData,
                    font_type: FontselectData,
                    font_size: FontSizeData,
                    // URL_data: UrlData,
                    invitation_title: InvitationTitleData,
                    title_upload_img: TitleUploadImgData,
                    kakao_share_img: KaKaoShareImgData,
                    groom_first_name: GroomFirstNameData,
                    groom_last_name: GroomLastNameData,
                    select_groom_relationship: SelectGroomRelationshipData,
                    groom_father_firstname: GroomFatherFirstNameData,
                    groom_father_lastname: GroomFatherLastNameData,
                    groom_father_status: GroomfatherstatusData,
                    groom_father_status_type: GroomfatherstatustypeData,
                    groom_mother_firstname: GroomMotherFirstNameData,
                    groom_mother_lastname: GroomMotherLastNameData,
                    groom_mother_status: GroommotherstatusData,
                    groom_mother_status_type: GroommotherstatustypeData,
                    bride_firstname: BrideFirstNameData,
                    bride_lastname: BrideLastNameData,
                    select_bride_relationship: SelectBrideRelationshipData,
                    bride_father_firstname: BrideFatherFirstNameData,
                    bride_father_lastname: BrideFatherLastNameData,
                    bride_father_status: BridefatherstatusData,
                    bride_father_status_type: BridefatherstatustypeData,
                    bride_mother_firstname: BrideMotherFirstNameData,
                    bride_mother_lastname: BrideMotherLastNameData,
                    bride_mother_status: BridemotherstatusData,
                    bride_mother_status_type: BridemotherstatustypeData,
                    wedding_date: WeddingDateData,
                    dday_toggle: DdayToggleData,
                    wedding_AMPM: WeddingAMPMData,
                    wedding_time: WeddingTimeData,
                    wedding_minute: WeddingMinuteData,
                    wedding_location: WeddingLocationData,
                    wedding_location_hall: WeddingLocationHallData,
                    wedding_address: WeddingAddressData,
                    invite_title: InviteTitleData,
                    invite_body: InvitationBodyData,
                    gallery_type: GalleryTypeData,
                    img_group_element: ImgGroupElementData,
                    board_password: BoardPasswordData,
                    order_tab: OrderTabData
                }



                // DB Post API
                fetch('/api_DBtest', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(DBData)
                });



                const requestData = {
                    ModalGroups: ModalGroupsData,
                    sideContents: updatedSideContents, // 변경된 HTML 코드를 전송
                    imageUrls: imageUrls, // pass the image urls to the server
                    URLINFO: URLINFO,
                    DBData: DBData
                };

                console.log(DBData);

                fetch('/api_SaveInvitation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    body: JSON.stringify(requestData)
                }).then(response => {
                    console.log(response);

                    toggleElements();
                    let templateURL = `/mypage`

                    let previewButton = document.getElementById('previewInvitation');
                    let savedViewButton = document.getElementById('SavedView');
                    savedViewButton.addEventListener('click', () => {
                        if (templateURL) {
                            window.open('/mypage', '_blank');
                        } else {
                            console.log('실패');
                        }
                    });


                    previewButton.addEventListener('click', () => {

                        const currentUrl = window.location.href;
                        const templateId = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
                        console.log(templateId); // 출력 예시: 6wVX1F8vEYmxb2HA3L6quc


                        fetch(`/api_GetInvitation/${templateId}`, {
                            method: 'GET'
                        })

                            .then(response => response.text())
                            .then(html => {
                                // document.body.innerHTML = html;
                                let editpage = window.location.href = `/api_GetInvitation/${templateId}`;
                                editpage.document.write(renderedtemplateejs);
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });

                    });



                    if (dimmed) {
                        dimmed.addEventListener('click', toggleElements);
                        scrollPreventEvent.style.overflowY = 'hidden';
                    }
                    if (deleteBtn) {
                        deleteBtn.addEventListener('click', toggleElements);
                        scrollPreventEvent.style.overflowY = 'hidden';
                    }
                }).catch(error => {
                    console.log(error);
                });
            }

        });
    }

    // 마이페이지에서 Get 요청을 통한 청첩장 미리보기 페이지 불러오기 api
    let MYpage_InvitePreview = document.querySelectorAll('.BtnPreview');

    MYpage_InvitePreview.forEach((preview) => {
        preview.addEventListener('click', () => {
            let inviteURLInfoList = preview.parentNode.parentNode.parentNode.querySelectorAll('.InviteURLInfo');
            inviteURLInfoList.forEach((inviteURLInfo) => {
                let GetURLInfo = inviteURLInfo.textContent.trim();
                console.log(GetURLInfo);

                fetch(`/api_GetInvitation/${GetURLInfo}`, {
                    method: 'GET'
                })

                    .then(response => response.text())
                    .then(html => {
                        // document.body.innerHTML = html;
                        let editpage = window.location.href = `/api_GetInvitation/${GetURLInfo}`;
                        editpage.document.write(renderedtemplateejs);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            });
        });
    });

    // 마이페이지에서 Get 요청을 통한 수정 페이지 불러오기 api
    let btnEditList = document.querySelectorAll('.BtnEdit');

    btnEditList.forEach((btnEdit) => {
        btnEdit.addEventListener('click', () => {
            let inviteURLInfoList = btnEdit.parentNode.parentNode.parentNode.querySelectorAll('.InviteURLInfo');
            inviteURLInfoList.forEach((inviteURLInfo) => {
                let EditURLInfo = inviteURLInfo.textContent.trim();
                console.log(EditURLInfo);

                // 새로운 브라우저 창에서 수정 페이지 렌더링
                let editPage = window.open(`/api_EditInvitation/${EditURLInfo}`);

                // 새 창 로드가 완료되면 fetch 요청 보내기
                editPage.addEventListener('load', () => {
                    fetch(`/api_EditInvitation/${EditURLInfo}`, {
                        method: 'GET'
                    })
                        .then(response => {
                            console.log(response);
                            return response.text();
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                });
            });
        });
    });



    // 방명록 Post 스크립트
    const SaveBoard = document.getElementById('SaveBoard');
    let templateID = window.location.pathname.split('/').pop().replace('template_', '').replace('.html', '');
    let BoardDimmed = document.getElementById('Board_Create_Dimmed');

    SaveBoard.addEventListener('click', () => {

        console.log(`URLInfo: ${templateID}`);
        const Board_Writer = document.getElementById('Board_Writer');
        const Board_Contents = document.getElementById('Board_Contents');
        const Board_Password = document.getElementById('Board_Password');

        const Board_Writer_Data = Board_Writer.value;
        const Board_Contents_Data = Board_Contents.value;
        const Board_Password_Data = Board_Password.value;

        console.log('Board_Writer_Data: ' + Board_Writer_Data);
        console.log('Board_Contents_Data: ' + Board_Contents_Data);
        console.log('Board_Password_Data: ' + Board_Password_Data);

        if (Board_Writer_Data === '') {
            alert('작성자 명을 입력해주세요');
        } else if (Board_Contents_Data === '') {
            alert('방명록 내용을 입력해주세요');
        } else if (Board_Password_Data === '') {
            alert('비밀번호를 입력해주세요');

        } else {
            // POST 요청 보내기
            const url = '/api_Board/CreateBoard'; // 실제 서버 주소로 대체해야 합니다.

            const data = {
                template_ID: templateID,
                Board_Writer_Data: Board_Writer_Data,
                Board_Contents_Data: Board_Contents_Data,
                Board_Password_Data: Board_Password_Data,
            };

            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    if (response.ok) {
                        console.log('게시판 데이터 전송 성공');
                        alert('작성하신 글이 방명록에 등록되었습니다.');
                        BoardDimmed.classList.toggle('is-active');
                    } else {
                        console.error('게시판 데이터 전송 실패');
                    }
                })
                .catch(error => {
                    console.error('게시판 데이터 전송 실패:', error);
                });
        }

    });










});
