export declare enum ResponseStatus {
    Succes = "SUCCESS",
    Failed = "FAILED"
}
export interface Response {
    StackId: string;
    RequestId: string;
    LogicalResourceId: string;
    PhysicalResourceId?: string;
    Status?: ResponseStatus;
    Data?: object;
    Reason?: string;
    url: string;
    send(): Promise<string>;
}
export declare const fromEvent: (event: import("aws-lambda").CloudFormationCustomResourceEvent) => Response;
