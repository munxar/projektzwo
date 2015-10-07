///<reference path="../../typings/tsd.d.ts"/>
import {Document} from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    comparePassword(candidatePassword: string, cb);
}
