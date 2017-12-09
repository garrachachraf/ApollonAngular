"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataService = (function () {
    function DataService(http, endpointUrl) {
        this.http = http;
        this.endpointUrl = endpointUrl;
    }
    DataService.prototype.getAll = function () {
        console.log(this.endpointUrl);
        return this.http.get(this.endpointUrl);
    };
    DataService.prototype.getOne = function (id) {
        return this.http.get(this.endpointUrl + "/" + id);
    };
    DataService.prototype.add = function (T) {
        return this.http.post(this.endpointUrl, T);
    };
    DataService.prototype.update = function (T) {
        return this.http.put(this.endpointUrl, JSON.stringify(T), {
            headers: { "Content-Type": "application/json" }
        });
    };
    DataService.prototype.delete = function (id) {
        return this.http.delete(this.endpointUrl + "/" + id);
    };
    return DataService;
}());
exports.DataService = DataService;
