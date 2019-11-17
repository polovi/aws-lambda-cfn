import { Handler, Context } from 'aws-lambda';
import { Response } from './response';
import { Event } from './event';
export declare type CustomResourceFunction = (event: Event, response: object, ctx?: Context) => Response | Promise<Response> | never;
export declare const wrapLambda: (lambdaFunction: CustomResourceFunction) => Handler<any, any>;
