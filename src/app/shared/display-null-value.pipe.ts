import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: "displayNullValue"
})
export class DisplayNullValuePipe implements PipeTransform{
  transform(value: any) : string {

    if(value == null || value == undefined || (value + "") == "")
      return "-"
    else
      return value
  }
}
