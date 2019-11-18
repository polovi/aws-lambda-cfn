import * as https from 'https'
import { IncomingMessage } from 'http'
import { parse as parseUrl } from 'url'
import { Event } from './event'

export enum ResponseStatus {
  Succes = 'SUCCESS',
  Failed = 'FAILED',
}

export interface Response {
  StackId: string
  RequestId: string
  LogicalResourceId: string
  PhysicalResourceId?: string
  Status?: ResponseStatus
  Data?: object
  Reason?: string

  url: string
  send(): Promise<string>
}

const sendImpl = async ({ url, send, ...response }: Response): Promise<string> => {
  const body: string = JSON.stringify(response)
  const { hostname, path } = parseUrl(url)

  const options = {
    hostname,
    path,
    method: 'PUT',
    headers: { 'content-length': body.length },
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res: IncomingMessage) => {
      const type = ((res.statusCode || 200) / 100) | 0
      let output = ''
      res.setEncoding('utf-8')
      res.on('data', d => (output += d))
      res.on('end', () => {
        if (type === 2) {
          resolve(output)
        } else {
          reject('[' + res.statusCode + '] ' + res.statusMessage)
        }
      })
    })

    req.on('error', reject)
    req.write(body)
    req.end()
  })
}

export const fromEvent = (event: Event): Response => ({
  StackId: event.StackId,
  RequestId: event.RequestId,
  LogicalResourceId: event.LogicalResourceId,

  url: event.ResponseURL,
  async send(): Promise<string> {
    return sendImpl(this)
  },
})
