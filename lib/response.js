"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["Succes"] = "SUCCESS";
    ResponseStatus["Failed"] = "FAILED";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
exports.fromEvent = (event) => ({
    StackId: event.StackId,
    RequestId: event.RequestId,
    ResponseURL: event.ResponseURL,
    LogicalResourceId: event.LogicalResourceId,
});
