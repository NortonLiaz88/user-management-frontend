import {ValidationError} from 'yup';
import { HttpErrorMessage } from '../models/http/http-error-message';

export const authMessages: HttpErrorMessage = {
  noConnection: 'Sem conexão com a rede',
  skipped: 'Sem conexão com a rede',
  unauthorized: 'Credenciais inválidas',
  notFound: 'Usuário não encontrado',
  serverError: 'Erro interno no servidor',
  connectionTimeOutError: 'Requisição expirou',
};

export const signInValidationError: ValidationError = {
  inner: [
    {
      value: '',
      path: 'email',
      type: 'required',
      errors: ['Email inválido'],
      params: {value: '', originalValue: '', path: 'email'},
      inner: [],
      name: 'ValidationError',
      message: 'Email inválido',
    },
    {
      value: '',
      path: 'password',
      type: 'required',
      errors: ['Senha inválida'],
      params: {value: '', originalValue: '', path: 'Senha inválida'},
      inner: [],
      name: 'ValidationError',
      message: 'Senha inválida',
    },
  ],
} as unknown as ValidationError;
