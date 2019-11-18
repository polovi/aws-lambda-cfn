import { Context, Handler } from 'aws-lambda'
import { Event } from './event'
import { Response, ResponseStatus, fromEvent } from './response'

export type CustomResourceFunction = (response: Response, event: Event, ctx?: Context) => void | Promise<void>

export const wrapHandler = (lambda: CustomResourceFunction): Handler<Event, void> => {
  return async (event, ctx): Promise<void> => {
    const response: Response = fromEvent(event)

    try {
      await lambda(response, event, ctx)
      response.Status = ResponseStatus.Succes
    } catch (error) {
      response.Status = ResponseStatus.Failed
      response.Reason = error.message
    }

    if (!response.PhysicalResourceId) {
      console.log('PhysicalResourceID must exist, copying LogicalResourceId')
      response.PhysicalResourceId = response.LogicalResourceId
    }

    try {
      await response.send()
    } catch (error) {
      response.Reason = error.message
    }

    if (response.Reason) {
      throw new Error(response.Reason)
    }
  }
}
