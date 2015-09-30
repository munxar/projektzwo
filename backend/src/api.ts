///<reference path="../../typings/tsd.d.ts"/>
import {Router} from "express";
import {User} from "./model";

export var api = Router();

api.get("/", (req, res) => {
    res.json({})
});

api.post("/auth/login", (req, res, next) => {

    User.findOne({ username: req.body.username }).then(user => {
        if(user == null) return res.status(400).json({});
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(err) return next(err);
            if(!isMatch) return res.status(400).json({});

            res.json({ token: "xxx" });
        });
    });

});
