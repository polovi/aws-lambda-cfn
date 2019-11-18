# aws-lambda-cfn

## Sample Function

```ts
import * as cfn from 'aws-lambda-cfn'

export const handler = async (response: cfn.Response, event: cfn.Event): Promise<void> => {
  response.PhysicalResourceId = response.LogicalResourceId

  response.Data = {
    CustomValue: event.ResourceProperties.CustomValue,
  }
}

export const main = cfn.wrapHandler(handler)
```

- Response is passed as reference so it coul'd be updated but not replaced
