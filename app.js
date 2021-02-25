
const express = require('express'),
  bodyParser = require('body-parser'),
  CronHit = require('./api/controllers/CronController')
app = express();


CronHit.LechatauHit()


app.listen(process.env.PORT || 8085, function () {
  console.log('Server started on port 8085');
});