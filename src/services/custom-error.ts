export class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(statusCode + ' ' + message);
    this.name = 'CustomError';
  }
}
