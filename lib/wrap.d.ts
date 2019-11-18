import { Context, Handler } from 'aws-lambda';
import { Event } from './event';
import { Response } from './response';
export declare type CustomResourceFunction = (response: Response, event: Event, ctx?: Context) => void | Promise<void>;
export declare const wrapHandler: (lambda: CustomResourceFunction) => Handler<import("aws-lambda").CloudFormationCustomResourceEvent, void>;
