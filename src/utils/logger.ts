export class Logger {
  static log(message: string): void {
    console.log(`[INFO]: ${message}`);
  }

  static error(message: string): void {
    console.error(`[ERROR]: ${message}`);
  }

  static warn(message: string): void {
    console.warn(`[WARN]: ${message}`);
  }
}
