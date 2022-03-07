import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EditColumnComponent} from './edit-column/edit-column.component';
import {ModelListComponent} from './model-list/model-list.component';
import {AddColumnComponent} from "./add-column/add-column.component";
import {PrintSchemaComponent} from "./print-schema/print-schema.component";

const routes: Routes = [{path: 'edit/:columnname', component: EditColumnComponent},
                          {path: 'add', component: EditColumnComponent},
                          {path: 'print', component: PrintSchemaComponent},
                          { path: '', component:ModelListComponent, pathMatch: 'full'}];

// { path: '', component:ModelListComponent, pathMatch: 'full'}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
