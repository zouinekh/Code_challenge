import { Request, Response, NextFunction } from 'express';

// Middleware function to log request details
const requestLoggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const startTime = new Date();

    // Logging request details
    console.log(`[${startTime.toISOString()}] ${req.method} ${req.path}`);

    // Continue processing the request
    next();

    // Calculate and log the time taken to process the request
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    console.log(`[${endTime.toISOString()}] Request processed in ${duration}ms`);
};

export default requestLoggerMiddleware;
