import { Component, OnInit } from '@angular/core';
import {Column} from "../Column";
import {ColumnService} from "../column.service";

@Component({
  selector: 'app-print-schema',
  templateUrl: './print-schema.component.html',
  styleUrls: ['./print-schema.component.css']
})
export class PrintSchemaComponent implements OnInit {
  columns: Column[] = [];
  constructor(private columnService: ColumnService) {
    this.columns = this.columnService.getColumn();
  }

  ngOnInit(): void {
  }

}
