"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndpointDo = void 0;
class EndpointDo {
    constructor(endpoint) {
        this._endPoint = endpoint;
    }
    get host() {
        return this._endPoint.host;
    }
    get method() {
        return this._endPoint.method;
    }
    get requestLine() {
        return this._endPoint.requestLine;
    }
    get queryParameters() {
        return this._endPoint.queryParameters;
    }
    get headers() {
        return this._endPoint.headers;
    }
    get body() {
        return this._endPoint.body;
    }
    get secured() {
        return this._endPoint.secured;
    }
    get authenticationHeader() {
        return this._endPoint.authenticationHeader;
    }
    get url() {
        return `${this.host}${this.requestLine}`;
    }
    get urlWithQueryString() {
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
    }
}
exports.EndpointDo = EndpointDo;
//# sourceMappingURL=endpoint.do.js.map