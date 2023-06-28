import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    const errorMessage = exception.message;

    if (errorMessage.includes('Duplicate entry')) {
      status = HttpStatus.CONFLICT;
      message = 'Duplicate entry';
    } else if (errorMessage.includes('Referenced row')) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Referenced row not found';
    } else if (errorMessage.includes('violates unique constraint')) {
      status = HttpStatus.CONFLICT;
      message = 'Unique constraint violation';
    } else if (errorMessage.includes('foreign key constraint')) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Foreign key constraint violation';
    } else if (errorMessage.includes('data type mismatch')) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Data type mismatch';
    } else if (errorMessage.includes('syntax error')) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Syntax error';
    } else if (errorMessage.includes('null constraint')) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Null constraint violation';
    } else if (errorMessage.includes('connection error')) {
      status = HttpStatus.SERVICE_UNAVAILABLE;
      message = 'Database connection error';
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
