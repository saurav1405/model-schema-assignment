import {Component, OnInit, ViewChild} from '@angular/core';
import {Column } from '../Column';
import  {ColumnService} from '../column.service';
import {MatTable} from "@angular/material/table";
import {FormControl} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {Sort} from '@angular/material/sort';


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

  constructor(private columnService: ColumnService, public dialog: MatDialog) {
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

  onSort(sortEvent: Sort) {
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

  sortData(sort: Sort) {

    if (!sort.active || sort.direction === '') {
      return;
    }
    console.log("sorting.....");
    this.columns.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      let s = sort.active;
      return this.compare(sort.active, a[sort.active as keyof Column] , b[sort.active as keyof Column] , isAsc);
    });
    this.table?.renderRows();
  }

  compare(col: string, a: any, b: any, isAsc: boolean) {
    if(["min", "max","minLength", "maxLength"].includes(col)) {
      a = isNaN(parseInt(a)) ? null : parseInt(a);
      b = isNaN(parseInt(b)) ? null : parseInt(b);
    }
    else {
      a = a == null ? "" : a + "";
      b = b == null ? "" : b + "";
    }

    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(columnName: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {name: columnName},
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      if(result == "true")
        this.onDelete(columnName);
    });
  }

}

