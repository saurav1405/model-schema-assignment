import {Component, OnInit, ViewChild} from '@angular/core';
import {Column } from '../Column';
import  {ColumnService} from '../column.service';
import {MatTable} from "@angular/material/table";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css']
})
export class ModelListComponent implements OnInit {
  columns: Column[] = [];
  sortOption: string = 'name';
  @ViewChild(MatTable) table: MatTable<any> | undefined;
  @ViewChild('searchTable') searchTable: MatTable<any> | undefined;
  searchQuery = new FormControl('');
  searchResult: Column[] = [];
  searchDisplayColumns : string[] =[ 'name', 'type', 'required','defaultValue','minLength', 'maxLength', 'min', 'max'];
  displayedColumns: string[] = [ 'name', 'type', 'required','defaultValue','minLength', 'maxLength', 'min', 'max' , 'edit', 'delete'];
  constructor(private columnService: ColumnService) {

  }

  ngOnInit(): void {
    this.columns = this.columnService.getColumn();

    this.searchQuery?.valueChanges.subscribe( str => {
        console.log(str);

        this.searchResult = this.columns.filter(column => {
          return column.name.toLocaleLowerCase().includes(str.toLocaleLowerCase());
        });
        if(str == null || str == '')
          this.searchResult = [];
        console.log(this.searchResult);
        this.searchTable?.renderRows();
    });
  }

  onDelete(columnName:any) {
    this.columnService.deleteColumn(columnName);
    this.columns = this.columnService.getColumn();
    this.table?.renderRows();
  }

  onEdit(column:any) {

  }
  onAdd() {

  }
  onSort() {
    console.log("sorting.....");
    console.log(this.sortOption);
    if(this.sortOption == "type") {
      this.columns.sort(function (a, b) {
        return a.type.localeCompare(b.type);
      });
    }
    else if(this.sortOption == "name") {
      this.columns.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
      else {
      this.columns.sort(function (a, b) {
        return a.type.localeCompare(b.type);
      });
      }
      this.table?.renderRows();
    }
}
