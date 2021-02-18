"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidator = void 0;
const axios_1 = require("axios");
const httpMethods = require("../common/constants/http-methods");
class OrderValidator {
    constructor() { }
    static getInstance() {
        if (!OrderValidator.instance) {
            OrderValidator.instance = new OrderValidator();
        }
        return OrderValidator.instance;
    }
    validateFile(file) {
        switch (file.mimetype) {
            case "audio/wav":
                return;
            default:
                throw new Error(`${file.mimetype} is not a supported file format.`);
        }
    }
    validateCommandParameters(command, action) {
        let commandParameters = command.match(/{.*}/g);
        //no validation required for commands without parameters
        if (commandParameters === null) {
            return;
        }
        if (action.queryParameters !== undefined) {
            this.validateCommandQueryParameters(commandParameters, action.queryParameters);
            return;
        }
        this.validateBody(commandParameters, action.body);
    }
    validateCommandQueryParameters(commandParameters, queryParameters) {
        if (commandParameters.length !== queryParameters.length) {
            throw new Error("Command parameters and action parameters count don't match");
        }
        queryParameters.forEach((parameter) => {
            if (!commandParameters.includes(parameter.property)) {
                throw new Error(`There is no command parameter defined for ${parameter.property}`);
            }
        });
    }
    validateBody(commandParameters, body) {
        let bodyParameters = new Array();
        this.traverseBody(body, bodyParameters);
        commandParameters.forEach((commandParameter) => {
            if (!bodyParameters.includes(commandParameter)) {
                throw new Error(`${commandParameter} is missing from Request Body`);
            }
        });
    }
    traverseBody(parameter, parameters) {
        for (let key in parameter) {
            parameters.push(key);
            let value = parameter[key];
            if (typeof value === 'object' && value !== null) {
                this.traverseBody(value, parameters);
            }
        }
    }
    async challengeEndpoint(action) {
        let client = axios_1.default.create({
            baseURL: action.host,
            headers: action.headers
        });
        let result;
        try {
            switch (action.method.toUpperCase()) {
                case httpMethods.GET:
                    result = await client.get(action.urlWithQueryString);
                    break;
                case httpMethods.POST:
                    result = await client.post(action.url, action.body);
                    break;
                case httpMethods.PUT:
                    result = await client.put(action.url, action.body);
                    break;
                case httpMethods.PATCH:
                    result = await client.patch(action.url, action.body);
                    break;
                case httpMethods.DELETE:
                    result = await client.delete(action.urlWithQueryString);
                    break;
                default:
                    throw new Error("Invalid Endpoint method provided.");
            }
        }
        catch (error) {
            throw new Error(`Challenging the provided endpoint failed: ${error}`);
        }
        return result.data ?? result;
    }
}
exports.OrderValidator = OrderValidator;
//# sourceMappingURL=order.validator.js.map