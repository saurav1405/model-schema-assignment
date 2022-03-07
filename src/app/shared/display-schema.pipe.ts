import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'displaySchema'
})
export class DisplaySchemaPipe implements PipeTransform{
  transform(columns: any, schemaName: string) : string {

    let outObj : any = {};
    outObj.name = schemaName;
    outObj.schema = {};

    for (let i = 0; i < columns.length; i++) {
      outObj.schema[columns[i].name] = {};
      let interobj = outObj.schema[columns[i].name];
      for (const colKey in columns[i]) {
        if (colKey != "name")
          interobj[colKey] = columns[i][colKey];
      }
    }

    return JSON.stringify(outObj, null, 2);
  }
}
