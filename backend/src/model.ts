///<reference path="../../typings/tsd.d.ts"/>
import {Schema, model} from "mongoose";
import {IUser} from "./interfaces";
import * as bcrypt from "bcrypt";

var UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.method("comparePassword", function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
});

UserSchema.pre('save', function (next, done) {

    var self = this;
    self.updated = new Date();
    var User = model("User");

    User.findById(self._id, function(err,user){
        if (user == null) {
            User.findOne({username: self.username}, function (err, user) {
                if (err) {
                    done(err);
                } else if (user) {
                    self.invalidate("username", "username must be unique");
                    done(new Error("username must be unique"));
                }
                else {
                    saveUser(self, next);
                }
            });
        } else {
            saveUser(self, next);
        }
    })
});

function saveUser(self, next) {
    var SALT_WORK_FACTOR = 10;

    // only hash the password if it has been modified (or is new)
    if (!self.isModified('password') || self.password == "") {
        return next();
    }

    if (!self.password || self.password.length < 4) {
        return next(new Error("password to short"));
    }

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(self.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            self.password = hash;
            next();
        });
    });
}

export var User = model<IUser>("User", UserSchema);
