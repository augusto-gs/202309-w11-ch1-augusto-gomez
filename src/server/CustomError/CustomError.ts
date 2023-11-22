class CustomError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public customError?: string,
  ) {
    super(message);
  }
}

export default CustomError;
