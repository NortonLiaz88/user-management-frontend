export type FieldError = {
  field: string;
  message: string;
};

export class BaseFormError extends Error {
  constructor(
    public name: string,
    public code: number,
    public fields: FieldError[],
  ) {
    super(name);
    this.name = name;
    this.code = code;
    this.fields = fields;
  }
}
