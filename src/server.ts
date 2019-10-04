import * as express from "express";
import log from "./log";
const express = require('express')
const path = require('path')

const app = express();


app.listen(process.env.PORT || 5000, () => {
    log.info("app running");
});
