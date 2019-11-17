import { CloudFormationCustomResourceEvent } from 'aws-lambda';
export declare enum ResponseStatus {
    Succes = "SUCCESS",
    Failed = "FAILED"
}
export interface Response {
    StackId: string;
    RequestId: string;
    ResponseURL: string;
    LogicalResourceId: string;
    PhysicalResourceId?: string;
    Status?: ResponseStatus;
    Data?: object;
    Reason?: string;
}
export declare const fromEvent: (event: CloudFormationCustomResourceEvent) => Response;
