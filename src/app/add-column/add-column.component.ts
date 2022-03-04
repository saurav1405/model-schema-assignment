import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {ColumnService} from "../column.service";

@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css']
})
export class AddColumnComponent implements OnInit {
  addForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    required: new FormControl('', [Validators.required]),
    defaultValue: new FormControl('', [Validators.required]),
    minLength: new FormControl(''),
    maxLength: new FormControl(''),
    min: new FormControl(''),
    max: new FormControl(''),
  });
  constructor(private columnService: ColumnService) { }

  ngOnInit(): void {
  }
  onSubmit():void{
    console.log(this.addForm.value);
    this.columnService.addColumn(this.addForm.value);
  }
}
