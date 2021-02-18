"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const parameter_1 = require("../contract-models/parameter");
const httpMethods = require("../../common/constants/http-methods");
let endpointSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    host: { type: String, required: true },
    method: { type: String, required: true },
    requestLine: { type: String, required: true },
    queryParameters: { type: [parameter_1.Parameter] },
    headers: { type: [Headers] },
    body: mongoose.Schema.Types.Mixed,
    secured: { type: Boolean },
    authenticationHeader: { type: String }
});
endpointSchema.virtual('url').get(function () {
    return `${this.host}${this.requestLine}`;
});
endpointSchema.virtual('urlWithQueryString').get(function () {
    if (this.queryParameters !== undefined) {
        let queryString;
        let count = 0;
        this.queryParameters.forEach((parameter) => {
            if (count > 0) {
                queryString += "&";
            }
            queryString += `${parameter.property}=${parameter.value}`;
            count++;
        });
        return `${this.url}?${queryString}`;
    }
    return this.url;
});
endpointSchema.path('url').validate(function (value) {
    let host = value.match(/www\.\w*?\.\w{2,3}\S*/g);
    if (host !== null) {
        throw new Error("Invalid hostname and/or requestline provided");
    }
    return true;
});
endpointSchema.path('method').validate(function (value) {
    switch (value.toUpperCase()) {
        case httpMethods.GET:
            if (this.body !== undefined) {
                this.invalidate("body", "GET method can not contain a body");
            }
            break;
        case httpMethods.POST:
            if (this.queryParameters !== undefined) {
                this.invalidate("queryParameters", "Query strings are not supported in POST method");
            }
            break;
        case httpMethods.PUT:
            if (this.queryParameters !== undefined) {
                this.invalidate("queryParameters", "Query strings are not supported in PUT method");
            }
            break;
        case httpMethods.PATCH:
            if (this.queryParameters !== undefined) {
                this.invalidate("queryParameters", "Query strings are not supported in Patch method");
            }
            break;
        case httpMethods.DELETE:
            if (this.body !== undefined) {
                this.invalidate("body", "Request body is not supported in DELETE method");
            }
            break;
        default:
            this.invalidate("method", `${value.toUpperCase()} is not a valid Http method.`);
    }
});
module.exports = mongoose.model("Endpoint", endpointSchema);
//# sourceMappingURL=endpoint.dto.js.map