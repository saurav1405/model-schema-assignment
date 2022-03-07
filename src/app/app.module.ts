import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModelListComponent } from './model-list/model-list.component';
import { EditColumnComponent } from './edit-column/edit-column.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddColumnComponent } from './add-column/add-column.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {DisplayNullValuePipe} from "./shared/display-null-value.pipe";
import {DisplayBooleanPipe} from "./shared/display-boolean.pipe";
import { PrintSchemaComponent } from './print-schema/print-schema.component';
import {DisplaySchemaPipe} from "./shared/display-schema.pipe";
import {MatDialogModule} from "@angular/material/dialog";
import { DeleteDialogComponent } from './model-list/delete-dialog/delete-dialog.component';
import {MatSortModule} from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    EditColumnComponent,
    AddColumnComponent,
    DisplayNullValuePipe,
    DisplayBooleanPipe,
    PrintSchemaComponent,
    DisplaySchemaPipe,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatFormFieldModule,MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
