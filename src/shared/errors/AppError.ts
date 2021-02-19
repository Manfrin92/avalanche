import { logger } from '../../utils/log.util';

class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(error: string | AppError | Error, statusCode = 400) {
    if (error instanceof AppError) {
      this.message = error.message;
      this.statusCode = error.statusCode;
    } else if (typeof error === 'string') {
      this.message = error;
      this.statusCode = statusCode;
      logger.error(error);
    } else {
      this.message = error.message ? error.message : 'Erro inesperado.';
      this.statusCode = statusCode;
      logger.error(error);
    }
  }
}

export default AppError;
