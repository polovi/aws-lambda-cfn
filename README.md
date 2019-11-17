# aws-lambda-cfn

## Sample Function

```js
import * as cfn from 'aws-lambda-cfn'

const handler = (event: cfn.Event, response: cfn.Response): cfn.Response | Promise<cfn.Response> | never => {
  const v = event.ResourceProperties['Echo']

  response.data = {
    Echo: v,
  }

  return {
    ...response,
    PhysicalResourceId: response.LogicalResourceId,
  }
}

export const main = cfn.wrapLambda(handler)
```
