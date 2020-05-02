import { IncomingMessage, ServerResponse } from 'http';
export interface HttpHandler {
    (req: IncomingMessage, res: ServerResponse): any
}