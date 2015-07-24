/// <reference path="../../typings/tsd.d.ts"/>

import * as express from "express";
import * as morgan from "morgan";
var config = require("../../config");

var app = express();

app.use(morgan(config.logLevel));

app.get(config.api, (req,res) => res.json({ msg: "hallo" }));

app.listen(config.port);
