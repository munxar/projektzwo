/**
 * Created by saschademirovic on 23.07.15.
 */


export class AppController {
    message: string;

    static $inject = ["$http"];
    constructor($http) {
        $http.get("/api").then(res => this.message = res.data.msg);
    }
}