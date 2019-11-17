"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./response");
exports.wrapLambda = (lambdaFunction) => async (event, ctx) => {
    let r = response_1.fromEvent(event);
    try {
        r = await lambdaFunction(event, r, ctx);
        r.Status = response_1.ResponseStatus.Succes;
    }
    catch (error) {
        r.Reason = error.message;
        r.Status = response_1.ResponseStatus.Failed;
    }
    return r;
};
