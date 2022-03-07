import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Router} from "@angular/router";
import {Column } from '../Column';
import  {ColumnService} from '../column.service';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {minmaxValidator, minmaxLengthValidator, defaultValueTypeValidator} from "../shared/column-validator.directive";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-edit-column',
  templateUrl: './edit-column.component.html',
  styleUrls: ['./edit-column.component.css']
})
export class EditColumnComponent implements OnInit {
  currentColumn: Column | undefined;
  formAction  :string = '';
  editForm = new FormGroup({
    name: new FormControl('',[Validators.required]),
    type: new FormControl('',[Validators.required]),
    required: new FormControl('', [Validators.required]),
    defaultValue: new FormControl('', [Validators.required]),
    minLength: new FormControl(''),
    maxLength: new FormControl(''),
    min: new FormControl(''),
    max: new FormControl(''),
  },{ validators: [minmaxValidator, minmaxLengthValidator, defaultValueTypeValidator] });


  constructor(private route:ActivatedRoute, private columnService:ColumnService,private router: Router
              ) {

  }

  ngOnInit(): void {

    const url = this.route.snapshot.url;
    console.log(url);
    this.formAction = url[0].path;
    if (this.formAction == "edit") {
      const routeParams = this.route.snapshot.paramMap;
      const columnName = routeParams.get('columnname');
      this.currentColumn = this.columnService.backendColumn.find(column => column.name == columnName);
    this.disableFieldsOnType(this.currentColumn?.type);

    let obj = JSON.parse(JSON.stringify(this.currentColumn));
    this.editForm.patchValue(obj);
  }
    //this.editForm.get('name').disable();
    this.editForm.get('type')?.valueChanges.subscribe(type => {
      this.disableFieldsOnType(type);
                                      });

  }

  onSubmit():void{
    console.log(this.editForm.value);
    if(this.formAction == "add")
      this.columnService.addColumn(this.editForm.value);
    else if(this.formAction == "edit")
      this.columnService.editColumn(this.editForm.value);

    this.router.navigate(['']);
  }

  disableFieldsOnType(type: string | undefined) {
    if(type?.toLocaleLowerCase() == "boolean"){
      this.editForm.get('min')?.disable();
      this.editForm.get('max')?.disable();
      this.editForm.get('minLength')?.disable();
      this.editForm.get('maxLength')?.disable();
      this.editForm.get('min')?.setValue(null);
      this.editForm.get('max')?.setValue(null);
      this.editForm.get('minLength')?.setValue(null);
      this.editForm.get('maxLength')?.setValue(null);
    }
    else if(type?.toLocaleLowerCase() == "string") {
      this.editForm.get('min')?.disable();
      this.editForm.get('max')?.disable();
      this.editForm.get('min')?.setValue(null);
      this.editForm.get('max')?.setValue(null);
      this.editForm.get('minLength')?.enable();
      this.editForm.get('maxLength')?.enable();
    }
    else if(type?.toLocaleLowerCase() == "number"){
      this.editForm.get('minLength')?.disable();
      this.editForm.get('maxLength')?.disable();
      this.editForm.get('minLength')?.setValue(null);
      this.editForm.get('maxLength')?.setValue(null);
      this.editForm.get('min')?.enable();
      this.editForm.get('max')?.enable();
    }
  }
  defaultValueErrorMsg(): string {

     if(this.editForm.errors?.['defValueTypeInvalid'])
      return "default value enter and type doesnt match"

    else if(this.editForm.errors?.['rangeNumberError'])
      return "Default number should be in range 10 - 50"

    else if(this.editForm.errors?.['rangeStringError'])
      return "Default string length should be in range 2 - 8"
    return ""
  }

  routeBack() {
    this.router.navigate(['']);
  }
}
