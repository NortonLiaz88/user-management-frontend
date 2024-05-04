/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import {HttpError} from './http-errors';

function getHttpError(err: number): HttpError {
  switch (err) {
    case 400:
      return HttpError.badRequest;
    case 401:
      return HttpError.unauthorized;
    case 403:
      return HttpError.forbidden;
    case 404:
      return HttpError.notFound;
    case 409:
      return HttpError.conflitc;
    case 413:
      return HttpError.invalidFormat;
    case 415:
      return HttpError.exceedsFileSize;
    case 422:
      return HttpError.unprocessableEntity;
    case 427:
      return HttpError.geolocationError;
    default:
      return HttpError.serverError;
  }

  throw HttpError.serverError;
}

export {getHttpError};
