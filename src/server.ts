import * as express from "express";
import log from "./log";
const express = require('express')
const path = require('path')

const app = express();

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.listen(process.env.PORT || 5000, () => {
    log.info("app running");
});
