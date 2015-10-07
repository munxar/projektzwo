/// <reference path="../../typings/tsd.d.ts"/>
import {expect} from "chai";
import {agent} from "supertest";
import {app} from "../src/app";
import {connect, connection, mongo} from "mongoose";
import {User} from "../src/model";

describe("sudosu.api", function() {
    var user;

    before(done => {
        connect("mongodb://localhost/sudosutesting", (err, _db) => {
            User.find({}).remove().exec().then(() => {
                user = new User({ username: "hans", password: "1234" });
                user.save().then(() => done(err));
            })
        });
    });

    after(done => {
        connection.close(() => done());
    });

    it("api root exists", done => {
        agent(app)
            .get("/api")
            .expect("content-type", /json/)
            .expect(200)
            .end(done)
        ;
    });

    it("api/login post returns token if login success", done => {
        agent(app)
            .post("/api/auth/login")
            .send({ username: "hans", password: "1234" })
            .expect("content-type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body.token).to.exist;
                done(err);
            })
        ;
    });

    it("api/login post returns 400 if user is not found", done => {
        agent(app)
            .post("/api/auth/login")
            .send({ username: "hans-nix", password: "1234" })
            .expect("content-type", /json/)
            .expect(400)
            .end((err) => {
                done(err);
            })
        ;
    });

    it("api/login post returns 400 if user is found but password wrong", done => {
        agent(app)
            .post("/api/auth/login")
            .send({ username: "hans", password: "12345" })
            .expect("content-type", /json/)
            .expect(400)
            .end((err) => {
                done(err);
            })
        ;
    });

    it("api/secure post returns 401 if no token is present", done => {
        agent(app)
            .post("/api/secure")
            .expect(401)
            .end((err) => {
                done(err);
            })
        ;
    });

});

