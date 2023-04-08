function fileChange(){
    var form= document.getElementById('gform');
    var files = document.getElementById('attachments').files;
    $('#files').remove();
  
    for(var idx=0; idx<files.length; idx++){
     convertBase64(idx, files[idx], form);
    }
  }
  
  function submitForm() {
   var formData =  new FormData();
   formData.append("message", document.getElementById('message').value);
   formData.append("date", document.getElementById('date').value); 
   var attachments = document.getElementById('attachments').files;
   for (var i = 0; i <= attachments.length - 1; i++) {
       formData.append("attachments", attachments[i].name); 
    }
  
    var files = document.getElementsByName("files");
    for (var i = 0; i <= files.length - 1; i++) {
       formData.append("files", files[i].value); 
     }
  
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbzeorWxXTYQRrPx-rqLKm_rwWCMs_dJm-1vGGlaiSyjlyUjehj1irOg2a-q5nWzt5rn/exec',
      type: 'POST',
      data: formData,
          async: false, //비동기 여부
          processData: false, //프로세스 데이터 설정 : false 값을 해야 form data로 인식합니다
          contentType: false, //헤더의 Content-Type을 설정 : false 값을 해야 form data로 인식합니
      success: function(results) {
        alert(JSON.stringify(results));
        console.log(JSON.stringify(results));
      },
      error: function(results) {
        alert(JSON.stringify(results));
        console.log(JSON.stringify(results));
      }
    });
  }
  
  function convertBase64(idx, file, form) {
     var reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = function () {
       console.log(reader.result);
      var input = document.createElement('input');
      input.setAttribute("type", "hidden");
      input.setAttribute("id", "files");
      input.setAttribute("name", "files");
      input.setAttribute("value", reader.result);
              form.appendChild(input);
     };
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
  }
  
  window.onload = function() {
     document.getElementById('date').value = new Date().toISOString().slice(0, 10)
  }