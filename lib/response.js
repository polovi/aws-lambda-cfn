"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const url_1 = require("url");
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["Succes"] = "SUCCESS";
    ResponseStatus["Failed"] = "FAILED";
})(ResponseStatus = exports.ResponseStatus || (exports.ResponseStatus = {}));
const sendImpl = async ({ url, send, ...response }) => {
    const body = JSON.stringify(response);
    const { hostname, path } = url_1.parse(url);
    const options = {
        hostname,
        path,
        method: 'PUT',
        headers: { 'content-length': body.length },
    };
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            const type = ((res.statusCode || 200) / 100) | 0;
            let output = '';
            res.setEncoding('utf-8');
            res.on('data', d => (output += d));
            res.on('end', () => {
                if (type === 2) {
                    resolve(output);
                }
                else {
                    reject('[' + res.statusCode + '] ' + res.statusMessage);
                }
            });
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
};
exports.fromEvent = (event) => ({
    StackId: event.StackId,
    RequestId: event.RequestId,
    LogicalResourceId: event.LogicalResourceId,
    url: event.ResponseURL,
    async send() {
        return sendImpl(this);
    },
});
