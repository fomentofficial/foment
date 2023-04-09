const dbConfig = require('../dbConfig');
const connection = dbConfig.connection;
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: dbConfig.awsAccessKeyId,
  secretAccessKey: dbConfig.awsSecretAccessKey,
  region: dbConfig.awsRegion
});

const path = require('path');
const express = require('express');
const router = express.Router();
const multiImageController = require('../controllers/Ctrl_MultiImgUpload');
const { v4: uuidv4 } = require('uuid');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 이미지 업로드를 처리하는 라우터입니다.
// '/upload' 경로로 POST 요청이 들어올 때, 'upload.array()' 미들웨어 함수로 이미지 파일들을 업로드하고, imageController.uploadImages 함수를 호출합니다.
router.post('/', upload.array('images'), async (req, res) => {
  try {
    const images = req.files;
    const fileNames = [];
    const folderPath = 'foment_img_storage';
    for (let i = 0; i < images.length; i++) {
      const uniqueSuffix = Date.now() + '-' + uuidv4();
      const fileName = uniqueSuffix + '-' + images[i].originalname;
      fileNames.push(fileName);
      const params = {
        Bucket: dbConfig.awsBucketName,
        Key: `${folderPath}/${fileName}`,
        Body: images[i].buffer
      };
      await s3.upload(params).promise();
    }

    // fileNames 배열을 활용하여 이미지 URL을 생성합니다.
    const bucketName = dbConfig.awsBucketName;
    const region = dbConfig.awsRegion;
    const fileUrls = fileNames.map(fileName => `https://${bucketName}.s3.${region}.amazonaws.com/foment_img_storage/${fileName}`);

    // 응답으로 fileUrls 배열을 반환합니다.
    res.json({ success: true, message: '이미지가 성공적으로 업로드되었습니다.', fileUrls });
    console.log('저장된 파일명:'+ fileUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: '이미지 업로드에 실패했습니다.' });
  }
});



module.exports = router;
