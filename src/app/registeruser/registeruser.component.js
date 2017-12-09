"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_module_1 = require("../shared/model/user.module");
var RegisteruserComponent = (function () {
    function RegisteruserComponent(smsservice, profileservice) {
        this.smsservice = smsservice;
        this.profileservice = profileservice;
        this.verif = false;
        this.confirmed = false;
        this.isCompleted = false;
        this.randnumber = '' + (Math.floor(Math.random() * (999999 - 100000)) + 100000);
        console.log(this.randnumber);
    }
    RegisteruserComponent.prototype.ngOnInit = function () {
    };
    RegisteruserComponent.prototype.checkthisnumber = function (tel) {
        this.smsservice.sendsmstothis(tel, this.randnumber);
    };
    RegisteruserComponent.prototype.checkconfirmationcode = function (code) {
        if (this.randnumber == code) {
            return true;
        }
        return false;
    };
    RegisteruserComponent.prototype.apollonavartar = function (val) {
        this.avatar = JSON.parse(val).path;
        this.isCompleted = true;
    };
    RegisteruserComponent.prototype.registerhim = function () {
        var user = new user_module_1.User();
        user.imagePath = this.avatar;
        this.profileservice.add(user);
    };
    RegisteruserComponent = __decorate([
        core_1.Component({
            selector: 'app-registeruser',
            templateUrl: './registeruser.component.html',
            styleUrls: ['./registeruser.component.css']
        })
    ], RegisteruserComponent);
    return RegisteruserComponent;
}());
exports.RegisteruserComponent = RegisteruserComponent;
