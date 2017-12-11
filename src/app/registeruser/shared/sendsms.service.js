"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var SendsmsService = (function () {
    function SendsmsService(http) {
        this.http = http;
    }
    SendsmsService.prototype.sendsmstothis = function (telnumber, verifcode) {
        var headers = new http_1.HttpHeaders();
        headers = headers.append('Authorization', 'Basic ' + btoa('ACec463a0ff5989b11f4a6c482a69f5d41:ff5e4917a9e385dcdb911ed033684e1c'));
        var formdata = new FormData();
        formdata.append('To', telnumber);
        formdata.append('Body', 'Verification Code :' + verifcode);
        formdata.append('From', '+32460203412');
        this.http.post('https://api.twilio.com/2010-04-01/Accounts/ACec463a0ff5989b11f4a6c482a69f5d41/Messages', formdata, { headers: headers }).subscribe(function (response) {
            console.log(response);
        }, function (err) {
            console.log('User authentication failed!');
        });
    };
    SendsmsService = __decorate([
        core_1.Injectable()
    ], SendsmsService);
    return SendsmsService;
}());
exports.SendsmsService = SendsmsService;
