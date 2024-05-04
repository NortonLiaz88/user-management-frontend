/* eslint-disable @typescript-eslint/no-explicit-any */
import {BaseResourceFormModel} from '../../models/base-resource-form';
import api from '../api';

export abstract class BaseResourceFormService<T extends BaseResourceFormModel> {
  constructor(
    private readonly apiPath: string,
    protected jsonDataToResourceFn: (jsonData: any) => T,
  ) {}

  public async getAll(params: any): Promise<any> {
    try {
      const {data} = await api.get(this.apiPath, {params});
      return this.jsonDataToAny(data);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  public async getById(id: string): Promise<any> {
    try {
      const url = `${this.apiPath}/${id}`;
      const {data} = await api.get(url);
      return this.jsonDataToResourceFn(data);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  public async create(resource: T): Promise<any> {
    try {
      const {data} = await api.post(this.apiPath, {...resource?.props});
      return this.jsonDataToResourceFn(data);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  public async update(resource: T, id: string): Promise<any> {
    try {
      const url = id ? `${this.apiPath}/${id}` : `${this.apiPath}`;
      const {data} = await api.put(url, {...resource?.props});
      return this.jsonDataToResourceFn(data);
    } catch (err) {
      throw this.handleError(err);
    }
  }

  public async delete(id: string): Promise<any> {
    try {
      const url = `${this.apiPath}/${id}`;
      const {data} = await api.delete(url);
      return this.jsonDataToResourceFn(data);
    } catch (err) {
      this.handleError(err);
    }
  }

  abstract handleError(error: any): any;

  protected jsonDataToAny(jsonData: any) {
    return jsonData as any;
  }
}
