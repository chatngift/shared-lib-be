export class ErrorHandler {
  static handleError(error: Error): void {
    console.error(`[ERROR]: ${error.message}`);
    // Here you can integrate an error tracking service like Sentry.
  }
}
