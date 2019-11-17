import { CloudFormationCustomResourceEvent } from 'aws-lambda'

export enum ResponseStatus {
  Succes = 'SUCCESS',
  Failed = 'FAILED',
}

export interface Response {
  StackId: string
  RequestId: string
  ResponseURL: string
  LogicalResourceId: string
  PhysicalResourceId?: string
  Status?: ResponseStatus
  Data?: object
  Reason?: string
}

export const fromEvent = (event: CloudFormationCustomResourceEvent): Response => ({
  StackId: event.StackId,
  RequestId: event.RequestId,
  ResponseURL: event.ResponseURL,
  LogicalResourceId: event.LogicalResourceId,
})
