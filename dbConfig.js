const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(path.join(__dirname, 'database.json'), 'utf8');
const conf = JSON.parse(data);
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
});

connection.connect(function(err) {
  if (err) {
    console.error('Error connecting: ' + err.stack);
    return;
  }
  console.log('MySQL 연결 설공' + 'Connected as id ' + connection.threadId);
});


const config = require('./awsAuth.json');

const awsAccessKeyId = config.aws.accessKeyId;
const awsSecretAccessKey = config.aws.secretAccessKey;
const awsRegion = config.aws.region;
const awsBucketName = config.aws.bucketName;



module.exports = {
  connection,
  awsAccessKeyId,
  awsSecretAccessKey,
  awsRegion,
  awsBucketName 
};
