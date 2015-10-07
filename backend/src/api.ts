///<reference path="../../typings/tsd.d.ts"/>
import {Router} from "express";
import {User} from "./model";
import * as jwt from "jsonwebtoken";
import {SignOptions} from "jsonwebtoken";
import {authenticate} from "./authenticate";

export var api = Router();

api.use(authenticate(["/", "/auth/login"]));

api.get("/", (req, res) => {
    res.json({})
});

api.post("/auth/login", (req, res, next) => {

    User.findOne({username: req.body.username}).exec().then(user => {
        if (user == null) return res.status(400).json({});
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return next(err);
            if (!isMatch) return res.status(400).json({});

            var options: SignOptions = {
                expiresInMinutes: 60*24
            };
            var secret = "1234";
            var token = jwt.sign({ id: user._id, username: user.username }, secret, options);

            res.json({token});
        });
    });

});
