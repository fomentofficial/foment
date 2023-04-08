const fs = require('fs');


exports.uploadImages = (req, res, next) => {
  const files = req.files; // 업로드된 파일들
  if (!files || files.length === 0) { // 업로드된 파일이 없으면 에러 반환
    return res.status(400).json({ message: 'No files uploaded' });
  }
  if (files.length > 20) { // 최대 업로드 가능한 파일 개수를 초과하면 에러 반환
    return res.status(400).json({ message: 'Maximum number of files is 20' });
  }


    //   
  // 파일 저장
  const uploadedFiles = [];
  files.forEach(file => { // 업로드된 파일들의 경로를 저장
    const path = file.path;
    uploadedFiles.push({ path: path });
  });

  res.status(200).json({ message: 'Files uploaded successfully', files: uploadedFiles }); // 업로드가 성공하면 업로드된 파일 경로를 반환
};
