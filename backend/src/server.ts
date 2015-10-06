///<reference path="../../typings/tsd.d.ts"/>
var config = require("../../config");
import {app} from "./app";
import {connect} from "mongoose";

connect(config.db, err => {
    if(err) throw err;

    app.listen(config.port);
});


