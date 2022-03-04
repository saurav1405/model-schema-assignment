import { Injectable } from '@angular/core';
import {Column} from './Column';
import {columns} from './static-column-list';
@Injectable({
  providedIn: 'root'
})
export class ColumnService {
  backendColumn: Column[] = [];
  constructor() {
    // this.backendColumn = columns;
    if(localStorage.getItem("columns") == null) {
      localStorage.setItem("columns",JSON.stringify(columns));
    }
    else{
      this.backendColumn = JSON.parse(localStorage.getItem("columns")!);
    }
  }
  getColumn(): Column[] {
    return this.backendColumn;
  }

  deleteColumn(name: string) {
    this.backendColumn  = this.backendColumn.filter(column => !(column.name == name));
    localStorage.setItem("columns", JSON.stringify((this.backendColumn)));

  }
  editColumn(column: Column) {
    this.backendColumn  = this.backendColumn.filter(col => col.name != column.name);
    this.backendColumn.push(column);
    localStorage.setItem("columns", JSON.stringify((this.backendColumn)));
  }
  addColumn(column: Column) {
    this.backendColumn.push(column);
    localStorage.setItem("columns", JSON.stringify((this.backendColumn)));
  }
}
