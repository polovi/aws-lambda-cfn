import { Handler, Context } from 'aws-lambda'
import { Response, ResponseStatus, fromEvent } from './response'
import { Event } from './event'

export type CustomResourceFunction = (
  event: Event,
  response: object,
  ctx?: Context
) => Response | Promise<Response> | never

export const wrapLambda = (lambdaFunction: CustomResourceFunction): Handler => async (
  event: Event,
  ctx: Context
): Promise<Response> => {
  let r = fromEvent(event)

  try {
    r = await lambdaFunction(event, r, ctx)
    r.Status = ResponseStatus.Succes
  } catch (error) {
    r.Reason = error.message
    r.Status = ResponseStatus.Failed
  }

  return r
}
