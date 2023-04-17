const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.PORT
});


connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 성공' + 'Connected as id ' + connection.threadId);
});


// AWS Auth
const awsAccessKeyId = process.env.AWS_ACCESS_KEY_ID;
const awsSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const awsRegion = process.env.AWS_REGION;
const awsBucketName = process.env.AWS_BUCKET_NAME;


// 네이버 로그인 Auth
const naverLoginClientId = process.env.NAVER_LOGIN_CLIENT_ID;
const naverLoginClientSecret = process.env.NAVER_LOGIN_CLIENT_SECRET;
const naverLoginCallbackUrl = process.env.NAVER_LOGIN_CALLBACK_URL;
const naverLoginServiceUrl = process.env.NAVER_LOGIN_SERVICE_URL;


module.exports = {
  connection,
  awsAccessKeyId,
  awsSecretAccessKey,
  awsRegion,
  awsBucketName,
  naverLoginClientId,
  naverLoginClientSecret,
  naverLoginCallbackUrl,
  naverLoginServiceUrl
};
