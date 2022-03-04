export interface Column {
  name : string;
  type: string;
  required: boolean;
  defaultValue: string | number | boolean;
  minLength ? : number;
  maxLength ? : number;
  min ? : number;
  max ? : number;
}
