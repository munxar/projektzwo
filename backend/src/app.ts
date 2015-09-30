/// <reference path="../../typings/tsd.d.ts"/>
import * as express from "express";
import * as morgan from "morgan";
import {json} from "body-parser";
import {join} from "path";
import {api} from "./api";
var config = require("../../config");

export var app = express();

app.use(morgan(config.logLevel));
app.use(json());
app.use(express.static(join(__dirname, "../../frontend")));

app.use(config.api, api);
