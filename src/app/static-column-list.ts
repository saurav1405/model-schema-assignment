import {Column} from './Column';
export const columns : Column[] = [
  {
    name: 'id',
    type: 'NUMBER',
    required: true,
    defaultValue: false
  },
  {
    name: 'name',
    type: 'STRING',
    required: true,
    minLength: 5,
    maxLength: 20,
    defaultValue: false
  },
  {
    name: 'age',
    type: 'NUMBER',
    required: false,
    min: 18,
    max: 45,
    defaultValue: false
  },
  {
    name: 'isActive',
    type: 'BOOLEAN',
    required: true,
    defaultValue: true
  }
];

