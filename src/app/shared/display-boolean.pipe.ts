import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: "displayBoolean"
})
export class DisplayBooleanPipe implements PipeTransform{
  transform(value: any) : string {
    if((value + "") == "true")
      return "Yes"
    else
      return "No"
  }
}
