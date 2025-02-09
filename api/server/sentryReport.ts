import * as Sentry from '@sentry/node';

let SENTRYAPP: any;
export function sentryStarup() {
    const sentry = Sentry.init({
        dsn: process.env.SENTRYDSN,
        tracesSampleRate: 1.0,
    })
    SENTRYAPP = sentry;
    return sentry;
}

export function printError(err: Error) {
    SENTRYAPP.captureException(err);
    // console.log(err.message);
    // console.log(err.stack);
    throw err;
}

export function printLog(message: string) {
    SENTRYAPP.captureMessage(message);
    console.log(message);
}