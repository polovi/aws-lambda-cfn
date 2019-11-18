"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
exports.wrapHandler = (lambda) => {
    return async (event, ctx) => {
        const response = response_1.fromEvent(event);
        try {
            await lambda(response, event, ctx);
            response.Status = response_1.ResponseStatus.Succes;
        }
        catch (error) {
            response.Status = response_1.ResponseStatus.Failed;
            response.Reason = error.message;
        }
        if (!response.PhysicalResourceId) {
            console.log('PhysicalResourceID must exist, copying LogicalResourceId');
            response.PhysicalResourceId = response.LogicalResourceId;
        }
        try {
            await response.send();
        }
        catch (error) {
            response.Reason = error.message;
        }
        if (response.Reason) {
            throw new Error(response.Reason);
        }
    };
};
