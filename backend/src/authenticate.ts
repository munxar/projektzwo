///<reference path="../../typings/tsd.d.ts"/>
import * as jwt from "jsonwebtoken";

export function authenticate(excludes: string[] = []) {

    return function(req, res, next) {
        var isExcluded = excludes.filter(exclude => exclude === req.path).length;

        if(isExcluded) {
            // bypass
            next();
        } else {
            var token = req.query.token;
            if(token === undefined) {
                return res.status(401).json();
            }
            jwt.decode(token);

            next();
        }
    }
}
